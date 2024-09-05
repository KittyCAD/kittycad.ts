import { Org_type, Error_type, OrgDetails_type } from '../../models.js';
import { Client } from '../../client.js';

interface Update_org_params {
  client?: Client;
  body: OrgDetails_type;
}

type Update_org_return = Org_type | Error_type;

export default async function update_org({
  client,
  body,
}: Update_org_params): Promise<Update_org_return> {
  const url = `/org`;
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
  const result = (await response.json()) as Update_org_return;
  return result;
}
