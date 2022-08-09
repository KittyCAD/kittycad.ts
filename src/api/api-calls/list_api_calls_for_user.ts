import fetch from 'node-fetch';
import { ApiCallWithPriceResultsPage_type, Error_type } from '../../models.js';

interface List_api_calls_for_user_params {
  id: string;
  limit: number;
  page_token: string;
  sort_by: string;
}

type List_api_calls_for_user_return =
  | ApiCallWithPriceResultsPage_type
  | Error_type;

export default async function list_api_calls_for_user({
  id,
  limit,
  page_token,
  sort_by,
}: List_api_calls_for_user_params): Promise<List_api_calls_for_user_return> {
  const url = `/users/${id}/api-calls?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
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
  const result = (await response.json()) as List_api_calls_for_user_return;
  return result;
}
