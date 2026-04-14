import { oauth2, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await oauth2.get_org_oauth2_app({
    client_id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing oauth2.get_org_oauth2_app', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
