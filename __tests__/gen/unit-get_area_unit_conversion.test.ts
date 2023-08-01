import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_area_unit_conversion({
    input_unit: 'cm2',
    output_unit: 'dm2',
    value: 7,
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing unit.get_area_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
