import { unit } from '../../src/index.js';

async function example() {
  const response = await unit.get_torque_unit_conversion({
    input_unit: 'newton_metres',
    output_unit: 'pound_foot',
    value: 7,
  });

  return response;
}

describe('Testing unit.get_torque_unit_conversion', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
