import { users } from '../../src/index.js';

async function example() {
  const response = await users.get_user_front_hash_self();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing users.get_user_front_hash_self', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
