import { Client, buildQuery } from '../../client.js'
import { BSON } from 'bson'
import type { Document } from 'bson'
import { isArrayBufferViewLike } from '../../ws-utils.js'
import { MlCopilotClientMessage, MlCopilotServerMessage } from '../../models.js'

interface MlCopilotWsParams {
  client?: Client
  replay?: boolean
  conversation_id?: string
  pr?: number
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
<<<<<<< HEAD
 * @param functionNameParams Parameters for URL templating and auth
 * @property {Client} [client] Optional client with auth token.
 * @property {boolean} replay If `true`, emit MsgPack Replay for the specified conversation and continue. (query)
 * @property {string} conversation_id Conversation to replay (UUID). Required when `replay` is `true`. (query)
 * @property {number} pr Optional Pull Request number to route traffic. (query)
||||||| parent of c290235 (WIP)
 * @param functionNameParams Parameters for URL templating and auth
 * @property {Client} [client] Optional client with auth token.
 * @property {string} conversation_id Conversation to replay (UUID). Required when `replay` is `true`. (query)
 * @property {boolean} replay If `true`, emit MsgPack Replay for the specified conversation and continue. (query)
 * @property {number} pr Optional Pull Request number to route traffic. (query)
=======
>>>>>>> c290235 (WIP)
 */
export default class MlCopilotWs {
  constructor() {}

  /**
   * @param functionNameParams Parameters for URL templating and auth
   * @property {Client} [client] Optional client with auth token.
   * @property {string} conversation_id Conversation to replay (UUID). Required when `replay` is `true`. (query)
   * @property {boolean} replay If `true`, emit MsgPack Replay for the specified conversation and continue. (query)
   * @property {number} pr Optional Pull Request number to route traffic. (query)
   */
  static urlConstructFrom(functionNameParams: MlCopilotWsParams): URL {
    const path = `/ws/ml/copilot`
    const qs = buildQuery({
      replay: functionNameParams.replay,
      conversation_id: functionNameParams.conversation_id,
      pr: functionNameParams.pr,
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

  static authenticate(functionNameParams: MlCopilotWsParams, ws: WebSocket) {
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

  static toBSON(data: MlCopilotClientMessage): Uint8Array {
    return BSON.serialize(data as unknown as Document)
  }

  /**
   * Parse an incoming browser MessageEvent into a typed response.
   * @param {MessageEvent} ev Event from the WebSocket.
   * @returns MlCopilotServerMessage Parsed payload.
   */
  static parseMessage(ev: MessageEvent): MlCopilotServerMessage {
    const data = ev?.data as unknown
    if (typeof data === 'string') return JSON.parse(data)
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer?.(data)) {
      const buf = data as Buffer
      try {
        return JSON.parse(buf.toString('utf8'))
      } catch {}
      return BSON.deserialize(buf) as unknown as MlCopilotServerMessage
    }
    if (data instanceof ArrayBuffer) {
      const bytes = new Uint8Array(data)
      try {
        const text = new TextDecoder().decode(bytes)
        return JSON.parse(text)
      } catch {}
      return BSON.deserialize(bytes) as unknown as MlCopilotServerMessage
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
      return BSON.deserialize(bytes) as unknown as MlCopilotServerMessage
    }
    return data as MlCopilotServerMessage
  }
}
