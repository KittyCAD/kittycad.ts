import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.get_org_shortlinks({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing orgs.get_org_shortlinks', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
