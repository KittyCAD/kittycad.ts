import { SamlIdentityProvider_type, Error_type } from '../../models.js';
import { Client } from '../../client.js';

interface Get_org_saml_idp_params {
  client?: Client;
}

type Get_org_saml_idp_return = SamlIdentityProvider_type | Error_type;

export default async function get_org_saml_idp({
  client,
}: Get_org_saml_idp_params = {}): Promise<Get_org_saml_idp_return> {
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
    method: 'GET',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Get_org_saml_idp_return;
  return result;
}
