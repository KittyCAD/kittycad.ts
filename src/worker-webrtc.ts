import { encode as MsgPackEncode } from '@msgpack/msgpack'
import { Client } from './client'
import ModelingCommandsWs from './api/modeling/modeling_commands_ws'
import zooWasmInit, * as zooWasm from '@kittycad/kcl-wasm-lib'

type MessageEventMain = {
  to: 'worker',
  payload: {
    type: 'start',
    data: ZooClientArgs,
  }
} | 
{
  to: 'websocket',
  payload: {
    type: string,
    data: unknown[],
  }
} | {
  to: 'wasm',
  payload: {
    type: 'execute',
    data: [string],
  } | {
    type: string,
    data: unknown[],
  }
}

let zooModelingCommandsWs: WebSocket | undefined  = undefined

type ZooClientArgs = { client: Client } & Parameters<typeof ModelingCommandsWs.urlConstructFrom>
const start = async (args: ZooClientArgs) => {
  // Make the wasm blob available first before anything. We don't use it immediately
  // today but it's intuitive to think this bag of data and functions is available
  // before the WebSocket is ready since they are "pure".
  
  await fetch(new URL('http://localhost:3000/kcl_wasm_lib_bg.wasm'))
  .then((resp) => resp.arrayBuffer())
  .then((buf) => zooWasmInit({
      module_or_path: buf
    })
  )

  zooModelingCommandsWs = new WebSocket(
    ModelingCommandsWs.urlConstructFrom({
      webrtc: true,
      ...args,
    })
  )

  zooModelingCommandsWs.addEventListener('open', () => {
    ModelingCommandsWs.authenticate(
      { client: args.client },
      zooModelingCommandsWs
    )
  }, { once: true })

  zooModelingCommandsWs.addEventListener('message', (ev: MessageEvent) => {
    postMessage({ from: 'websocket', payload: { type: 'message', data: ev.data }})
  })
    
  /* const pingIntervalId = */ setInterval(() => {
    if (zooModelingCommandsWs.readyState !== WebSocket.OPEN) { return }
    zooModelingCommandsWs.send(JSON.stringify({ type: 'ping' }))
  }, 4000)
      
  // clearInterval(this.pingIntervalId)
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
    zooModelingCommandsWs?.send(commandStr)
    
    return new Promise((resolve) => {
      const onMessage = (ev: MessageEvent) => {
        // Easier & faster than parsing the JSON for the UUID.
        if (ev.data.indexOf(id) < 0) { return }
        const data = MsgPackEncode(JSON.parse(ev.data))
        resolve(data)
        zooModelingCommandsWs.removeEventListener('message', onMessage)
      }
      zooModelingCommandsWs.addEventListener('message', onMessage)
    })
  },
  async startNewSession(): Promise<any> {
    return
  }
}

const projectFsManagerLite = {
  async readFile(_path: string): Promise<string | Uint8Array> {
    return ''
  },
  async exists(_path: string): Promise<boolean> {
    return false
  },
  async getAllFiles(_path: string): Promise<string[]> {
    return []
  }
}
  
const kclExecute = (kclStr: string) => {
  const executorContext = new zooWasm.Context(engineCommandManagerLite, projectFsManagerLite)
  const program = zooWasm.parse_wasm(kclStr)[0]
  executorContext.execute(JSON.stringify(program), '', '{}')
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
      if (msg.payload.type === 'execute' && typeof msg.payload.data[0] === 'string') {
          kclExecute(msg.payload.data[0])
      } else {
        // Fallthrough to a function in the wasm blob.
        postMessage(zooWasm[msg.payload.type](...msg.payload.data))
      }
      return
    }
  }
})

