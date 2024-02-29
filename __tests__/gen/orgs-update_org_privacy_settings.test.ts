import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.update_org_privacy_settings({
    body: { can_train_on_data: true },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing orgs.update_org_privacy_settings', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
