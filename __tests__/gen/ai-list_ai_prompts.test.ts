import { ai } from '../../src/index.js';

async function example() {
  const response = await ai.list_ai_prompts({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ai.list_ai_prompts', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
