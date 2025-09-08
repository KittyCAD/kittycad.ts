import { orgs, ApiError } from '../../src/index.js'

async function example() {
  const response = await orgs.list_org_members({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    role: 'admin',
  })
  return response
}

// Pagination example (not executed in tests; for docs only)
export async function example_pager() {
  const pager = orgs.list_org_members_pager({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    role: 'admin',
  })
  let total = 0
  // Pull up to two pages just to illustrate usage
  for (let i = 0; i < 2 && pager.hasNext(); i++) {
    const items = await pager.next()
    total += items.length
  }
  return total
}

describe('Testing orgs.list_org_members', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
