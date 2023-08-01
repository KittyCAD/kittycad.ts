import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_volume_unit_conversion({
    input_unit: 'cm3',
    output_unit: 'ft3',
    value: 7,
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing unit.get_volume_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
