import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_concentration_unit_conversion({
    output_format: 'parts_per_million',
    src_format: 'parts_per_billion',
    value: 7,
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing unit.get_concentration_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
