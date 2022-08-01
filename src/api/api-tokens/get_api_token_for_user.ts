import fetch from 'node-fetch';
import { ApiToken_type, Error_type } from '../../models.js';

interface Get_api_token_for_user_params {
  token: string;
}

type Get_api_token_for_user_return = ApiToken_type | Error_type;

export default async function get_api_token_for_user({
  token,
}: Get_api_token_for_user_params): Promise<Get_api_token_for_user_return> {
  const url = `/user/api-tokens/${token}`;
  const fullUrl = 'https://api.kittycad.io' + url;
  const kittycadToken = process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'POST',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_api_token_for_user_return;
  return result;
}
