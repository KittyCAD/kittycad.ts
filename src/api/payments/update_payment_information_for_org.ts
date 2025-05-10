import { Customer_type, Error_type, BillingInfo_type } from '../../models.js';
import { Client } from '../../client.js';

interface Update_payment_information_for_org_params {
  client?: Client;
  body: BillingInfo_type;
}

type Update_payment_information_for_org_return = Customer_type | Error_type;

export default async function update_payment_information_for_org({
  client,
  body,
}: Update_payment_information_for_org_params): Promise<Update_payment_information_for_org_return> {
  const url = `/org/payment`;
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
    'Content-Type': 'application/json',
  };
  const fetchOptions = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as Update_payment_information_for_org_return;
  return result;
}
