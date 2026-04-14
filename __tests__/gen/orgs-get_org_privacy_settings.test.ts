import { orgs, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await orgs.get_org_privacy_settings({ client })
  return response
}

describe('Testing orgs.get_org_privacy_settings', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
