import { Client } from '../../client.js';
import {
  MlCopilotClientMessage_type,
  MlCopilotServerMessage_type,
} from '../../models.js';
import { BSON } from 'bson';

// Types for requests/responses are injected by apiGen
// import { MlCopilotClientMessage_type, MlCopilotServerMessage_type } from '../../models.js';

interface MlCopilotWsParams {
  client?: Client;
}

export default class MlCopilotWs<
  Req = MlCopilotClientMessage_type,
  Res = MlCopilotServerMessage_type,
> {
  private ws: any;

  constructor(private readonly functionNameParams: MlCopilotWsParams) {}

  async connect(): Promise<this> {
    const url = `/ws/ml/copilot`;
    const urlBase =
      process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
    const httpUrl = urlBase + url;
    const wsUrl = httpUrl.replace(/^http/, 'ws');

    const WSImpl: any = (globalThis as any).WebSocket;
    if (!WSImpl) {
      throw new Error(
        'WebSocket global is not available. Add a WebSocket polyfill.',
      );
    }
    const ws: any = new WSImpl(wsUrl);

    await new Promise<void>((resolve, reject) => {
      const onOpen = () => {
        remove();
        resolve();
      };
      const onError = (ev: any) => {
        remove();
        reject(ev?.error || new Error('WebSocket error'));
      };
      const remove = () => {
        ws.removeEventListener('open', onOpen);
        ws.removeEventListener('error', onError);
      };
      ws.addEventListener('open', onOpen);
      ws.addEventListener('error', onError);
    });

    // Send auth headers as a message immediately after connect (browser-safe)
    const kittycadToken = (this.functionNameParams as any)?.client
      ? (this.functionNameParams as any).client?.token ||
        process.env.ZOO_API_TOKEN ||
        ''
      : process.env.KITTYCAD_TOKEN ||
        process.env.KITTYCAD_API_TOKEN ||
        process.env.ZOO_API_TOKEN ||
        '';
    if (kittycadToken) {
      try {
        const headersMsg: any = {
          type: 'headers',
          headers: { Authorization: `Bearer ${kittycadToken}` },
        };
        ws.send(JSON.stringify(headersMsg));
      } catch {}
    }

    this.ws = ws;
    return this;
  }

  send(data: Req): void {
    this.ws.send(JSON.stringify(data));
  }

  sendBinary(data: Req): void {
    try {
      const bytes = BSON.serialize(data as any);
      this.ws.send(bytes);
    } catch (e) {
      // Fallback to JSON if BSON isn’t serializable
      this.ws.send(JSON.stringify(data));
    }
  }

  recv(timeoutMs = 60000): Promise<Res> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error('timeout'));
      }, timeoutMs);

      const onError = (ev: any) => {
        cleanup();
        reject(ev?.error || new Error('WebSocket error'));
      };

      const onMessage = (evOrData: any) => {
        cleanup();
        try {
          const parsed = this.parseMessage(evOrData);
          resolve(parsed as Res);
        } catch (e) {
          reject(e);
        }
      };

      const cleanup = () => {
        clearTimeout(timer);
        this.ws.removeEventListener('message', onMessage as any);
        this.ws.removeEventListener('error', onError);
      };

      this.ws.addEventListener('message', onMessage as any);
      this.ws.addEventListener('error', onError);
    });
  }

  close(): void {
    this.ws.close();
  }

  private parseMessage(evOrData: any): unknown {
    const data = 'data' in evOrData ? evOrData.data : evOrData;
    if (typeof data === 'string') return JSON.parse(data);
    // Node ws Buffer
    if ((globalThis as any).Buffer && (Buffer as any).isBuffer?.(data)) {
      const buf = data as Buffer;
      try {
        return JSON.parse(buf.toString('utf8'));
      } catch {}
      return BSON.deserialize(buf);
    }
    // ArrayBuffer or Uint8Array
    if (data instanceof ArrayBuffer || data?.buffer instanceof ArrayBuffer) {
      const bytes =
        data instanceof ArrayBuffer
          ? new Uint8Array(data)
          : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
      try {
        const text = new TextDecoder().decode(bytes);
        return JSON.parse(text);
      } catch {}
      return BSON.deserialize(bytes);
    }
    // Fallback
    return data;
  }
}
