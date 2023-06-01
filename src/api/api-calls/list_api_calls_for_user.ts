import fetch from 'node-fetch';
import {
  ApiCallWithPriceResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface List_api_calls_for_user_params {
  client?: Client;
  id: string;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
}

type List_api_calls_for_user_return =
  | ApiCallWithPriceResultsPage_type
  | Error_type;

export default async function list_api_calls_for_user({
  client,
  id,
  limit,
  page_token,
  sort_by,
}: List_api_calls_for_user_params): Promise<List_api_calls_for_user_return> {
  const url = `/users/${id}/api-calls?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
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
  const result = (await response.json()) as List_api_calls_for_user_return;
  return result;
}
