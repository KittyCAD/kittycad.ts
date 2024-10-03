import { Session_type, Error_type, SessionUuid_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_session_for_user_params {
  client?: Client;
  token: SessionUuid_type;
}

type Get_session_for_user_return = Session_type | Error_type;

export default async function get_session_for_user({
  client,
  token,
}: Get_session_for_user_params): Promise<Get_session_for_user_return> {
  const url = `/user/session/${token}`;
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
  const result = (await response.json()) as Get_session_for_user_return;
  return result;
}
