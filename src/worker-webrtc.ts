import { encode as MsgPackEncode } from '@msgpack/msgpack'
import { Client } from './client'
import ModelingCommandsWs from './api/modeling/modeling_commands_ws'
import zooWasmInit, * as zooWasm from '@kittycad/kcl-wasm-lib'

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
  | {
      to: 'wasm'
      payload:
        | {
            type: 'execute'
            data: [string]
          }
        | {
            type: string
            data: unknown[]
          }
    }

let zooModelingCommandsWs: WebSocket | undefined = undefined

type ZooClientArgs = { client: Client } & Parameters<
  typeof ModelingCommandsWs.urlConstructFrom
>
const start = async (args: ZooClientArgs) => {
  // Make the wasm blob available first before anything. We don't use it immediately
  // today but it's intuitive to think this bag of data and functions is available
  // before the WebSocket is ready since they are "pure".

  // In a Worker, location.href is `blob:...`, so `location.href` doesn't work.
  await fetch(new URL('/kcl_wasm_lib_bg.wasm', location.origin))
    .then((resp) => resp.arrayBuffer())
    .then((buf) =>
      zooWasmInit({
        module_or_path: buf,
      })
    )

  zooModelingCommandsWs = new WebSocket(
    ModelingCommandsWs.urlConstructFrom({
      webrtc: true,
      ...args,
    })
  )

  zooModelingCommandsWs.addEventListener(
    'open',
    () => {
      ModelingCommandsWs.authenticate(
        { client: args.client },
        zooModelingCommandsWs
      )
    },
    { once: true }
  )

  zooModelingCommandsWs.addEventListener('message', (ev: MessageEvent) => {
    postMessage({
      from: 'websocket',
      payload: { type: 'message', data: ev.data },
    })
  })

  // The termination of the Web Worker will terminate this interval.
  setInterval(() => {
    if (zooModelingCommandsWs.readyState !== WebSocket.OPEN) {
      return
    }
    zooModelingCommandsWs.send(JSON.stringify({ type: 'ping' }))
  }, 4000)
}

const engineCommandManagerLite = {
  fireModelingCommandFromWasm(
    _id: string,
    _rangeStr: string,
    _commandStr: string,
    _idToRangeStr: string
  ): void | Error {
    return
  },
  async sendModelingCommandFromWasm(
    id: string,
    _rangeStr: string,
    commandStr: string,
    _idToRangeStr: string
  ): Promise<Uint8Array | undefined> {
    postMessage({
      from: 'websocket',
      payload: { type: 'message', data: commandStr },
    })
    
    zooModelingCommandsWs?.send(commandStr)

    return new Promise((resolve) => {
      const onMessage = (ev: MessageEvent) => {
        // Easier & faster than parsing the JSON for the UUID.
        if (ev.data.indexOf(id) < 0) {
          return
        }
        const data = MsgPackEncode(JSON.parse(ev.data))
        resolve(data)
        zooModelingCommandsWs.removeEventListener('message', onMessage)
      }
      zooModelingCommandsWs.addEventListener('message', onMessage)
    })
  },
  async startNewSession(): Promise<any> {
    return
  },
}

// This function can take:
// * A plain KCL string.
// * A simple map of filepath -> KCL string.
// * (TODO: Or a blob of bytes that's a tarball from our Aquarium.)
const kclExecute = (
  kclStrOrProject: string | Map<string, string>,
  mainKclPathName = 'main.kcl'
) => {
  const projectFsManagerLiteKclStr = (kclStr: string) => ({
    async readFile(_targetPath: string): Promise<Uint8Array> {
      return new TextEncoder().encode(kclStr)
    },
    async exists(_targetPath: string): Promise<boolean> {
      return false
    },
    async getAllFiles(_targetPath: string): Promise<string[]> {
      return [kclStr]
    },
  })

  const projectFsManagerLiteMap = (pathKclMap: Map<string, string>) => ({
    async readFile(targetPath: string): Promise<Uint8Array> {
      const kclStr = pathKclMap.get(targetPath) ?? ''
      return new TextEncoder().encode(kclStr)
    },
    async exists(targetPath: string): Promise<boolean> {
      return pathKclMap.has(targetPath)
    },
    async getAllFiles(_targetPath: string): Promise<string[]> {
      return Array.from(pathKclMap.values())
    },
  })

  const projectFsManagerLite =
    typeof kclStrOrProject === 'string'
      ? projectFsManagerLiteKclStr(kclStrOrProject)
      : projectFsManagerLiteMap(kclStrOrProject)

  const entryFile =
    typeof kclStrOrProject === 'string'
      ? kclStrOrProject
      : kclStrOrProject.get(mainKclPathName)

  const executorContext = new zooWasm.Context(
    engineCommandManagerLite,
    projectFsManagerLite
  )
  const program = zooWasm.parse_wasm(entryFile)[0]
  return executorContext.execute(JSON.stringify(program), mainKclPathName, '{}')
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
      zooModelingCommandsWs?.[msg.payload.type](...msg.payload.data)
      return
    }
    case 'wasm': {
      // Special cases.
      if (msg.payload.type === 'execute') {
        // Returns when the wasm code is finished processing.
        kclExecute(msg.payload.data[0]).then(() => {
          postMessage({
            from: 'wasm',
            payload: {
              type: 'execute',
              data: 'done',
            },
          })
        })
      } else {
        // Fallthrough to a function in the wasm blob.
        postMessage(zooWasm[msg.payload.type](...msg.payload.data))
      }
      return
    }
  }
})
