import { ZooProductSubscription_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_pricing_subscriptions_params {
  client?: Client;
}

type Get_pricing_subscriptions_return =
  | ZooProductSubscription_type[]
  | Error_type;

export default async function get_pricing_subscriptions({
  client,
}: Get_pricing_subscriptions_params = {}): Promise<Get_pricing_subscriptions_return> {
  const url = `/pricing/subscriptions`;
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
  const result = (await response.json()) as Get_pricing_subscriptions_return;
  return result;
}
