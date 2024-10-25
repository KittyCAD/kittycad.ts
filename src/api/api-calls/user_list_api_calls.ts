import {
  ApiCallWithPriceResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface User_list_api_calls_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
}

type User_list_api_calls_return = ApiCallWithPriceResultsPage_type | Error_type;

export default async function user_list_api_calls({
  client,
  limit,
  page_token,
  sort_by,
}: User_list_api_calls_params): Promise<User_list_api_calls_return> {
  const url = `/user/api-calls?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as User_list_api_calls_return;
  return result;
}
