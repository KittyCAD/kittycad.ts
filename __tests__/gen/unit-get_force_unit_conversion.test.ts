import { unit, ApiError } from '../../src/index.js'

async function example() {
  const response = await unit.get_force_unit_conversion({
    input_unit: 'dynes',
    output_unit: 'kiloponds',
    value: 7,
  })
  return response
}

describe('Testing unit.get_force_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
