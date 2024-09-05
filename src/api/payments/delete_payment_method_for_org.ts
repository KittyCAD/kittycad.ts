import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Delete_payment_method_for_org_params {
  client?: Client;
  id: string;
}

type Delete_payment_method_for_org_return = Error_type;

export default async function delete_payment_method_for_org({
  client,
  id,
}: Delete_payment_method_for_org_params): Promise<Delete_payment_method_for_org_return> {
  const url = `/org/payment/methods/${id}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'DELETE',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result =
    (await response.json()) as Delete_payment_method_for_org_return;
  return result;
}
