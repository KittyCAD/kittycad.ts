import { file } from '../../src/index.js';

async function example() {
  const response = await file.create_file_execution({
    lang: 'go',
    output: 'string',
    body: 'base64 encoded string',
  });
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing file.create_file_execution', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
