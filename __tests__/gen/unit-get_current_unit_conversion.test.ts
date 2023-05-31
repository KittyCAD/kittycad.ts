import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_current_unit_conversion({
    input_unit: 'amperes',
    output_unit: 'microamperes',
    value: 7,
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing unit.get_current_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
