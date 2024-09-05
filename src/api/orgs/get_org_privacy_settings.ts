import { PrivacySettings_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_org_privacy_settings_params {
  client?: Client;
}

type Get_org_privacy_settings_return = PrivacySettings_type | Error_type;

export default async function get_org_privacy_settings({
  client,
}: Get_org_privacy_settings_params = {}): Promise<Get_org_privacy_settings_return> {
  const url = `/org/privacy`;
  const urlBase = process?.env?.BASE_URL || 'https://api.zoo.dev';
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
  const result = (await response.json()) as Get_org_privacy_settings_return;
  return result;
}
