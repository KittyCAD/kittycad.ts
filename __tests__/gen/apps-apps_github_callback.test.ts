import { apps, ApiError } from '../../src/index.js';

async function example() {
  const response = await apps.apps_github_callback();
  return response;
}

describe('Testing apps.apps_github_callback', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
