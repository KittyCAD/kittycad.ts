import { ml } from '../../src/index.js';

async function example() {
  const response = await ml.get_ml_prompt({ id: 'string' });

  return response;
}

describe('Testing ml.get_ml_prompt', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
