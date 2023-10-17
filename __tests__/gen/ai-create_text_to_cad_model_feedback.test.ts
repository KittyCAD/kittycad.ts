import { ai } from '../../src/index.js';

async function example() {
  const response = await ai.create_text_to_cad_model_feedback({
    id: 'string',
    feedback: 'thumbs_up',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ai.create_text_to_cad_model_feedback', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
