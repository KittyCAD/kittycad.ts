import { orgs, ApiError } from '../../src/index.js'

async function example() {
  const response = await orgs.update_enterprise_pricing_for_org({
    id: '00000000-0000-0000-0000-000000000000',
    body: { interval: 'day', price: 7, type: 'flat' },
  })
  return response
}

describe('Testing orgs.update_enterprise_pricing_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
