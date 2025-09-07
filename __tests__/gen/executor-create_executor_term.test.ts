import { executor, Client } from '../../src/index.js';

async function example() {
  const response = await executor.create_executor_term.connect({
    client: new Client(process.env.KITTYCAD_TOKEN),
  });
  response.close();
  return true;
}

describe('Testing WS executor.create_executor_term', () => {
  it('connects and closes', async () => {
    expect(await example()).toBeTruthy();
  });
});
