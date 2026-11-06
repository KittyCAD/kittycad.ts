import { addresses, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await addresses.update_org_address({
    id: '00000000-0000-0000-0000-000000000000',
    body: {
      contact: {
        company: 'Company name, or an empty string when absent.',
        phone: 'Delivery contact phone, or an empty string when absent.',
        recipient: 'Individual or department receiving the delivery.',
      },
      expected_revision: 'A UUID usually v4 or v7',
      is_default_shipping: true,
      label: 'Replacement card label.',
      postal: {
        city: 'The city component.',
        country: 'An ISO-3166 alpha-2 country code. Always uppercase.',
        state: 'The state component.',
        street1: 'The first street component.',
        street2: 'The second street component.',
        zip: 'The zip component.',
      },
    },
    client,
  })
  return response
}

describe('Testing addresses.update_org_address', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
