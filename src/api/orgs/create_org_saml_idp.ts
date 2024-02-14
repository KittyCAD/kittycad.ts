import fetch from 'node-fetch';
import {
  SamlIdentityProvider_type,
  Error_type,
  SamlIdentityProviderCreate_type,
} from '../../models.js';
import { Client } from '../../client.js';

interface Create_org_saml_idp_params {
  client?: Client;
  body: SamlIdentityProviderCreate_type;
}

type Create_org_saml_idp_return = SamlIdentityProvider_type | Error_type;

export default async function create_org_saml_idp({
  client,
  body,
}: Create_org_saml_idp_params): Promise<Create_org_saml_idp_return> {
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
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Create_org_saml_idp_return;
  return result;
}
