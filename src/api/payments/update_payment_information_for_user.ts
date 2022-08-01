import fetch from 'node-fetch';
import { Customer_type, Error_type } from '../../models.js';

type Update_payment_information_for_user_return = Customer_type | Error_type;

export default async function update_payment_information_for_user(): Promise<Update_payment_information_for_user_return> {
  const url = `/user/payment`;
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
  const result =
    (await response.json()) as Update_payment_information_for_user_return;
  return result;
}
