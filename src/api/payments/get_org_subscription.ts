import fetch from 'node-fetch';
import { ZooProductSubscriptions_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_org_subscription_params {
  client?: Client;
}

type Get_org_subscription_return = ZooProductSubscriptions_type | Error_type;

export default async function get_org_subscription({
  client,
}: Get_org_subscription_params = {}): Promise<Get_org_subscription_return> {
  const url = `/org/payment/subscriptions`;
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
  const result = (await response.json()) as Get_org_subscription_return;
  return result;
}
