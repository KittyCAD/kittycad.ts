import { users } from '../../src/index.js';

async function example() {
  const response = await users.get_user_onboarding_self();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing users.get_user_onboarding_self', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
