import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.list_orgs({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });

  return response;
}

describe('Testing orgs.list_orgs', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
