```typescript
import { Client } from '../../client.js';
import { BSON } from 'bson';

// Types for requests/responses are injected by apiGen
// import { RequestTypeName, ResponseTypeName } from '../../models.js';

interface FunctionNameParams {
  exampleParam: string;
}

export default class FunctionNameClass<
  Req = RequestTypeName,
  Res = ResponseTypeName,
> {
  private ws!: WebSocket;

  constructor(private readonly functionNameParams: FunctionNameParams) {}

  async connect(): Promise<this> {
    const url = 'string' + this.functionNameParams.exampleParam;
    const urlBase =
      process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
    const httpUrl = urlBase + url;
    const wsUrl = httpUrl.replace(/^http/, 'ws');

    const ws = new WebSocket(wsUrl);

    await new Promise<void>((resolve, reject) => {
      const onOpen = () => {
        remove();
        resolve();
      };
      const onError = (_ev: Event) => {
        remove();
        reject(new Error('WebSocket error'));
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

      const onError = (_ev: Event) => {
        cleanup();
        reject(new Error('WebSocket error'));
      };

      const onMessage = (ev: MessageEvent) => {
        cleanup();
        try {
          const parsed = this.parseMessage(ev);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      };

      const cleanup = () => {
        clearTimeout(timer);
        this.ws.removeEventListener('message', onMessage);
        this.ws.removeEventListener('error', onError);
      };

      this.ws.addEventListener('message', onMessage);
      this.ws.addEventListener('error', onError);
    });
  }

  close(): void {
    this.ws.close();
  }

  private parseMessage(ev: MessageEvent): Res {
    const data: any = ev?.data;
    if (typeof data === 'string') return JSON.parse(data);
    // Node ws Buffer
    if ((globalThis as any).Buffer && (Buffer as any).isBuffer?.(data)) {
      const buf = data as Buffer;
      try {
        return JSON.parse(buf.toString('utf8'));
      } catch {}
      const out: any = BSON.deserialize(buf);
      return out;
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
      const out: any = BSON.deserialize(bytes);
      return out;
    }
    // Fallback
    return data;
  }
}
```
