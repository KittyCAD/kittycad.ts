import { api_tokens } from '../../src/index.js';

async function example() {
  const response = await api_tokens.delete_api_token_for_user({
    token: 'string',
  });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing api_tokens.delete_api_token_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
