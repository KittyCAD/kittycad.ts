import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.get_api_call_for_user({ id: 'string' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing api_calls.get_api_call_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
