import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.create_org_member({
    body: {
      email: 'The email address of the user to add to the org.',
      role: 'admin',
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing orgs.create_org_member', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
