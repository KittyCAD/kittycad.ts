import { users } from '../../src/index.js';

async function example() {
  const response = await users.update_user_self({
    body: {
      company: "The user's company.",
      discord: "The user's Discord handle.",
      first_name: "The user's first name.",
      github: "The user's GitHub handle.",
      image:
        "The image URL for the user. NOTE: If the user uses an OAuth2 provider, this will be overwritten by the provider's image URL when the user logs in next.",
      is_onboarded: true,
      last_name: "The user's last name.",
      phone: "The user's phone number.",
    },
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing users.update_user_self', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
