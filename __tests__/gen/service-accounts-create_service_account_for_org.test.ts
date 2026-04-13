import { service_accounts, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await service_accounts.create_service_account_for_org({
    label: 'string',
    client,
  })
  return response
}

describe('Testing service_accounts.create_service_account_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
