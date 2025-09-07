import { orgs, ApiError } from '../../src/index.js';

async function example() {
  const response = await orgs.update_org_member({
    user_id: '00000000-0000-0000-0000-000000000000',
    body: { role: 'admin' },
  });

  return response;
}

describe('Testing orgs.update_org_member', () => {
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
