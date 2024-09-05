import { PaymentIntent_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_payment_intent_for_user_params {
  client?: Client;
}

type Create_payment_intent_for_user_return = PaymentIntent_type | Error_type;

export default async function create_payment_intent_for_user({
  client,
}: Create_payment_intent_for_user_params = {}): Promise<Create_payment_intent_for_user_return> {
  const url = `/user/payment/intent`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
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
    (await response.json()) as Create_payment_intent_for_user_return;
  return result;
}
