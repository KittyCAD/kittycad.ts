import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.put_public_sales_form({
    body: {
      cad_platforms: ['string'],
      company: 'The company name.',
      email: 'The email address of the user.',
      first_name: 'The first name of the user.',
      industry: 'The industry of the user.',
      inquiry_type: 'pilot_inquiry',
      job_title: 'The job title (used for pilot inquiries).',
      last_name: 'The last name of the user.',
      message: 'The message content.',
      num_cad_users: 'The number of CAD users (used for pilot inquiries).',
      phone: 'The phone number of the user.',
    },
    client,
  })
  return response
}

describe('Testing users.put_public_sales_form', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
