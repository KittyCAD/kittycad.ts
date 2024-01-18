import fetch from 'node-fetch';
import { Error_type, Uuid_type } from '../../models.js';
import { Client } from '../../client.js';

interface Delete_org_member_params {
  client?: Client;
  user_id: Uuid_type;
}

type Delete_org_member_return = Error_type;

export default async function delete_org_member({
  client,
  user_id,
}: Delete_org_member_params): Promise<Delete_org_member_return> {
  const url = `/org/members/${user_id}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'DELETE',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Delete_org_member_return;
  return result;
}
