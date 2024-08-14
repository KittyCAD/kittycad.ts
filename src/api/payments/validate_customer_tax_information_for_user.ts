import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Validate_customer_tax_information_for_user_params {
  client?: Client;
}

type Validate_customer_tax_information_for_user_return = Error_type;

export default async function validate_customer_tax_information_for_user({
  client,
}: Validate_customer_tax_information_for_user_params = {}): Promise<Validate_customer_tax_information_for_user_return> {
  const url = `/user/payment/tax`;
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
  const result =
    (await response.json()) as Validate_customer_tax_information_for_user_return;
  return result;
}
