import { ServiceAccount_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_service_account_for_org_params {
  client?: Client;
  label: string;
}

type Create_service_account_for_org_return = ServiceAccount_type | Error_type;

export default async function create_service_account_for_org({
  client,
  label,
}: Create_service_account_for_org_params): Promise<Create_service_account_for_org_return> {
  const url = `/org/service-accounts?label=${label}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as Create_service_account_for_org_return;
  return result;
}
