import {
  OrgMemberResultsPage_type,
  CreatedAtSortMode_type,
  UserOrgRole_type,
} from '../../models.js';
import { Client } from '../../client.js';
import { throwIfNotOk } from '../../errors.js';

interface List_org_members_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
  role: UserOrgRole_type;
}

type List_org_members_return = OrgMemberResultsPage_type;

export default async function list_org_members({
  client,
  limit,
  page_token,
  sort_by,
  role,
}: List_org_members_params): Promise<List_org_members_return> {
  const url = `/org/members?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}&role=${role}`;
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
    'Content-Type': 'text/plain',
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  await throwIfNotOk(response);
  const result = (await response.json()) as List_org_members_return;
  return result;
}
