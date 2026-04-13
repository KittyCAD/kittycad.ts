import { apps, Client, ApiError } from '@kittycad/lib'
import fsp from 'fs/promises'

const client = new Client()

async function example() {
  const response = await apps.apps_github_webhook({
    body: await fsp.readFile('./example', 'base64'),
    client,
  })
  return response
}

describe('Testing apps.apps_github_webhook', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
