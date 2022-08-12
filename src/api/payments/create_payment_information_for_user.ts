import fetch from 'node-fetch';
import { Customer_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_payment_information_for_user_params {
  client?: Client;
}

type Create_payment_information_for_user_return = Customer_type | Error_type;

export default async function create_payment_information_for_user({
  client,
}: Create_payment_information_for_user_params = {}): Promise<Create_payment_information_for_user_return> {
  const url = `/user/payment`;
  const fullUrl = 'https://api.kittycad.io' + url;
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
    (await response.json()) as Create_payment_information_for_user_return;
  return result;
}
