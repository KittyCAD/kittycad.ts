import fetch from 'node-fetch';
import { ExtendedUser_type, Error_type } from '../../models.js';

type Get_user_self_extended_return = ExtendedUser_type | Error_type;

export default async function get_user_self_extended(): Promise<Get_user_self_extended_return> {
  const url = `/user/extended`;
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
  const result = (await response.json()) as Get_user_self_extended_return;
  return result;
}
