import fetch from 'node-fetch';
import { AsyncApiCallResultsPage_type, Error_type } from '../../models.js';

interface List_async_operations_params {
  limit: number;
  page_token: string;
  sort_by: string;
  status: string;
}

type List_async_operations_return = AsyncApiCallResultsPage_type | Error_type;

export default async function list_async_operations({
  limit,
  page_token,
  sort_by,
  status,
}: List_async_operations_params): Promise<List_async_operations_return> {
  const url = `/async/operations?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}&status=${status}`;
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
  const result = (await response.json()) as List_async_operations_return;
  return result;
}
