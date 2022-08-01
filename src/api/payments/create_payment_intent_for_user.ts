import fetch from 'node-fetch';
import { PaymentIntent_type, Error_type } from '../../models.js';

type Create_payment_intent_for_user_return = PaymentIntent_type | Error_type;

export default async function create_payment_intent_for_user(): Promise<Create_payment_intent_for_user_return> {
  const url = `/user/payment/intent`;
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
    (await response.json()) as Create_payment_intent_for_user_return;
  return result;
}
