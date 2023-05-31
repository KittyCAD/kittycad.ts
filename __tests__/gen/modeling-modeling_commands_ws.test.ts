import { modeling } from '../../src/index.js';

async function example() {
  const response = await modeling.modeling_commands_ws();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing modeling.modeling_commands_ws', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
