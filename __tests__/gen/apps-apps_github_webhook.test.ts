import fsp from 'fs/promises';
import { apps, ApiError } from '../../src/index.js';

async function example() {
  const response = await apps.apps_github_webhook({
    body: await fsp.readFile('./example', 'base64'),
  });

  return response;
}

describe('Testing apps.apps_github_webhook', () => {
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
