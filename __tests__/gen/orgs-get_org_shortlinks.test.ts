import { orgs, ApiError } from '../../src/index.js';

async function example() {
  const response = await orgs.get_org_shortlinks({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  });

  return response;
}

describe('Testing orgs.get_org_shortlinks', () => {
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
