import { OrgMember_type, Error_type, Uuid_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_org_member_params {
  client?: Client;
  user_id: Uuid_type;
}

type Get_org_member_return = OrgMember_type | Error_type;

export default async function get_org_member({
  client,
  user_id,
}: Get_org_member_params): Promise<Get_org_member_return> {
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
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_org_member_return;
  return result;
}
