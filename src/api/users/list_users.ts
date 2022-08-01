import fetch from 'node-fetch';
import { UserResultsPage_type, Error_type } from '../../models.js';

interface List_users_params {
  limit: string;
  page_token: string;
  sort_by: string;
}

type List_users_return = UserResultsPage_type | Error_type;

export default async function list_users({
  limit,
  page_token,
  sort_by,
}: List_users_params): Promise<List_users_return> {
  const url = `/users?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
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
  const result = (await response.json()) as List_users_return;
  return result;
}
