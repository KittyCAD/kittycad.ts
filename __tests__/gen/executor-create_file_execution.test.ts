import fsp from 'fs/promises';
import { executor } from '../../src/index.js';

async function example() {
  const response = await executor.create_file_execution({
    lang: 'go',
    output: 'string',
    body: await fsp.readFile('./example', 'base64'),
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing executor.create_file_execution', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
