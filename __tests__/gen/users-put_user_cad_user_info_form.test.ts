import { users, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await users.put_user_cad_user_info_form({
    body: {
      cad_industry: 'mechanical_engineering',
      cad_user_type: 'student_or_researcher',
      company_size: 'one_to_ten',
      how_did_you_find_us: 'google',
      how_did_you_find_us_other:
        "Optional free-text value when 'Other' is selected.",
      number_of_cad_users: 'The number of CAD users.',
    },
    client,
  })
  return response
}

describe('Testing users.put_user_cad_user_info_form', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
