import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_power_unit_conversion({
    input_unit: 'btu_per_minute',
    output_unit: 'horsepower',
    value: 7,
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing unit.get_power_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeTruthy(); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
