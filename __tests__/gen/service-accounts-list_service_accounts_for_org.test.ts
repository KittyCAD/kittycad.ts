import { service_accounts, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await service_accounts.list_service_accounts_for_org({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    client,
  })
  return response
}

// Pagination example (not executed in tests; for docs only)
export async function example_pager() {
  const pager = service_accounts.list_service_accounts_for_org_pager({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    client,
  })
  let total = 0
  // Pull up to two pages just to illustrate usage
  for (let i = 0; i < 2 && pager.hasNext(); i++) {
    const items = await pager.next()
    total += items.length
  }
  return total
}

describe('Testing service_accounts.list_service_accounts_for_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
