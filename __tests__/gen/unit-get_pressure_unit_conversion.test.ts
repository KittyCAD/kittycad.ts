import { unit, ApiError } from '../../src/index.js'

async function example() {
  const response = await unit.get_pressure_unit_conversion({
    input_unit: 'atmospheres',
    output_unit: 'bars',
    value: 7,
  })
  return response
}

describe('Testing unit.get_pressure_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
