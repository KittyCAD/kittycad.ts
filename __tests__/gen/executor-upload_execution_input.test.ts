import { executor, Client, ApiError } from '@kittycad/lib'
import fsp from 'fs/promises'

const client = new Client()

async function example() {
  const response = await executor.upload_execution_input({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    body: await fsp.readFile('./example', 'base64'),
    client,
  })
  return response
}

describe('Testing executor.upload_execution_input', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
