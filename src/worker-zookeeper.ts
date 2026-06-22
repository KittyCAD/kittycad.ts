import { Client } from './client'
import MlCopilotWs from './api/ml/ml_copilot_ws'
import { MlCopilotClientMessage, MlCopilotServerMessage } from './models'
import { decode } from '@msgpack/msgpack'

// One user request and the responses that follow it. Mirrors modeling-app's
// `mlEphantManagerMachine` Exchange. `delta` responses are aggregated into
// `deltasAggregated` for performance rather than pushed individually.
export interface Exchange {
  // The WebSocket can send responses without a preceding request (e.g. on
  // open), so the request is optional.
  request?: MlCopilotClientMessage
  // Excludes `delta` responses (see `deltasAggregated`).
  responses: MlCopilotServerMessage[]
  deltasAggregated: string
}

// An ordered list of exchanges, rebuilt from a `replay` server message.
export interface Conversation {
  exchanges: Exchange[]
}

// Substrings the backend uses to signal an unusable replay/conversation id.
const CONVERSATION_NOT_FOUND = 'conversation not found'
const INVALID_CONVERSATION_ID = 'Invalid conversation_id'

// The backend sometimes emits this `error` even after the client HAS already
// authenticated -- a known false positive / race in the API. It must be
// ignored rather than surfaced. Mirrors modeling-app's handling.
const SPURIOUS_AUTH_ERROR =
  'Please send `{ headers: { Authorization: "Bearer <token>" } }` over this websocket.'

// Unravel a `replay` server message and fold its framed sub-messages into a
// Conversation. Each frame in `replay.messages` is a byte array (number[]) of
// a UTF-8 JSON-encoded server message. Ported from modeling-app's
// `mlEphantManagerMachine`.
const decodeReplay = (
  message: Extract<MlCopilotServerMessage, { replay: unknown }>
): Conversation => {
  const exchanges: Exchange[] = []

  for (const byteMessage of message.replay.messages) {
    let decoded: MlCopilotServerMessage & { type?: string }
    try {
      const bytes = Uint8Array.from(Object.values(byteMessage))
      decoded = JSON.parse(new TextDecoder().decode(bytes))
    } catch {
      continue
    }
    if (typeof decoded !== 'object' || decoded === null) continue

    // Deltas are folded into end_of_stream's whole_response; skip them.
    if ('delta' in decoded) continue

    // A user request starts a new exchange.
    if ('type' in decoded && decoded.type === 'user') {
      exchanges.push({
        request: decoded as unknown as MlCopilotClientMessage,
        responses: [],
        deltasAggregated: '',
      })
      continue
    }

    // Errors and info messages are their own exchange.
    if ('error' in decoded || 'info' in decoded) {
      exchanges.push({ responses: [decoded], deltasAggregated: '' })
      continue
    }

    let lastExchange = exchanges[exchanges.length - 1]
    if (lastExchange === undefined) {
      lastExchange = { responses: [], deltasAggregated: '' }
      exchanges.push(lastExchange)
    }

    // Transform an end_of_stream's whole_response into the aggregated deltas.
    if ('end_of_stream' in decoded) {
      lastExchange.deltasAggregated = decoded.end_of_stream.whole_response ?? ''
    }
    lastExchange.responses.push(decoded)
  }

  return { exchanges }
}

const parseMessage = (ev: MessageEvent): MlCopilotServerMessage => {
  const data = ev.data as unknown
  if (typeof data === 'string') {
    return JSON.parse(data) as MlCopilotServerMessage
  }

  if (data instanceof ArrayBuffer) {
    return decode(new Uint8Array(data)) as MlCopilotServerMessage
  }

  if (ArrayBuffer.isView(data)) {
    return decode(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
    ) as MlCopilotServerMessage
  }

  return MlCopilotWs.parseMessage(ev)
}

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

// Open and authenticate the ML copilot WebSocket. To resume an existing
// conversation, pass `conversation_id` and `replay: true` in the args; the
// worker will receive a `replay` server message and post the folded
// conversation back to the main thread (see `decodeReplay`).
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
      postMessage({
        from: 'websocket',
        payload: { type: 'open', data: undefined },
      })
    },
    { once: true }
  )

  zooMlCopilotWs.addEventListener('close', (ev: CloseEvent) => {
    postMessage({
      from: 'websocket',
      payload: {
        type: 'close',
        data: { code: ev.code, reason: ev.reason },
      },
    })
  })

  zooMlCopilotWs.addEventListener('error', (ev: Event) => {
    postMessage({
      from: 'websocket',
      payload: {
        type: 'error',
        data: { message: (ev as ErrorEvent).message ?? 'WebSocket error' },
      },
    })
  })

  zooMlCopilotWs.addEventListener('message', (ev: MessageEvent) => {
    // Parse on the worker side so the main thread receives a typed
    // MlCopilotServerMessage instead of a raw string/BSON frame.
    const message = parseMessage(ev)

    // Ignore the known spurious auth-error false positive so clients never
    // treat it as fatal. Mirrors modeling-app's handling.
    if ('error' in message && message.error.detail === SPURIOUS_AUTH_ERROR) {
      return
    }

    // Signal an unusable replay/conversation id during setup so the client can
    // drop the id and reconnect fresh.
    if (
      'error' in message &&
      (message.error.detail.includes(CONVERSATION_NOT_FOUND) ||
        message.error.detail.includes(INVALID_CONVERSATION_ID))
    ) {
      postMessage({
        from: 'websocket',
        payload: {
          type: 'invalid_conversation',
          data: { detail: message.error.detail },
        },
      })
      return
    }

    // Unravel a replay into a folded conversation model.
    if ('replay' in message) {
      postMessage({
        from: 'websocket',
        payload: { type: 'replay', data: decodeReplay(message) },
      })
      return
    }

    postMessage({
      from: 'websocket',
      payload: { type: 'message', data: message },
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

// Send typed client messages as JSON text frames. The API proxy can parse these
// for persistence/heartbeat and forwards them upstream in the format zookeeper
// expects. Incoming replay/server frames may still be MessagePack.
const send = (message: MlCopilotClientMessage) => {
  zooMlCopilotWs?.send(JSON.stringify(message))
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
