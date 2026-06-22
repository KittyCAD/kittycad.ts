import { Client } from './client'
import MlCopilotWs from './api/ml/ml_copilot_ws'
import { MlCopilotClientMessage } from './models'

type MessageEventMain =
  | {
      to: 'worker'
      payload: {
        type: 'start'
        data: ZooClientArgs
      }
    }
  | {
      to: 'websocket'
      payload: {
        type: string
        data: unknown[]
      }
    }

let zooMlCopilotWs: WebSocket | undefined = undefined

// Make sure we tie our arguments to the WebSocket initializer's parameters.
type ZooClientArgs = { client: Client } & Parameters<
  typeof MlCopilotWs.urlConstructFrom
>

const start = async (args: ZooClientArgs) => {
  zooMlCopilotWs = new WebSocket(
    MlCopilotWs.urlConstructFrom({
      ...args,
    })
  )

  // The ML copilot speaks BSON in addition to JSON, so we receive binary frames.
  zooMlCopilotWs.binaryType = 'arraybuffer'

  zooMlCopilotWs.addEventListener(
    'open',
    () => {
      MlCopilotWs.authenticate({ client: args.client }, zooMlCopilotWs)
    },
    { once: true }
  )

  zooMlCopilotWs.addEventListener('message', (ev: MessageEvent) => {
    postMessage({
      from: 'websocket',
      payload: { type: 'message', data: ev.data },
    })
  })

  // The termination of the Web Worker will terminate this interval.
  setInterval(() => {
    if (zooMlCopilotWs.readyState !== WebSocket.OPEN) {
      return
    }
    zooMlCopilotWs.send(JSON.stringify({ type: 'ping' }))
  }, 4000)
}

// Send a typed client message, serialized as BSON like the rest of the SDK.
const send = (message: MlCopilotClientMessage) => {
  zooMlCopilotWs?.send(MlCopilotWs.toBSON(message))
}

self.addEventListener('message', (ev: MessageEvent & MessageEventMain) => {
  const msg = ev.data
  switch (msg.to) {
    case 'worker': {
      if (msg.payload.type === 'start') {
        void start(msg.payload.data[0])
      }
      return
    }
    case 'websocket': {
      // Special case: send a typed client message as BSON.
      if (msg.payload.type === 'send') {
        send(msg.payload.data[0] as MlCopilotClientMessage)
        return
      }
      // Fallthrough to a method on the WebSocket itself (e.g. close).
      zooMlCopilotWs?.[msg.payload.type](...msg.payload.data)
      return
    }
  }
})
