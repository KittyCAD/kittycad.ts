import { Client, buildQuery } from '../../client.js'
import { BSON } from 'bson'
import type { Document } from 'bson'
import { isArrayBufferViewLike } from '../../ws-utils.js'
import {
  KclMigrationClientMessage,
  KclMigrationServerMessage,
} from '../../models.js'

interface KclMigrationWsParams {
  client?: Client
}

/**
 * Open a sponsored KCL migration connection. It cannot execute ordinary prompts.
 *
 * Tags: ml
 *
 * @template Req WebSocket request message type
 * @template Res WebSocket response message type
 */
export default class KclMigrationWs {
  constructor() {}

  /**
   * @param functionNameParams Parameters for URL templating and auth
   * @property {Client} [client] Optional client with auth token.
   */
  static urlConstructFrom(functionNameParams: KclMigrationWsParams): URL {
    const path = `/ws/ml/kcl-migration`
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

  static authenticate(functionNameParams: KclMigrationWsParams, ws: WebSocket) {
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

  static toBSON(data: KclMigrationClientMessage): Uint8Array {
    return BSON.serialize(data as unknown as Document)
  }

  /**
   * Parse an incoming browser MessageEvent into a typed response.
   * @param {MessageEvent} ev Event from the WebSocket.
   * @returns KclMigrationServerMessage Parsed payload.
   */
  static parseMessage(ev: MessageEvent): KclMigrationServerMessage {
    const data = ev?.data as unknown
    if (typeof data === 'string') return JSON.parse(data)
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer?.(data)) {
      const buf = data as Buffer
      try {
        return JSON.parse(buf.toString('utf8'))
      } catch {}
      return BSON.deserialize(buf) as unknown as KclMigrationServerMessage
    }
    if (data instanceof ArrayBuffer) {
      const bytes = new Uint8Array(data)
      try {
        const text = new TextDecoder().decode(bytes)
        return JSON.parse(text)
      } catch {}
      return BSON.deserialize(bytes) as unknown as KclMigrationServerMessage
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
      return BSON.deserialize(bytes) as unknown as KclMigrationServerMessage
    }
    return data as KclMigrationServerMessage
  }
}
