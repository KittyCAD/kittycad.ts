import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.get_org_privacy_settings();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing orgs.get_org_privacy_settings', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
