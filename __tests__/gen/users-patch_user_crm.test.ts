import { users } from '../../src/index.js';

async function example() {
  const response = await users.patch_user_crm({
    body: {
      cad_industry: 'The industry of the user.',
      cad_user_count: 'The user count of the user.',
      cad_user_type: 'The user type.',
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing users.patch_user_crm', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
