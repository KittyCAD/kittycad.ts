import fetch from 'node-fetch';
import { Invoice_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface List_invoices_for_user_params {
  client?: Client;
}

type List_invoices_for_user_return = Invoice_type[] | Error_type;

export default async function list_invoices_for_user({
  client,
}: List_invoices_for_user_params = {}): Promise<List_invoices_for_user_return> {
  const url = `/user/payment/invoices`;
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
  const result = (await response.json()) as List_invoices_for_user_return;
  return result;
}
