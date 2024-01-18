import fetch from 'node-fetch';
import { Org_type, Error_type, OrgDetails_type } from '../../models.js';
import { Client } from '../../client.js';

interface Create_org_params {
  client?: Client;
  body: OrgDetails_type;
}

type Create_org_return = Org_type | Error_type;

export default async function create_org({
  client,
  body,
}: Create_org_params): Promise<Create_org_return> {
  const url = `/org`;
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
  const result = (await response.json()) as Create_org_return;
  return result;
}
