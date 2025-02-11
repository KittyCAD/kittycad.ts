import { meta } from '../../src/index.js';

async function example() {
  const response = await meta.create_debug_uploads({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
  });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing meta.create_debug_uploads', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
