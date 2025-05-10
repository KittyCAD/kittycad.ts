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
  // Backwards compatible for the BASE_URL env variable
  // That used to exist in only this lib, ZOO_HOST exists in the all the other
  // sdks and the CLI.
  const urlBase =
    process?.env?.ZOO_HOST || process?.env?.BASE_URL || 'https://api.zoo.dev';
  const fullUrl = urlBase + url;
  // The other sdks use to use KITTYCAD_API_TOKEN, now they still do for
  // backwards compatibility, but the new standard is ZOO_API_TOKEN.
  // For some reason only this lib supported KITTYCAD_TOKEN, so we need to
  // check for that as well.
  const kittycadToken = client
    ? client.token || process.env.ZOO_API_TOKEN || ''
    : process.env.KITTYCAD_TOKEN ||
      process.env.KITTYCAD_API_TOKEN ||
      process.env.ZOO_API_TOKEN ||
      '';
  const headers = {
    Authorization: `Bearer ${kittycadToken}`,
    'Content-Type': 'text/plain',
  };
  const fetchOptions = {
    method: 'DELETE',
    headers,
  };
  const response = await fetch(fullUrl, fetchOptions);
  const result = (await response.json()) as Delete_org_saml_idp_return;
  return result;
}
