import { Client, buildQuery } from '../../client.js'
import { BSON } from 'bson'
import type { Document } from 'bson'
import { isArrayBufferViewLike } from '../../ws-utils.js'
import { MlCopilotClientMessage, MlCopilotServerMessage } from '../../models.js'

interface MlReasoningWsParams {
  client?: Client
  id: string
}

/**
 * Open a websocket to prompt the ML copilot.
 *
 * Tags: ml
 *
 * @template Req WebSocket request message type
 * @template Res WebSocket response message type
 */
export default class MlReasoningWs {
  constructor() {}

  /**
   * @param functionNameParams Parameters for URL templating and auth
   * @property {Client} [client] Optional client with auth token.
   * @property {string} id The ID of the async operation. (path)
   */
  static urlConstructFrom(functionNameParams: MlReasoningWsParams): URL {
    const path = `/ws/ml/reasoning/${functionNameParams.id}`
    const qs = buildQuery({})
    const url = path + qs
    // Backwards compatible for the BASE_URL env variable
    // That used to exist in only this lib, ZOO_HOST exists in the all the other
    // sdks and the CLI.
    const urlBase = functionNameParams.client?.baseUrl || 'https://api.zoo.dev'
    const httpUrl = urlBase + url
    const wsUrl = httpUrl.replace(/^http/, 'ws')
    return new URL(wsUrl)
  }

  static authenticate(functionNameParams: MlReasoningWsParams, ws: WebSocket) {
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
