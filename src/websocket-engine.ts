// Similar to webrtc.ts but much simpler, without all the cruft of WebRTC.
// This alternative invocation path acts as a simpler interface.

import { EErrorOAuth2 } from '@kittycad/oauth2-auth-code-pkce'
import { Client } from './client'
import ModelingCommandsWs from './api/modeling/modeling_commands_ws'
import {
  SuccessWebSocketResponse,
  FailureWebSocketResponse,
} from './models'
import WorkerEngine from 'web-worker:./worker-engine.ts'

type ExpectedWebSocketResponse =
  | FailureWebSocketResponse
  | SuccessWebSocketResponse
  | Error

const cloneWithoutNonSerializable = (a: unknown): unknown => {
  return JSON.parse(JSON.stringify(a))
}


type WorkerMessage =
  | {
      from: 'websocket'
      payload: {
        type: 'message'
        data: unknown
      }
    }
  | {
      to: 'websocket'
      payload: {
        type: 'send'
        data: unknown
      }
    }
  | {
      from: 'wasm'
      payload:
        | {
            type: 'message'
            data: unknown
          }
        | {
            type: 'execute'
            data: unknown
          }
    }

// Make sure we tie our arguments to the WebSocket initializer's parameters.
type ZooClientArgs = { client: Client } & Parameters<
  typeof ModelingCommandsWs.urlConstructFrom
>[0] & {
  enable_ssao?: boolean
}

export class WebSocket extends EventTarget {
  private zooClientArgs: ZooClientArgs

  // Underneath we still use the workerEngine but configured to only use the
  // WebSocket & wasm functionality.
  private workerEngine: Worker

  constructor(args: ZooClientArgs) {
    super()

    this.zooClientArgs = args

    // Initialization is NOT resource acquisition here. The purpose of early
    // init is worker is available to hook up events.
    // Devs must still call .start()
    this.workerEngine = new WorkerEngine()
  }

  deconstructor() {
    this.workerEngine.terminate()
  }

  async start() {
    // zooClientArgs.client.token will either have a valid token, invalid, or
    // unset / undefined. The Worker will notify us if something goes wrong, in
    // which case we will fire an authorization.

    // Our initial auth is hella confusing, because the 1st will always show
    // 'auth_token_missing'.
    const onMessage = (ev: MessageEvent<WorkerMessage>) => {
      const msg = ev.data
      if (
        !(
          'from' in msg &&
          msg.from === 'websocket' &&
          'payload' in msg &&
          typeof msg.payload === 'object' &&
          'data' in msg.payload &&
          typeof msg.payload.data === 'string'
        )
      ) {
        return
      }
      if (msg.payload.data.indexOf('auth_token_invalid') >= 0) {
        this.workerEngine.removeEventListener('message', onMessage)

        // Will redirect us to the authorization server.
        this.zooClientArgs.client.oauth2.fetchAuthorizationCode()
      }
    }

    const kickoffStartWebrtcWorker = () => {
      this.workerEngine.addEventListener('message', onMessage)

      this.workerEngine.postMessage({
        to: 'worker',
        payload: {
          type: 'start',
          // Cannot serialize functions across the Worker boundary.
          data: [cloneWithoutNonSerializable(this.zooClientArgs)],
        },
      })
    }

    if (this.zooClientArgs.client.token) {
      kickoffStartWebrtcWorker()
      return
    }

    void this.zooClientArgs.client.oauth2
      .getAccessToken()
      .then((context) => {
        if (context?.token?.value) {
          this.zooClientArgs.client.token = context?.token?.value
        }

        // Trigger the "auth_token_invalid" message, more reliable than
        //  "auth_token_missing", using the NIL UUID.
        if (this.zooClientArgs.client.token === undefined) {
          this.zooClientArgs.client.token =
            '00000000-0000-0000-0000-000000000000'
        }

        kickoffStartWebrtcWorker()
      })
      // Should maybe move this up into @kittycad/oauth2-auth-code-pkce
      .catch((error: unknown) => {
        if (typeof error === 'object' && 'kind' in error) {
          if (
            [
              EErrorOAuth2.ErrorNoAuthCode,
              EErrorOAuth2.ErrorAccessTokenResponse,
            ].some((e) => e === error.kind)
          ) {
            this.zooClientArgs.client.oauth2.fetchAuthorizationCode()
          }
        }
      })
  }

  // For regular wasm calls, for whatever reason devs need it for.
  // Alternatively they can load up a stand-alone wasm blob via
  // @kittycad/kcl-wasm-lib.
  wasm(funcName: string, ...args: unknown[]): Promise<unknown> {
    return new Promise((resolve) => {
      const onMessage = (ev: MessageEvent<WorkerMessage>) => {
        const msg = ev.data
        if ('from' in msg && msg.from === 'wasm') {
          this.workerEngine.removeEventListener('message', onMessage)
          resolve(msg.payload.data)
        }
      }

      this.workerEngine.addEventListener('message', onMessage)

      this.workerEngine.postMessage({
        to: 'wasm',
        payload: {
          type: funcName,
          data: args ?? [],
        },
      })
    })
  }

  executor() {
    return {
      addEventListener: this.workerEngine.addEventListener.bind(
        this.workerEngine,
        'message'
      ),
      removeEventListener: this.workerEngine.removeEventListener.bind(
        this.workerEngine,
        'message'
      ),
      submit: (
        kclStr: string,
        opts = { mainKclPathName: 'main.kcl' }
      ): Promise<ExpectedWebSocketResponse> =>
        new Promise((resolve) => {
          const onMessage = (ev: MessageEvent<WorkerMessage>) => {
            const msg = ev.data
            if (
              'from' in msg &&
              // It's initiated from the wasm, but the very very root is the websocket.
              msg.from === 'wasm' &&
              msg.payload.type === 'execute'
            ) {
              this.workerEngine.removeEventListener('message', onMessage)
              resolve(msg.payload.data as ExpectedWebSocketResponse)
            }
          }
          this.workerEngine.addEventListener('message', onMessage)

          this.workerEngine.postMessage({
            to: 'wasm',
            payload: {
              type: 'execute',
              data: [kclStr, opts],
            },
          })
        }),
    }
  }
  
  send(
    ...args: unknown[]
  ): Promise<ExpectedWebSocketResponse> {
    return new Promise((resolve) => {
      const onMessage = (ev: MessageEvent<WorkerMessage>) => {
        const msg = ev.data
        if ('from' in msg && msg.from === 'websocket') {
          this.workerEngine.removeEventListener('message', onMessage)
          resolve(msg.payload.data as ExpectedWebSocketResponse)
        }
      }

      this.workerEngine.addEventListener('message', onMessage)

      this.workerEngine.postMessage({
        to: 'websocket',
        payload: {
          type: 'send',
          data: args,
        },
      })
    })
  }
}
