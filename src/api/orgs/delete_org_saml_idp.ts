import fetch from 'node-fetch';
import { Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Delete_org_saml_idp_params {
  client?: Client;
}

type Delete_org_saml_idp_return = Error_type;

export default async function delete_org_saml_idp({
  client,
}: Delete_org_saml_idp_params = {}): Promise<Delete_org_saml_idp_return> {
  const url = `/org/saml/idp`;
  const urlBase = process?.env?.BASE_URL || 'https://api.kittycad.io';
  const fullUrl = urlBase + url;
  const kittycadToken = client
    ? client.token
    : process.env.KITTYCAD_TOKEN || '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
  };
  const fetchOptions = {
    method: 'DELETE',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Delete_org_saml_idp_return;
  return result;
}
