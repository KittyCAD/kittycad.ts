import { apps } from '../../src/index.js';

async function example() {
  const response = await apps.apps_github_consent();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing apps.apps_github_consent', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
