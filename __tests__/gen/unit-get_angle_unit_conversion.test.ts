import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_angle_unit_conversion({
    input_unit: 'degrees',
    output_unit: 'radians',
    value: 7,
  });
  return response;
}

describe('Testing unit.get_angle_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
