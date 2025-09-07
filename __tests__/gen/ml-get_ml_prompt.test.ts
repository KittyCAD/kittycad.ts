import { ml, ApiError } from '../../src/index.js';

async function example() {
  const response = await ml.get_ml_prompt({ id: 'string' });

  return response;
}

describe('Testing ml.get_ml_prompt', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      // Only present in tests expected to throw
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
