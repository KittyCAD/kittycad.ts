import fetch from 'node-fetch';
import { ApiTokenResultsPage_type, Error_type } from '../../models.js';

interface List_api_tokens_for_user_params {
  limit: number;
  page_token: string;
  sort_by: string;
}

type List_api_tokens_for_user_return = ApiTokenResultsPage_type | Error_type;

export default async function list_api_tokens_for_user({
  limit,
  page_token,
  sort_by,
}: List_api_tokens_for_user_params): Promise<List_api_tokens_for_user_return> {
  const url = `/user/api-tokens?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as List_api_tokens_for_user_return;
  return result;
}
