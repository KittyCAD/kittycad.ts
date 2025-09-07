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

  private constructor(wsImpl: any) {
    this.ws = wsImpl;
  }

  static async connect({ client }: MlCopilotWsParams): Promise<MlCopilotWs> {
    const url = `/ws/ml/copilot`;
    const urlBase =
      process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
    const httpUrl = urlBase + url;
    const wsUrl = httpUrl.replace(/^http/, 'ws');

    // Resolve a WebSocket implementation for both browser and Node.js
    const WSImpl: any =
      (globalThis as any).WebSocket || (await import('ws')).default;

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
        if ('removeEventListener' in ws) {
          ws.removeEventListener('open', onOpen);
          ws.removeEventListener('error', onError);
        } else if ('off' in ws) {
          ws.off('open', onOpen);
          ws.off('error', onError);
        }
      };
      if ('addEventListener' in ws) {
        ws.addEventListener('open', onOpen);
        ws.addEventListener('error', onError);
      } else if ('on' in ws) {
        ws.on('open', onOpen);
        ws.on('error', onError);
      }
    });

    // Send auth headers as a message immediately after connect (browser-safe)
    const kittycadToken = client
      ? client.token || process.env.ZOO_API_TOKEN || ''
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

    return new MlCopilotWs(ws);
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
        if ('removeEventListener' in this.ws) {
          this.ws.removeEventListener('message', onMessage as any);
          this.ws.removeEventListener('error', onError);
        } else if ('off' in this.ws) {
          this.ws.off('message', onMessage as any);
          this.ws.off('error', onError);
        }
      };

      if ('addEventListener' in this.ws) {
        this.ws.addEventListener('message', onMessage as any);
        this.ws.addEventListener('error', onError);
      } else if ('on' in this.ws) {
        this.ws.on('message', (data: any) => onMessage({ data }));
        this.ws.on('error', onError);
      }
    });
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Res> {
    const queue: any[] = [];
    let deferredResolve: (() => void) | undefined;
    let ended = false;

    const onMessage = (evOrData: any) => {
      try {
        queue.push(this.parseMessage(evOrData));
      } catch (e) {
        queue.push(e);
      }
      deferredResolve?.();
    };
    const onClose = () => {
      ended = true;
      deferredResolve?.();
    };
    const onError = (err: any) => {
      queue.push(err instanceof Error ? err : new Error('WebSocket error'));
      deferredResolve?.();
    };

    if ('addEventListener' in this.ws) {
      this.ws.addEventListener('message', onMessage as any);
      this.ws.addEventListener('close', onClose);
      this.ws.addEventListener('error', onError);
    } else if ('on' in this.ws) {
      this.ws.on('message', (data: any) => onMessage({ data }));
      this.ws.on('close', onClose);
      this.ws.on('error', onError);
    }

    try {
      while (!ended || queue.length) {
        if (!queue.length) {
          await new Promise<void>((r) => (deferredResolve = r));
          deferredResolve = undefined;
          continue;
        }
        const item = queue.shift();
        if (item instanceof Error) throw item;
        yield item as Res;
      }
    } finally {
      if ('removeEventListener' in this.ws) {
        this.ws.removeEventListener('message', onMessage as any);
        this.ws.removeEventListener('close', onClose);
        this.ws.removeEventListener('error', onError);
      } else if ('off' in this.ws) {
        this.ws.off('message', onMessage as any);
        this.ws.off('close', onClose);
        this.ws.off('error', onError);
      }
    }
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
