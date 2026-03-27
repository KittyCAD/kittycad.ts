import { Client, buildQuery } from '../../client.js'
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
  video_res_width?: number
  video_res_height?: number
  fps?: number
  unlocked_framerate?: boolean
  post_effect?: PostEffectType
  webrtc?: boolean
  pool?: string
  show_grid?: boolean
  replay?: string
  api_call_id?: string
  order_independent_transparency?: boolean
  pr?: number
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
<<<<<<< HEAD
 * @param functionNameParams Parameters for URL templating and auth
 * @property {Client} [client] Optional client with auth token.
 * @property {number} video_res_width Width of the video feed. Must be a multiple of 4. (query)
 * @property {number} video_res_height Height of the video feed. Must be a multiple of 4. (query)
 * @property {number} fps Frames per second of the video feed. (query)
 * @property {boolean} unlocked_framerate If true, engine will render video frames as fast as it can. (query)
 * @property {PostEffectType} post_effect Engine Post effects (such as SSAO) (query)
 * @property {boolean} webrtc If true, will start a webrtc connection. (query)
 * @property {string} pool An optional identifier for a pool of engine instances. The 'default' pool is used when none is specified. (query)
 * @property {boolean} show_grid If true, will show the grid at the start of the session. (query)
 * @property {string} replay If given, when the session ends, the modeling commands sent during the session will be written out to this filename. For debugging. (query)
 * @property {string} api_call_id API Call ID for distributed tracing (query)
 * @property {boolean} order_independent_transparency Enables nicer visuals for transparent surfaces. This slows down rendering, so it's off by default. (query)
 * @property {number} pr Optional Pull Request number to route traffic. (query)
||||||| parent of c290235 (WIP)
 * @param functionNameParams Parameters for URL templating and auth
 * @property {Client} [client] Optional client with auth token.
 * @property {string} api_call_id API Call ID for distributed tracing (query)
 * @property {number} fps Frames per second of the video feed. (query)
 * @property {boolean} order_independent_transparency Enables nicer visuals for transparent surfaces. This slows down rendering, so it's off by default. (query)
 * @property {string} pool An optional identifier for a pool of engine instances. The 'default' pool is used when none is specified. (query)
 * @property {PostEffectType} post_effect Engine Post effects (such as SSAO) (query)
 * @property {string} replay If given, when the session ends, the modeling commands sent during the session will be written out to this filename. For debugging. (query)
 * @property {boolean} show_grid If true, will show the grid at the start of the session. (query)
 * @property {boolean} unlocked_framerate If true, engine will render video frames as fast as it can. (query)
 * @property {number} video_res_height Height of the video feed. Must be a multiple of 4. (query)
 * @property {number} video_res_width Width of the video feed. Must be a multiple of 4. (query)
 * @property {boolean} webrtc If true, will start a webrtc connection. (query)
 * @property {number} pr Optional Pull Request number to route traffic. (query)
=======
>>>>>>> c290235 (WIP)
 */
export default class ModelingCommandsWs {
  constructor() {}

