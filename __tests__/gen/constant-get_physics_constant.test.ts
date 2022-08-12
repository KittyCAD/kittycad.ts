import { constant } from '../../src/index.js';

async function example() {
  const response = await constant.get_physics_constant({ constant: 'c' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing constant.get_physics_constant', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
