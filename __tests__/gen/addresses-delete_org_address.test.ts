import { addresses, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await addresses.delete_org_address({
    id: '00000000-0000-0000-0000-000000000000',
    expected_revision: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing addresses.delete_org_address', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
