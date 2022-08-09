import fetch from 'node-fetch';
import { ApiCallWithPriceResultsPage_type, Error_type } from '../../models.js';

interface User_list_api_calls_params {
  limit: number;
  page_token: string;
  sort_by: string;
}

type User_list_api_calls_return = ApiCallWithPriceResultsPage_type | Error_type;

export default async function user_list_api_calls({
  limit,
  page_token,
  sort_by,
}: User_list_api_calls_params): Promise<User_list_api_calls_return> {
  const url = `/user/api-calls?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
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
  const result = (await response.json()) as User_list_api_calls_return;
  return result;
}
