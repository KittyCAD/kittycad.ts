import { payments, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await payments.list_invoices_for_org({ client })
  return response
}

describe('Testing payments.list_invoices_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
