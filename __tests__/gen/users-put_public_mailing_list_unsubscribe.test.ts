import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.put_public_mailing_list_unsubscribe({
    slug: 'string',
    body: { email: 'Email address to add or remove.' },
    client,
  })
  return response
}

describe('Testing users.put_public_mailing_list_unsubscribe', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
