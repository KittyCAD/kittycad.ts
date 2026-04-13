import { api_calls, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await api_calls.list_async_operations({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    status: 'queued',
    client,
  })
  return response
}

// Pagination example (not executed in tests; for docs only)
export async function example_pager() {
  const pager = api_calls.list_async_operations_pager({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    status: 'queued',
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

describe('Testing api_calls.list_async_operations', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
