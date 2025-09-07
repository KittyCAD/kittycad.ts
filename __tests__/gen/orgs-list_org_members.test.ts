import { ApiError, orgs } from '../../src/index.js'

async function example() {
  const response = await orgs.list_org_members({
    limit: 7,
    page_token: 'string',
    sort_by: 'created_at_ascending',
    role: 'admin',
  })
  return response
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
