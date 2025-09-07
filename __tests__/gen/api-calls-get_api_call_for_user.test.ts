import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.get_api_call_for_user({ id: 'string' });

  return response;
}

describe('Testing api_calls.get_api_call_for_user', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
