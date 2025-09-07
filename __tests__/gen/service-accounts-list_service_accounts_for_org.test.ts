import { service_accounts } from '../../src/index.js';

async function example() {
  const response = await service_accounts.list_service_accounts_for_org({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });

  return response;
}

describe('Testing service_accounts.list_service_accounts_for_org', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
