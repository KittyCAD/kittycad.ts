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
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
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
