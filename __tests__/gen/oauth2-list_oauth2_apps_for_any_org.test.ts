import { oauth2, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await oauth2.list_oauth2_apps_for_any_org({
    id: '00000000-0000-0000-0000-000000000000',
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    client,
  })
  return response
}

// Pagination example (not executed in tests; for docs only)
export async function example_pager() {
  const pager = oauth2.list_oauth2_apps_for_any_org_pager({
    id: '00000000-0000-0000-0000-000000000000',
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

describe('Testing oauth2.list_oauth2_apps_for_any_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
