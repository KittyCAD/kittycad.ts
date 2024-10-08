import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.create_kcl_code_completions({
    body: {
      extra: {
        language: 'The language of the code.',
        next_indent: 7,
        prompt_tokens: 7,
        suffix_tokens: 7,
        trim_by_indentation: true,
      },
      max_tokens: 7,
      n: 7,
      nwo: 'For GitHub copilot this is the `{org}/{repo}`. This does not do anything yet. But we wanted the same API as GitHub Copilot. It might be used in the future.',
      prompt: 'The prompt for the model.',
      stop: ['string'],
      stream: true,
      suffix: 'The suffix for the model.',
      temperature: 7,
      top_p: 7,
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ml.create_kcl_code_completions', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
