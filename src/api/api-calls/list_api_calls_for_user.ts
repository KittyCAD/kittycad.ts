import {
  ApiCallWithPriceResultsPage_type,
  Error_type,
  UserIdentifier_type,
  CreatedAtSortMode_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface List_api_calls_for_user_params {
  client?: Client;
  id: UserIdentifier_type;
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
    ? client.token
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
  const result = (await response.json()) as List_api_calls_for_user_return;
  return result;
}
