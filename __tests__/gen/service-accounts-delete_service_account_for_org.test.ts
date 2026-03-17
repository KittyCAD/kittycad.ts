import { service_accounts, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await service_accounts.delete_service_account_for_org({
    token: 'svc-00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing service_accounts.delete_service_account_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
