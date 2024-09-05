import {
  MlPromptResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface List_ml_prompts_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
}

type List_ml_prompts_return = MlPromptResultsPage_type | Error_type;

export default async function list_ml_prompts({
  client,
  limit,
  page_token,
  sort_by,
}: List_ml_prompts_params): Promise<List_ml_prompts_return> {
  const url = `/ml-prompts?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
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
  const result = (await response.json()) as List_ml_prompts_return;
  return result;
}
