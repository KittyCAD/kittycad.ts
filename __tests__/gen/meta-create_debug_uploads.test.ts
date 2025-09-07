import { meta, ApiError } from '../../src/index.js';

async function example() {
  const response = await meta.create_debug_uploads({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
  });
  return response;
}

describe('Testing meta.create_debug_uploads', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
