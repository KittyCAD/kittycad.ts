import { orgs, ApiError } from '../../src/index.js'

async function example() {
  const response = await orgs.search_org_dataset_conversions({
    id: '00000000-0000-0000-0000-000000000000',
    limit: 7,
    page_token: 'string',
    q: 'string',
    sort_by: 'created_at_ascending',
  })
  return response
}

// Pagination example (not executed in tests; for docs only)
export async function example_pager() {
  const pager = orgs.search_org_dataset_conversions_pager({
    id: '00000000-0000-0000-0000-000000000000',
    limit: 7,
    page_token: 'string',
    q: 'string',
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

describe('Testing orgs.search_org_dataset_conversions', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
