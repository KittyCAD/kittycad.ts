import {
  ShortlinkResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_org_shortlinks_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
}

type Get_org_shortlinks_return = ShortlinkResultsPage_type | Error_type;

export default async function get_org_shortlinks({
  client,
  limit,
  page_token,
  sort_by,
}: Get_org_shortlinks_params): Promise<Get_org_shortlinks_return> {
  const url = `/org/shortlinks?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result = (await response.json()) as Get_org_shortlinks_return;
  return result;
}
