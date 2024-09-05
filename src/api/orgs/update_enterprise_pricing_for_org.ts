import {
  ZooProductSubscriptions_type,
  Error_type,
  Uuid_type,
  SubscriptionTierPrice_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Update_enterprise_pricing_for_org_params {
  client?: Client;
  id: Uuid_type;
  body: SubscriptionTierPrice_type;
}

type Update_enterprise_pricing_for_org_return =
  | ZooProductSubscriptions_type
  | Error_type;

export default async function update_enterprise_pricing_for_org({
  client,
  id,
  body,
}: Update_enterprise_pricing_for_org_params): Promise<Update_enterprise_pricing_for_org_return> {
  const url = `/orgs/${id}/enterprise/pricing`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result =
    (await response.json()) as Update_enterprise_pricing_for_org_return;
  return result;
}
