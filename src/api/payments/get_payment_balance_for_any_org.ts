import { CustomerBalance_type, Error_type, Uuid_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_payment_balance_for_any_org_params {
  client?: Client;
  id: Uuid_type;
}

type Get_payment_balance_for_any_org_return = CustomerBalance_type | Error_type;

export default async function get_payment_balance_for_any_org({
  client,
  id,
}: Get_payment_balance_for_any_org_params): Promise<Get_payment_balance_for_any_org_return> {
  const url = `/orgs/${id}/payment/balance`;
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
    (await response.json()) as Get_payment_balance_for_any_org_return;
  return result;
}
