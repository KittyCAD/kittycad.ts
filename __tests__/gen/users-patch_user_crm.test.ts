import { users } from '../../src/index.js';

async function example() {
  const response = await users.patch_user_crm({
    body: {
      cad_industry: 'The industry of the user.',
      cad_user_type: 'The user type.',
      number_of_cad_users: 'The user count of the user.',
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing users.patch_user_crm', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
