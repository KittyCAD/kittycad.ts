import fetch from 'node-fetch';
import { Customer_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_payment_information_for_user_params {
  client?: Client;
}

type Get_payment_information_for_user_return = Customer_type | Error_type;

export default async function get_payment_information_for_user({
  client,
}: Get_payment_information_for_user_params = {}): Promise<Get_payment_information_for_user_return> {
  const url = `/user/payment`;
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
    (await response.json()) as Get_payment_information_for_user_return;
  return result;
}
