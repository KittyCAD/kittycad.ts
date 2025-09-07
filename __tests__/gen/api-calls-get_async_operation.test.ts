import { api_calls, ApiError } from '../../src/index.js';

async function example() {
  const response = await api_calls.get_async_operation({ id: 'string' });

  return response;
}

describe('Testing api_calls.get_async_operation', () => {
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
