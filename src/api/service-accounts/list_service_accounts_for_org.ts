import {
  ServiceAccountResultsPage_type,
  CreatedAtSortMode_type,
} from '../../models.js';
import { Client } from '../../client.js';
import { throwIfNotOk } from '../../errors.js';

interface List_service_accounts_for_org_params {
  client?: Client;
  limit: number;
  page_token: string;
  sort_by: CreatedAtSortMode_type;
}

type List_service_accounts_for_org_return = ServiceAccountResultsPage_type;

export default async function list_service_accounts_for_org({
  client,
  limit,
  page_token,
  sort_by,
}: List_service_accounts_for_org_params): Promise<List_service_accounts_for_org_return> {
  const url = `/org/service-accounts?limit=${limit}&page_token=${page_token}&sort_by=${sort_by}`;
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
  const result =
    (await response.json()) as List_service_accounts_for_org_return;
  return result;
}
