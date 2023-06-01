import fetch from 'node-fetch';
import { ExtendedUser_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_user_extended_params {
  client?: Client;
  id: string;
}

type Get_user_extended_return = ExtendedUser_type | Error_type;

export default async function get_user_extended({
  client,
  id,
}: Get_user_extended_params): Promise<Get_user_extended_return> {
  const url = `/users-extended/${id}`;
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
  const result = (await response.json()) as Get_user_extended_return;
  return result;
}
