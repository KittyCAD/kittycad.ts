import fetch from 'node-fetch';
import { AiPluginManifest_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_ai_plugin_manifest_params {
  client?: Client;
}

type Get_ai_plugin_manifest_return = AiPluginManifest_type | Error_type;

export default async function get_ai_plugin_manifest({
  client,
}: Get_ai_plugin_manifest_params = {}): Promise<Get_ai_plugin_manifest_return> {
  const url = `/.well-known/ai-plugin.json`;
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
  const result = (await response.json()) as Get_ai_plugin_manifest_return;
  return result;
}
