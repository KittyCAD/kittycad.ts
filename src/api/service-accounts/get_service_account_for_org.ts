import {
  ServiceAccount_type,
  Error_type,
  ServiceAccountUuid_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Get_service_account_for_org_params {
  client?: Client;
  token: ServiceAccountUuid_type;
}

type Get_service_account_for_org_return = ServiceAccount_type | Error_type;

export default async function get_service_account_for_org({
  client,
  token,
}: Get_service_account_for_org_params): Promise<Get_service_account_for_org_return> {
  const url = `/org/service-accounts/${token}`;
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
  };
  const fetchOptions = {
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_service_account_for_org_return;
  return result;
}
