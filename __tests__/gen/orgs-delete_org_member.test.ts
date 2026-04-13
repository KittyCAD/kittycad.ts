import { orgs, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await orgs.delete_org_member({
    user_id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing orgs.delete_org_member', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
