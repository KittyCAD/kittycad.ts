import { PaymentMethod_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface List_payment_methods_for_user_params {
  client?: Client;
}

type List_payment_methods_for_user_return = PaymentMethod_type[] | Error_type;

export default async function list_payment_methods_for_user({
  client,
}: List_payment_methods_for_user_params = {}): Promise<List_payment_methods_for_user_return> {
  const url = `/user/payment/methods`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
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
    (await response.json()) as List_payment_methods_for_user_return;
  return result;
}
