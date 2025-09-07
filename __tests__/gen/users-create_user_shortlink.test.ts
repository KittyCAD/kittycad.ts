import { users } from '../../src/index.js';

async function example() {
  const response = await users.create_user_shortlink({
    body: {
      password:
        'The password for the shortlink, if you want to restrict access to it. This can only be set if your subscription allows for it. Otherwise, it will return an error. When you access the link it will be required to enter this password through basic auth. The username will be `{anything}` and the password will be the password you set here.',
      restrict_to_org: true,
      url: 'The URL to redirect back to.',
    },
  });

  return response;
}

describe('Testing users.create_user_shortlink', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
