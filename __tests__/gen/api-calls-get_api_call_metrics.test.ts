import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.get_api_call_metrics({ group_by: 'email' });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing api_calls.get_api_call_metrics', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
