import fetch from 'node-fetch';
import { Error_type } from '../../models.js';

type Get_schema_return = Error_type;

export default async function get_schema(): Promise<Get_schema_return> {
  const url = `/`;
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
  const result = (await response.json()) as Get_schema_return;
  return result;
}
