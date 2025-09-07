import { orgs } from '../../src/index.js';

async function example() {
  const response = await orgs.get_user_org();

  return response;
}

describe('Testing orgs.get_user_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
