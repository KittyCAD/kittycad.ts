import { AiPrompt_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_ai_prompt_params {
  client?: Client;
  id: string;
}

type Get_ai_prompt_return = AiPrompt_type | Error_type;

export default async function get_ai_prompt({
  client,
  id,
}: Get_ai_prompt_params): Promise<Get_ai_prompt_return> {
  const url = `/ai-prompts/${id}`;
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
  const result = (await response.json()) as Get_ai_prompt_return;
  return result;
}
