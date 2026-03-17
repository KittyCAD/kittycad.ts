import { apps, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await apps.apps_github_consent({ client })
  return response
}

describe('Testing apps.apps_github_consent', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
