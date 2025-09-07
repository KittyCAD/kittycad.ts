import { unit } from '../../src/index.js'

async function example() {
  const response = await unit.get_temperature_unit_conversion({
    input_unit: 'celsius',
    output_unit: 'fahrenheit',
    value: 7,
  })
  return response
}

describe('Testing unit.get_temperature_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy()
  })
})
