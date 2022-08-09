import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_angle_unit_conversion({
    output_format: 'radian',
    src_format: 'radian',
    value: 7,
  });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing unit.get_angle_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
