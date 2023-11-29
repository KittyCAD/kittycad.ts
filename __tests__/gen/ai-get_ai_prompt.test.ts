import { ai } from '../../src/index.js';

async function example() {
  const response = await ai.get_ai_prompt({ id: 'string' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ai.get_ai_prompt', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
