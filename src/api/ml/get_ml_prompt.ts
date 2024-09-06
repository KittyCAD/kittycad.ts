import { MlPrompt_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_ml_prompt_params {
  client?: Client;
  id: string;
}

type Get_ml_prompt_return = MlPrompt_type | Error_type;

export default async function get_ml_prompt({
  client,
  id,
}: Get_ml_prompt_params): Promise<Get_ml_prompt_return> {
  const url = `/ml-prompts/${id}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result = (await response.json()) as Get_ml_prompt_return;
  return result;
}
