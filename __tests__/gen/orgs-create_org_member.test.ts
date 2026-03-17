import { orgs, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await orgs.create_org_member({
    body: {
      email: 'The email address of the user to add to the org.',
      role: 'admin',
    },
    client,
  })
  return response
}

describe('Testing orgs.create_org_member', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
