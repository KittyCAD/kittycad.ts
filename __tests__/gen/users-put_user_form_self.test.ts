import { ApiError, users } from '../../src/index.js'

async function example() {
  const response = await users.put_user_form_self({
    body: {
      company: 'The company name.',
      email: 'The email address of the user.',
      first_name: 'The first name of the user.',
      industry: 'The industry of the user.',
      inquiry_type: 'general_inquiry',
      last_name: 'The last name of the user.',
      message: 'The message content.',
      phone: 'The phone number of the user.',
    },
  })
  return response
}

describe('Testing users.put_user_form_self', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
