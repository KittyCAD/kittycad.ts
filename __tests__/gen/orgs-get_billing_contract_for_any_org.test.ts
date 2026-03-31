import { orgs, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await orgs.get_billing_contract_for_any_org({
    id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing orgs.get_billing_contract_for_any_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
