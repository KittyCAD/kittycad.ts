import {
  ServiceAccountResultsPage_type,
  Error_type,
  CreatedAtSortMode_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface List_service_accounts_for_org_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
}

type List_service_accounts_for_org_return =
  | ServiceAccountResultsPage_type
  | Error_type;

export default async function list_service_accounts_for_org({
  client,
  limit,
  page_token,
  sort_by,
}: List_service_accounts_for_org_params): Promise<List_service_accounts_for_org_return> {
  const url = `/org/service-accounts?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
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
  const result =
    (await response.json()) as List_service_accounts_for_org_return;
  return result;
}
