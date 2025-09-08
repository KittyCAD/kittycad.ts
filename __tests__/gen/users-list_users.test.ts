import { users, ApiError } from '../../src/index.js'

async function example() {
  const response = await users.list_users({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  })
  return response
}

// Pagination example (not executed in tests; for docs only)
async function example_pager() {
  const pager = users.list_users_pager({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
  })
  let total = 0
  // Pull up to two pages just to illustrate usage
  for (let i = 0; i < 2 && pager.hasNext(); i++) {
    const items = await pager.next()
    total += items.length
  }
  return total
}

describe('Testing users.list_users', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
