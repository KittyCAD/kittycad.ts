import fetch from 'node-fetch';
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
  const result = (await response.json()) as List_async_operations_return;
  return result;
}
