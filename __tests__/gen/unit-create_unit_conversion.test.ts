import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.create_unit_conversion({
    output_format: 'atto',
    src_format: 'atto',
    value: 7,
  });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing unit.create_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
