import {
  TextToCadResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface List_text_to_cad_models_for_user_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
  no_models: boolean;
}

type List_text_to_cad_models_for_user_return =
  | TextToCadResultsPage_type
  | Error_type;

export default async function list_text_to_cad_models_for_user({
  client,
  limit,
  page_token,
  sort_by,
  no_models,
}: List_text_to_cad_models_for_user_params): Promise<List_text_to_cad_models_for_user_return> {
  const url = `/user/text-to-cad?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}&no_models=${no_models}`;
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
  const result =
    (await response.json()) as List_text_to_cad_models_for_user_return;
  return result;
}
