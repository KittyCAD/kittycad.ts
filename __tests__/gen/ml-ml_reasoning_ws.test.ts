import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.ml_reasoning_ws({
    id: 'string',
    body: { type: 'headers' },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing ml.ml_reasoning_ws', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
