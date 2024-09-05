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
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result =
    (await response.json()) as Update_payment_information_for_org_return;
  return result;
}
