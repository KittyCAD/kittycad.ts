import {
  OrgMember_type,
  Error_type,
  Uuid_type,
  UpdateMemberToOrgBody_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Update_org_member_params {
  client?: Client;
  user_id: Uuid_type;
  body: UpdateMemberToOrgBody_type;
}

type Update_org_member_return = OrgMember_type | Error_type;

export default async function update_org_member({
  client,
  user_id,
  body,
}: Update_org_member_params): Promise<Update_org_member_return> {
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
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Update_org_member_return;
  return result;
}
