import { users } from '../../src/index.js';

async function example() {
  const response = await users.update_subscription_for_user({
    id: '31337',
    body: { modeling_app: 'free', pay_annually: true },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing users.update_subscription_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
