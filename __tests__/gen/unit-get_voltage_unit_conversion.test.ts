import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_voltage_unit_conversion({
    output_format: 'volt',
    src_format: 'statvolt',
    value: 7,
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing unit.get_voltage_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
