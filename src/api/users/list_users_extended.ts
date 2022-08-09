import fetch from 'node-fetch';
import { ExtendedUserResultsPage_type, Error_type } from '../../models.js';

interface List_users_extended_params {
  limit: number;
  page_token: string;
  sort_by: string;
}

type List_users_extended_return = ExtendedUserResultsPage_type | Error_type;

export default async function list_users_extended({
  limit,
  page_token,
  sort_by,
}: List_users_extended_params): Promise<List_users_extended_return> {
  const url = `/users-extended?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
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
  const result = (await response.json()) as List_users_extended_return;
  return result;
}
