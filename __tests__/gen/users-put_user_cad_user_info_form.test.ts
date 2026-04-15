import { users, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await users.put_user_cad_user_info_form({
    body: {
      cad_experience_level: 'beginner',
      cad_industry: 'mechanical_engineering',
      cad_user_type: 'student_or_researcher',
      company_size: 'one_to_ten',
      design_workflow: 'sketching',
      has_used_zoo_design_studio_or_api_before: true,
      how_did_you_find_us: 'google',
      how_did_you_find_us_other:
        'Optional free-text value when "Other" is selected.',
      location_city: "Optional city for the user's location.",
      location_country: "Optional country for the user's location.",
      location_state: "Optional state or region for the user's location.",
      number_of_cad_users: 'The number of CAD users.',
      what_are_you_building:
        'Optional free-text description of what the user wants to build.',
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
