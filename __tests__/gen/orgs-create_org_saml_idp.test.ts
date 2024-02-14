import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.create_org_saml_idp({
    body: {
      idp_entity_id: 'The entity ID of the SAML identity provider.',
      idp_metadata_source: {
        type: 'url',
        url: 'The URL of the identity provider metadata descriptor.',
      },
      signing_keypair: {
        private_key: 'The request signing private key (pem file).',
        public_cert: 'The request signing public certificate (pem file).',
      },
      technical_contact_email:
        'The technical contact email address for the SAML identity provider.',
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing orgs.create_org_saml_idp', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
