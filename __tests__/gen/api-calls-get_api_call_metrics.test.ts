import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.get_api_call_metrics({ group_by: 'email' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing api_calls.get_api_call_metrics', () => {
  it('should be truthy or throw', async () => {
    const examplePromise = example();
    const timeoutPromise = new Promise((r) =>
      setTimeout(() => r('timeout'), 450),
    );
    expect(await Promise.any([examplePromise, timeoutPromise])).toBe('timeout');
  });
});
