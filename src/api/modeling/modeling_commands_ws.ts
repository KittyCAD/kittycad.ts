import fetch from 'node-fetch';
import {} from '../../models.js';
import { Client } from '../../client.js';

interface Modeling_commands_ws_params {
  client?: Client;
  fps: number;
  unlocked_framerate: boolean;
  video_res_height: number;
  video_res_width: number;
}

type Modeling_commands_ws_return = any;

export default async function modeling_commands_ws({
  client,
  fps,
  unlocked_framerate,
  video_res_height,
  video_res_width,
}: Modeling_commands_ws_params): Promise<Modeling_commands_ws_return> {
  const url = `/ws/modeling/commands?fps=${fps}&unlocked_framerate=${unlocked_framerate}&video_res_height=${video_res_height}&video_res_width=${video_res_width}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Modeling_commands_ws_return;
  return result;
}
