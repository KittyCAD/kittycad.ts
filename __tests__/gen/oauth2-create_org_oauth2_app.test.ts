import { oauth2, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await oauth2.create_org_oauth2_app({
    body: { name: 'The display name of the app.' },
    client,
  })
  return response
}

describe('Testing oauth2.create_org_oauth2_app', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
