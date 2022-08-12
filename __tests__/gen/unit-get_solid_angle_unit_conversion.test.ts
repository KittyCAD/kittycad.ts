import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_solid_angle_unit_conversion({
    output_format: 'steradian',
    src_format: 'degree_squared',
    value: 7,
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing unit.get_solid_angle_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
