import { executor } from '../../src/index.js';

async function example() {
  const response = await executor.create_executor_term();
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing executor.create_executor_term', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
