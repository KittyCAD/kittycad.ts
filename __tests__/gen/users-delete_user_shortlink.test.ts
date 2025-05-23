import { users } from '../../src/index.js';

async function example() {
  const response = await users.delete_user_shortlink({ key: 'string' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing users.delete_user_shortlink', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
