import { ai } from '../../src/index.js';

async function example() {
  const response = await ai.get_text_to_cad_model_for_user({ id: 'string' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ai.get_text_to_cad_model_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
