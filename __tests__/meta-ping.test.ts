import { meta, Client } from '../src/index.js';

// Create a client with your token.
async function ExampleWithClient() {
  const client = new Client(process.env.KITTYCAD_TOKEN || '');
  const response = await meta.ping({ client });
  if ('error_code' in response) throw 'error';
  // console.log(response.message); // 'pong'
  return response;
}

// - OR -

// Your token will be parsed from the environment
// variable: 'KITTYCAD_TOKEN'.
async function ExampleWithOutClient() {
  const response = await meta.ping();
  if ('error_code' in response) throw 'error';
  // console.log(response.message); // 'pong'
  return response;
}

describe('Testing meta.ping', () => {
  it('should work with Client', async () => {
    const response = await ExampleWithClient();
    expect(response.message).toBe('pong');
  });
  it('should work without Client', async () => {
    const response = await ExampleWithOutClient();
    expect(response.message).toBe('pong');
  });
});
