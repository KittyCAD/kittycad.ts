import { Customer_type, Error_type, BillingInfo_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_payment_information_for_org_params {
  client?: Client;
  body: BillingInfo_type;
}

type Create_payment_information_for_org_return = Customer_type | Error_type;

export default async function create_payment_information_for_org({
  client,
  body,
}: Create_payment_information_for_org_params): Promise<Create_payment_information_for_org_return> {
  const url = `/org/payment`;
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
  const result =
    (await response.json()) as Create_payment_information_for_org_return;
  return result;
}
