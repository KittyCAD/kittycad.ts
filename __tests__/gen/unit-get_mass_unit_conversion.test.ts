import { unit, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await unit.get_mass_unit_conversion({
    input_unit: 'g',
    output_unit: 'kg',
    value: 7,
    client,
  })
  return response
}

describe('Testing unit.get_mass_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
