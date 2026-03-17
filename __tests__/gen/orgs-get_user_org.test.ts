import { orgs, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await orgs.get_user_org({ client })
  return response
}

describe('Testing orgs.get_user_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
