import {
  ZooProductSubscriptions_type,
  Error_type,
  ZooProductSubscriptionsOrgRequest_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_org_subscription_params {
  client?: Client;
  body: ZooProductSubscriptionsOrgRequest_type;
}

type Create_org_subscription_return = ZooProductSubscriptions_type | Error_type;

export default async function create_org_subscription({
  client,
  body,
}: Create_org_subscription_params): Promise<Create_org_subscription_return> {
  const url = `/org/payment/subscriptions`;
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
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Create_org_subscription_return;
  return result;
}
