import fetch from 'node-fetch';
import { Invoice_type, Error_type } from '../../models.js';

type List_invoices_for_user_return = Invoice_type[] | Error_type;

export default async function list_invoices_for_user(): Promise<List_invoices_for_user_return> {
  const url = `/user/payment/invoices`;
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
  const result = (await response.json()) as List_invoices_for_user_return;
  return result;
}
