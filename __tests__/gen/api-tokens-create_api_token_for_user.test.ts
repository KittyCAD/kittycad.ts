import { api_tokens } from '../../src/index.js';

async function example() {
  const response = await api_tokens.create_api_token_for_user({
    label: 'string',
  });
  return response;
}

describe('Testing api_tokens.create_api_token_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
