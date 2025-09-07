import { orgs, ApiError } from '../../src/index.js';

async function example() {
  const response = await orgs.create_org_member({
    body: {
      email: 'The email address of the user to add to the org.',
      role: 'admin',
    },
  });

  return response;
}

describe('Testing orgs.create_org_member', () => {
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
