import { orgs, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await orgs.create_org({
    body: {
      allow_users_in_domain_to_auto_join: true,
      billing_email: 'The billing email address of the org.',
      domain: "The org's domain.",
      image: 'The image for the org. This is a URL.',
      name: 'The name of the org.',
      phone: "The org's phone number.",
    },
    client,
  })
  return response
}

describe('Testing orgs.create_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
