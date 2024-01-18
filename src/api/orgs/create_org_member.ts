import fetch from 'node-fetch';
import { OrgMember_type, Error_type, AddOrgMember_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_org_member_params {
  client?: Client;
  body: AddOrgMember_type;
}

type Create_org_member_return = OrgMember_type | Error_type;

export default async function create_org_member({
  client,
  body,
}: Create_org_member_params): Promise<Create_org_member_return> {
  const url = `/org/members`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Create_org_member_return;
  return result;
}
