import { Client } from '../../client.js';
import {
  PostEffectType_type,
  WebSocketRequest_type,
  WebSocketResponse_type,
} from '../../models.js';
import { BSON } from 'bson';

// Types for requests/responses are injected by apiGen
// import { WebSocketRequest_type, WebSocketResponse_type } from '../../models.js';

interface ModelingCommandsWsParams {
  client?: Client;
  api_call_id: string;
  fps: number;
  pool: string;
  post_effect: PostEffectType_type;
  replay: string;
  show_grid: boolean;
  unlocked_framerate: boolean;
  video_res_height: number;
  video_res_width: number;
  webrtc: boolean;
}

export default class ModelingCommandsWs<
  Req = WebSocketRequest_type,
  Res = WebSocketResponse_type,
> {
  private ws!: WebSocket;

  constructor(private readonly functionNameParams: ModelingCommandsWsParams) {}

  async connect(): Promise<this> {
    const url = `/ws/modeling/commands?api_call_id=${this.functionNameParams.api_call_id}&fps=${this.functionNameParams.fps}&pool=${this.functionNameParams.pool}&post_effect=${this.functionNameParams.post_effect}&replay=${this.functionNameParams.replay}&show_grid=${this.functionNameParams.show_grid}&unlocked_framerate=${this.functionNameParams.unlocked_framerate}&video_res_height=${this.functionNameParams.video_res_height}&video_res_width=${this.functionNameParams.video_res_width}&webrtc=${this.functionNameParams.webrtc}`;
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
