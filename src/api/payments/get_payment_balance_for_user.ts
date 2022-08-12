import fetch from 'node-fetch';
import { CustomerBalance_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_payment_balance_for_user_params {
  client?: Client;
}

type Get_payment_balance_for_user_return = CustomerBalance_type | Error_type;

export default async function get_payment_balance_for_user({
  client,
}: Get_payment_balance_for_user_params = {}): Promise<Get_payment_balance_for_user_return> {
  const url = `/user/payment/balance`;
  const fullUrl = 'https://api.kittycad.io' + url;
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
  const result = (await response.json()) as Get_payment_balance_for_user_return;
  return result;
}
