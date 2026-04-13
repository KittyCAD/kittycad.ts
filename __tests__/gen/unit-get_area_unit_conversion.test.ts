import { unit, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await unit.get_area_unit_conversion({
    input_unit: 'cm2',
    output_unit: 'dm2',
    value: 7,
    client,
  })
  return response
}

describe('Testing unit.get_area_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
