import { users } from '../../src/index.js';

async function example() {
  const response = await users.get_user_self_extended();
  if ('error_code' in response) throw 'error';
  console.log(JSON.stringify(response, null, 2));
  return response;
}

describe('Testing users.get_user_self_extended', () => {
  it('should be truthy or throw', async () => {
    try {
      const result = await example();
      expect(result).toBeTruthy();
    } catch (err) {
      expect(err).toBe(''); // eslint-disable-line jest/no-conditional-expect
    }
  });
});
