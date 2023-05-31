import fetch from 'node-fetch';
import {
  UserResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface List_users_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
}

type List_users_return = UserResultsPage_type | Error_type;

export default async function list_users({
  client,
  limit,
  page_token,
  sort_by,
}: List_users_params): Promise<List_users_return> {
  const url = `/users?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
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
  const result = (await response.json()) as List_users_return;
  return result;
}
