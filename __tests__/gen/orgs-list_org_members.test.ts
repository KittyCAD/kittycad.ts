import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.list_org_members({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    role: 'admin',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing orgs.list_org_members', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
