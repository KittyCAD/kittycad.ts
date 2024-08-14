import { AppClientInfo_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Apps_github_consent_params {
  client?: Client;
}

type Apps_github_consent_return = AppClientInfo_type | Error_type;

export default async function apps_github_consent({
  client,
}: Apps_github_consent_params = {}): Promise<Apps_github_consent_return> {
  const url = `/apps/github/consent`;
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
  const result = (await response.json()) as Apps_github_consent_return;
  return result;
}
