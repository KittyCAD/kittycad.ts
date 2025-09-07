import { api_calls } from '../../src/index.js';

async function example() {
  const response = await api_calls.get_api_call_for_org({ id: 'string' });

  return response;
}

describe('Testing api_calls.get_api_call_for_org', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