  /**
   * @param functionNameParams Parameters for URL templating and auth
   * @property {Client} [client] Optional client with auth token.
   * @property {string} api_call_id API Call ID for distributed tracing (query)
   * @property {number} fps Frames per second of the video feed. (query)
   * @property {boolean} order_independent_transparency Enables nicer visuals for transparent surfaces. This slows down rendering, so it's off by default. (query)
   * @property {string} pool An optional identifier for a pool of engine instances. The 'default' pool is used when none is specified. (query)
   * @property {PostEffectType} post_effect Engine Post effects (such as SSAO) (query)
   * @property {string} replay If given, when the session ends, the modeling commands sent during the session will be written out to this filename. For debugging. (query)
   * @property {boolean} show_grid If true, will show the grid at the start of the session. (query)
   * @property {boolean} unlocked_framerate If true, engine will render video frames as fast as it can. (query)
   * @property {number} video_res_height Height of the video feed. Must be a multiple of 4. (query)
   * @property {number} video_res_width Width of the video feed. Must be a multiple of 4. (query)
   * @property {boolean} webrtc If true, will start a webrtc connection. (query)
   * @property {number} pr Optional Pull Request number to route traffic. (query)
   */
  static urlConstructFrom(functionNameParams: ModelingCommandsWsParams): URL {
    const path = `/ws/modeling/commands`
    const qs = buildQuery({
<<<<<<< HEAD
      video_res_width: this.functionNameParams.video_res_width,
      video_res_height: this.functionNameParams.video_res_height,
      fps: this.functionNameParams.fps,
      unlocked_framerate: this.functionNameParams.unlocked_framerate,
      post_effect: this.functionNameParams.post_effect,
      webrtc: this.functionNameParams.webrtc,
      pool: this.functionNameParams.pool,
      show_grid: this.functionNameParams.show_grid,
      replay: this.functionNameParams.replay,
      api_call_id: this.functionNameParams.api_call_id,
||||||| parent of c290235 (WIP)
      api_call_id: this.functionNameParams.api_call_id,
      fps: this.functionNameParams.fps,
=======
      api_call_id: functionNameParams.api_call_id,
      fps: functionNameParams.fps,
>>>>>>> c290235 (WIP)
      order_independent_transparency:
<<<<<<< HEAD
        this.functionNameParams.order_independent_transparency,
      pr: this.functionNameParams.pr,
||||||| parent of c290235 (WIP)
        this.functionNameParams.order_independent_transparency,
      pool: this.functionNameParams.pool,
      post_effect: this.functionNameParams.post_effect,
      replay: this.functionNameParams.replay,
      show_grid: this.functionNameParams.show_grid,
      unlocked_framerate: this.functionNameParams.unlocked_framerate,
      video_res_height: this.functionNameParams.video_res_height,
      video_res_width: this.functionNameParams.video_res_width,
      webrtc: this.functionNameParams.webrtc,
      pr: this.functionNameParams.pr,
=======
        functionNameParams.order_independent_transparency,
      pool: functionNameParams.pool,
      post_effect: functionNameParams.post_effect,
      replay: functionNameParams.replay,
      show_grid: functionNameParams.show_grid,
      unlocked_framerate: functionNameParams.unlocked_framerate,
      video_res_height: functionNameParams.video_res_height,
      video_res_width: functionNameParams.video_res_width,
      webrtc: functionNameParams.webrtc,
      pr: functionNameParams.pr,
>>>>>>> c290235 (WIP)
    })
    const url = path + qs
    // Backwards compatible for the BASE_URL env variable
    // That used to exist in only this lib, ZOO_HOST exists in the all the other
    // sdks and the CLI.
    const urlBase = functionNameParams.client?.baseUrl || 'https://api.zoo.dev'
    const httpUrl = urlBase + url
    const wsUrl = httpUrl.replace(/^http/, 'ws')
    return new URL(wsUrl)
  }

  static authenticate(
    functionNameParams: ModelingCommandsWsParams,
    ws: WebSocket
  ) {
    // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
    // backwards compatibility, but the new standard is ZOO_API_TOKEN.
    // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
    // check for that as well.
    const kittycadToken = functionNameParams.client
      ? functionNameParams.client.token || ''
      : ''
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
  }

  static toBSON(data: WebSocketRequest): Uint8Array {
    return BSON.serialize(data as unknown as Document)
  }

  /**
   * Parse an incoming browser MessageEvent into a typed response.
   * @param {MessageEvent} ev Event from the WebSocket.
   * @returns WebSocketResponse Parsed payload.
   */
  static parseMessage(ev: MessageEvent): WebSocketResponse {
    const data = ev?.data as unknown
    if (typeof data === 'string') return JSON.parse(data)
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer?.(data)) {
      const buf = data as Buffer
      try {
        return JSON.parse(buf.toString('utf8'))
      } catch {}
      return BSON.deserialize(buf) as unknown as WebSocketResponse
    }
    if (data instanceof ArrayBuffer) {
      const bytes = new Uint8Array(data)
      try {
        const text = new TextDecoder().decode(bytes)
        return JSON.parse(text)
      } catch {}
      return BSON.deserialize(bytes) as unknown as WebSocketResponse
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
      return BSON.deserialize(bytes) as unknown as WebSocketResponse
    }
    return data as WebSocketResponse
  }
}
