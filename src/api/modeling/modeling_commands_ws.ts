import { Client } from '../../client.js'
import { BSON } from 'bson'
import type { Document } from 'bson'
import { isArrayBufferViewLike } from '../../ws-utils.js'
import {
  PostEffectType,
  WebSocketRequest,
  WebSocketResponse,
} from '../../models.js'

interface ModelingCommandsWsParams {
  client?: Client
  api_call_id: string
  fps: number
  pool: string
  post_effect: PostEffectType
  replay: string
  show_grid: boolean
  unlocked_framerate: boolean
  video_res_height: number
  video_res_width: number
  webrtc: boolean
}

/**
 * Open a websocket which accepts modeling commands.
 *
 * Pass those commands to the engine via websocket, and pass responses back to the client. Basically, this is a websocket proxy between the frontend/client and the engine.
 *
 * Tags: modeling
 *
 * @template Req WebSocket request message type
 * @template Res WebSocket response message type
 * @param functionNameParams Parameters for URL templating and auth
 * @property {Client} [client] Optional client with auth token.
 * @property {string} api_call_id API Call ID for distributed tracing (query)
 * @property {number} fps Frames per second of the video feed. (query)
 * @property {string} pool An optional identifier for a pool of engine instances. The 'default' pool is used when none is specified. (query)
 * @property {PostEffectType} post_effect Engine Post effects (such as SSAO) (query)
 * @property {string} replay If given, when the session ends, the modeling commands sent during the session will be written out to this filename. For debugging. (query)
 * @property {boolean} show_grid If true, will show the grid at the start of the session. (query)
 * @property {boolean} unlocked_framerate If true, engine will render video frames as fast as it can. (query)
 * @property {number} video_res_height Height of the video feed. Must be a multiple of 4. (query)
 * @property {number} video_res_width Width of the video feed. Must be a multiple of 4. (query)
 * @property {boolean} webrtc If true, will start a webrtc connection. (query)
 */
export default class ModelingCommandsWs<
  Req = WebSocketRequest,
  Res = WebSocketResponse,
> {
  private ws!: WebSocket

  constructor(private readonly functionNameParams: ModelingCommandsWsParams) {}

  /**
   * Establish the WebSocket connection and perform optional header auth.
   * @returns {Promise<this>} WebSocket instance after the connection opens.
   */
  async connect(): Promise<this> {
    const url = `/ws/modeling/commands?api_call_id=${this.functionNameParams.api_call_id}&fps=${this.functionNameParams.fps}&pool=${this.functionNameParams.pool}&post_effect=${this.functionNameParams.post_effect}&replay=${this.functionNameParams.replay}&show_grid=${this.functionNameParams.show_grid}&unlocked_framerate=${this.functionNameParams.unlocked_framerate}&video_res_height=${this.functionNameParams.video_res_height}&video_res_width=${this.functionNameParams.video_res_width}&webrtc=${this.functionNameParams.webrtc}`
    // Backwards compatible for the BASE_URL env variable
    // That used to exist in only this lib, ZOO_HOST exists in the all the other
    // sdks and the CLI.
    const urlBase =
      process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev'
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
