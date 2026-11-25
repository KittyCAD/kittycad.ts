import { executor, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await executor.list_execution_jobs({
    limit: 7,
    page_token: 'string',
    status: 'queued',
    runtime_id: 'string',
    created_after: 'string',
    sort_by: 'created_at_ascending',
    client,
  })
  return response
}

// Pagination example (not executed in tests; for docs only)
export async function example_pager() {
  const pager = executor.list_execution_jobs_pager({
    limit: 7,
    page_token: 'string',
    status: 'queued',
    runtime_id: 'string',
    created_after: 'string',
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

describe('Testing executor.list_execution_jobs', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
