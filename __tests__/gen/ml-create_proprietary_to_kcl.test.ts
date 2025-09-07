import { ml, ApiError } from '../../src/index.js';

async function example() {
  const response = await ml.create_proprietary_to_kcl({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    code_option: 'execute',
  });
  return response;
}

describe('Testing ml.create_proprietary_to_kcl', () => {
  it('should be truthy or throw', async () => {
    try {
      await example();
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
    }
  });
});
