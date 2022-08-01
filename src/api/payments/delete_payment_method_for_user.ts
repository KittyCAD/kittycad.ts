import fetch from 'node-fetch';
import { Error_type } from '../../models.js';

interface Delete_payment_method_for_user_params {
  id: string;
}

type Delete_payment_method_for_user_return = Error_type;

export default async function delete_payment_method_for_user({
  id,
}: Delete_payment_method_for_user_params): Promise<Delete_payment_method_for_user_return> {
  const url = `/user/payment/methods/${id}`;
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
    (await response.json()) as Delete_payment_method_for_user_return;
  return result;
}
