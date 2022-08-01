import fetch from 'node-fetch';
import { Metadata_type, Error_type } from '../../models.js';

type Get_metadata_return = Metadata_type | Error_type;

export default async function get_metadata(): Promise<Get_metadata_return> {
  const url = `/_meta/info`;
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
  const result = (await response.json()) as Get_metadata_return;
  return result;
}
