import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_magnetic_field_strength_unit_conversion({
    output_format: 'tesla',
    src_format: 'tesla',
    value: 7,
  });
  if ('error_code' in response) throw 'error';

  return response;
}

describe('Testing unit.get_magnetic_field_strength_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
