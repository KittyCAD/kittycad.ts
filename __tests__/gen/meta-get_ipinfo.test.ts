import { meta, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await meta.get_ipinfo({ client })
  return response
}

describe('Testing meta.get_ipinfo', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
