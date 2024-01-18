import fetch from 'node-fetch';
import {
  OrgMemberResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
  OrgRole_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface List_org_members_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
  role: OrgRole_type;
}

type List_org_members_return = OrgMemberResultsPage_type | Error_type;

export default async function list_org_members({
  client,
  limit,
  page_token,
  sort_by,
  role,
}: List_org_members_params): Promise<List_org_members_return> {
  const url = `/org/members?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}&role=${role}`;
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
  const result = (await response.json()) as List_org_members_return;
  return result;
}
