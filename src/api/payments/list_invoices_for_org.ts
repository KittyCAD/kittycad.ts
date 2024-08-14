import { Invoice_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface List_invoices_for_org_params {
  client?: Client;
}

type List_invoices_for_org_return = Invoice_type[] | Error_type;

export default async function list_invoices_for_org({
  client,
}: List_invoices_for_org_params = {}): Promise<List_invoices_for_org_return> {
  const url = `/org/payment/invoices`;
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
  const result = (await response.json()) as List_invoices_for_org_return;
  return result;
}
