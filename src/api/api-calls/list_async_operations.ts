import {
  AsyncApiCallResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
  ApiCallStatus_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface List_async_operations_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
  status: ApiCallStatus_type;
}

type List_async_operations_return = AsyncApiCallResultsPage_type | Error_type;

export default async function list_async_operations({
  client,
  limit,
  page_token,
  sort_by,
  status,
}: List_async_operations_params): Promise<List_async_operations_return> {
  const url = `/async/operations?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}&status=${status}`;
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
  const result = (await response.json()) as List_async_operations_return;
  return result;
}
