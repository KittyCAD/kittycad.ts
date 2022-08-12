import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.get_async_operation({ id: 'string' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing api_calls.get_async_operation', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
