import fetch from 'node-fetch';
import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Delete_payment_method_for_user_params {
  client?: Client;
  id: string;
}

type Delete_payment_method_for_user_return = Error_type;

export default async function delete_payment_method_for_user({
  client,
  id,
}: Delete_payment_method_for_user_params): Promise<Delete_payment_method_for_user_return> {
  const url = `/user/payment/methods/${id}`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
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
    (await response.json()) as Delete_payment_method_for_user_return;
  return result;
}
