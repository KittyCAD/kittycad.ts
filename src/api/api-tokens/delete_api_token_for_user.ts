import fetch from 'node-fetch';
import { Error_type } from '../../models.js';

interface Delete_api_token_for_user_params {
  token: string;
}

type Delete_api_token_for_user_return = Error_type;

export default async function delete_api_token_for_user({
  token,
}: Delete_api_token_for_user_params): Promise<Delete_api_token_for_user_return> {
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
  const result = (await response.json()) as Delete_api_token_for_user_return;
  return result;
}
