import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_angular_velocity_unit_conversion({
    output_format: 'radians_per_second',
    src_format: 'radians_per_second',
    value: 7,
  });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing unit.get_angular_velocity_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
