import fetch from 'node-fetch';
import { CustomerBalance_type, Error_type } from '../../models.js';

type Get_payment_balance_for_user_return = CustomerBalance_type | Error_type;

export default async function get_payment_balance_for_user(): Promise<Get_payment_balance_for_user_return> {
  const url = `/user/payment/balance`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_payment_balance_for_user_return;
  return result;
}
