import fetch from 'node-fetch';
import { PaymentMethod_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface List_payment_methods_for_org_params {
  client?: Client;
}

type List_payment_methods_for_org_return = PaymentMethod_type[] | Error_type;

export default async function list_payment_methods_for_org({
  client,
}: List_payment_methods_for_org_params = {}): Promise<List_payment_methods_for_org_return> {
  const url = `/org/payment/methods`;
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
  const result = (await response.json()) as List_payment_methods_for_org_return;
  return result;
}
