import fetch from 'node-fetch';
import { IpAddrInfo_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_ipinfo_params {
  client?: Client;
}

type Get_ipinfo_return = IpAddrInfo_type | Error_type;

export default async function get_ipinfo({
  client,
}: Get_ipinfo_params = {}): Promise<Get_ipinfo_return> {
  const url = `/_meta/ipinfo`;
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
  const result = (await response.json()) as Get_ipinfo_return;
  return result;
}
