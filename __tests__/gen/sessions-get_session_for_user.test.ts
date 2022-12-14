import { sessions } from '../../src/index.js';

async function example() {
  const response = await sessions.get_session_for_user({ token: 'string' });
  if ('error_code' in response) throw response;

  return response;
}

describe('Testing sessions.get_session_for_user', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy();
  });
});
