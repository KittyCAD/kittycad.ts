import fetch from 'node-fetch';
import { User_type, Error_type } from '../../models.js';

type Get_user_self_return = User_type | Error_type;

export default async function get_user_self(): Promise<Get_user_self_return> {
  const url = `/user`;
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
  const result = (await response.json()) as Get_user_self_return;
  return result;
}
