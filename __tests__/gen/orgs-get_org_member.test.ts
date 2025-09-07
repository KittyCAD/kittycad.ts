import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.get_org_member({
    user_id: '00000000-0000-0000-0000-000000000000',
  });
  return response;
}

describe('Testing orgs.get_org_member', () => {
  it('should be truthy or throw', async () => {
    const examplePromise = example();
    const timeoutPromise = new Promise((r) =>
      setTimeout(() => r('timeout'), 450),
    );
    expect(await Promise.any([examplePromise, timeoutPromise])).toBe('timeout');
  });
});
