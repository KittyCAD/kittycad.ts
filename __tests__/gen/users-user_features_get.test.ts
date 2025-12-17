import { users } from '../../src/index.js'

async function example() {
  const response = await users.user_features_get()
  return response
}

describe('Testing users.user_features_get', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy()
  })
})
