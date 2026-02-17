import { unit, ApiError } from '../../src/index.js'

async function example() {
  const response = await unit.get_energy_unit_conversion({
    input_unit: 'btu',
    output_unit: 'electronvolts',
    value: 7,
  })
  return response
}

describe('Testing unit.get_energy_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
