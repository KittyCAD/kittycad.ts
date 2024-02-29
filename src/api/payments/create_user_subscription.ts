import fetch from 'node-fetch';
import {
  ZooProductSubscriptions_type,
  Error_type,
  ZooProductSubscriptionsUserRequest_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_user_subscription_params {
  client?: Client;
  body: ZooProductSubscriptionsUserRequest_type;
}

type Create_user_subscription_return =
  | ZooProductSubscriptions_type
  | Error_type;

export default async function create_user_subscription({
  client,
  body,
}: Create_user_subscription_params): Promise<Create_user_subscription_return> {
  const url = `/user/payment/subscriptions`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
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
  const result = (await response.json()) as Create_user_subscription_return;
  return result;
}
