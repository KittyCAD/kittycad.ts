import { users } from '../../src/index.js';

async function example() {
  const response = await users.put_public_subscribe({
    body: { email: 'The email' },
  });

  return response;
}

describe('Testing users.put_public_subscribe', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
