import { modeling } from '../../src/index.js';

async function example() {
  const response = await modeling.cmd();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing modeling.cmd', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
