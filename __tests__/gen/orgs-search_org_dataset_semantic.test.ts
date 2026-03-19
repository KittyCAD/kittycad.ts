import { orgs, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await orgs.search_org_dataset_semantic({
    id: '00000000-0000-0000-0000-000000000000',
    limit: 7,
    q: 'string',
    client,
  })
  return response
}

describe('Testing orgs.search_org_dataset_semantic', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
