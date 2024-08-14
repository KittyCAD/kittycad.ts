import { Onboarding_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_user_onboarding_self_params {
  client?: Client;
}

type Get_user_onboarding_self_return = Onboarding_type | Error_type;

export default async function get_user_onboarding_self({
  client,
}: Get_user_onboarding_self_params = {}): Promise<Get_user_onboarding_self_return> {
  const url = `/user/onboarding`;
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
  const result = (await response.json()) as Get_user_onboarding_self_return;
  return result;
}
