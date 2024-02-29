import fetch from 'node-fetch';
import {
  ZooProductSubscriptions_type,
  Error_type,
  ZooProductSubscriptionsOrgRequest_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Update_org_subscription_params {
  client?: Client;
  body: ZooProductSubscriptionsOrgRequest_type;
}

type Update_org_subscription_return = ZooProductSubscriptions_type | Error_type;

export default async function update_org_subscription({
  client,
  body,
}: Update_org_subscription_params): Promise<Update_org_subscription_return> {
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
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Update_org_subscription_return;
  return result;
}
