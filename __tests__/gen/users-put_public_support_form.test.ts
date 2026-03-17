import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.put_public_support_form({
    body: {
      company: 'Optional company metadata.',
      email: 'The email address of the user.',
      first_name: 'The first name of the user.',
      inquiry_type: 'technical_support',
      last_name: 'The last name of the user.',
      message: 'The message content.',
      phone: 'Optional phone metadata.',
    },
    client,
  })
  return response
}

describe('Testing users.put_public_support_form', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
