import { users, ApiError } from '../../src/index.js';

async function example() {
  const response = await users.patch_user_crm({
    body: {
      cad_industry: 'The industry of the user.',
      cad_user_type: 'The user type.',
      number_of_cad_users: 'The user count of the user.',
    },
  });

  return response;
}

describe('Testing users.patch_user_crm', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      // Only present in tests expected to throw
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
