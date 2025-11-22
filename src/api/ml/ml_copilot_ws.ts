import { Client, buildQuery } from '../../client.js'
import { BSON } from 'bson'
import type { Document } from 'bson'
import { isArrayBufferViewLike } from '../../ws-utils.js'
import { MlCopilotClientMessage, MlCopilotServerMessage } from '../../models.js'

interface MlCopilotWsParams {
  client?: Client
  conversation_id?: string
  replay?: boolean
}

/**
 * Open a websocket to prompt the ML copilot.
 *
 * This endpoint accepts typed query parameters via `MlCopilotQuery`. See the field documentation on that struct for details, including replay behavior and wire format.
 *
 * Tags: ml
 *
 * @template Req WebSocket request message type
 * @template Res WebSocket response message type
 * @param functionNameParams Parameters for URL templating and auth
 * @property {Client} [client] Optional client with auth token.
 * @property {string} conversation_id Conversation to replay (UUID). Required when `replay` is `true`. (query)
 * @property {boolean} replay If `true`, emit MsgPack Replay for the specified conversation and continue. (query)
 */
export default class MlCopilotWs<
  Req = MlCopilotClientMessage,
  Res = MlCopilotServerMessage,
> {
  private ws!: WebSocket

  constructor(private readonly functionNameParams: MlCopilotWsParams) {}

  /**
   * Establish the WebSocket connection and perform optional header auth.
   * @returns {Promise<this>} WebSocket instance after the connection opens.
   */
  async connect(): Promise<this> {
    const path = `/ws/ml/copilot`
    const qs = buildQuery({
      conversation_id: this.functionNameParams.conversation_id,
      replay: this.functionNameParams.replay,
    })
    const url = path + qs
    // Backwards compatible for the BASE_URL env variable
    // That used to exist in only this lib, ZOO_HOST exists in the all the other
    // sdks and the CLI.
    const urlBase =
      this.functionNameParams?.client?.baseUrl ||
      process?.env?.ZOO_HOST ||
      process?.env?.BASE_URL ||
      'https://api.zoo.dev'
    const httpUrl = urlBase + url
    const wsUrl = httpUrl.replace(/^http/, 'ws')

    const ws = new WebSocket(wsUrl)
    await new Promise<void>((resolve, reject) => {
      const onOpen = () => {
        remove()
        resolve()
      }
      const onError = (_ev: Event) => {
        remove()
        reject(new Error('WebSocket error'))
      }
      const remove = () => {
        ws.removeEventListener('open', onOpen)
        ws.removeEventListener('error', onError)
      }
      ws.addEventListener('open', onOpen)
      ws.addEventListener('error', onError)
    })

    // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
    // backwards compatibility, but the new standard is ZOO_API_TOKEN.
    // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
    // check for that as well.
    const kittycadToken = this.functionNameParams?.client
      ? this.functionNameParams.client?.token || process.env.ZOO_API_TOKEN || ''
      : process.env.KITTYCAD_TOKEN ||
        process.env.KITTYCAD_API_TOKEN ||
        process.env.ZOO_API_TOKEN ||
        ''
    if (kittycadToken) {
      try {
        const headersMsg: { type: 'headers'; headers: Record<string, string> } =
          {
            type: 'headers',
            headers: { Authorization: `Bearer ${kittycadToken}` },
          }
        ws.send(JSON.stringify(headersMsg))
      } catch {}
    }

    this.ws = ws
    return this
  }

  /**
   * Send a JSON-encoded message.
   * @param {Req} data Message payload.
   */
  send(data: Req): void {
    this.ws.send(JSON.stringify(data))
  }
  /**
   * Send a BSON-encoded binary message, falling back to JSON if needed.
   * @param {Req} data Message payload.
   */
  sendBinary(data: Req): void {
    try {
      const bytes = BSON.serialize(data as unknown as Document)
      this.ws.send(bytes)
    } catch {
      this.ws.send(JSON.stringify(data))
    }
  }

  /**
   * Receive a single message or reject on timeout.
   * @param {number} [timeoutMs=60000] Milliseconds to wait before timing out.
   * @returns {Promise<Res>} Parsed response message.
   */
  recv(timeoutMs = 60000): Promise<Res> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup()
        reject(new Error('timeout'))
      }, timeoutMs)
      const onError = (_ev: Event) => {
        cleanup()
        reject(new Error('WebSocket error'))
      }
      const onMessage = (ev: MessageEvent) => {
        cleanup()
        try {
          const parsed = this.parseMessage(ev)
          resolve(parsed)
        } catch (e) {
          reject(e)
        }
      }
      const cleanup = () => {
        clearTimeout(timer)
        this.ws.removeEventListener('message', onMessage)
        this.ws.removeEventListener('error', onError)
      }
      this.ws.addEventListener('message', onMessage)
      this.ws.addEventListener('error', onError)
    })
  }

  /** Close the WebSocket connection. */
  close(): void {
    this.ws.close()
  }

  /**
   * Parse an incoming browser MessageEvent into a typed response.
   * @param {MessageEvent} ev Event from the WebSocket.
   * @returns {Res} Parsed payload.
   */
  private parseMessage(ev: MessageEvent): Res {
    const data = ev?.data as unknown
    if (typeof data === 'string') return JSON.parse(data)
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer?.(data)) {
      const buf = data as Buffer
      try {
        return JSON.parse(buf.toString('utf8'))
      } catch {}
      return BSON.deserialize(buf) as unknown as Res
    }
    if (data instanceof ArrayBuffer) {
      const bytes = new Uint8Array(data)
      try {
        const text = new TextDecoder().decode(bytes)
        return JSON.parse(text)
      } catch {}
      return BSON.deserialize(bytes) as unknown as Res
    }
    if (isArrayBufferViewLike(data)) {
      const bytes = new Uint8Array(
        data.buffer,
        data.byteOffset,
        data.byteLength
      )
      try {
        const text = new TextDecoder().decode(bytes)
        return JSON.parse(text)
      } catch {}
      return BSON.deserialize(bytes) as unknown as Res
    }
    return data as Res
  }
}
