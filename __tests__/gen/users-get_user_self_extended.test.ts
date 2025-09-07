import { users } from '../../src/index.js'

async function example() {
  const response = await users.get_user_self_extended()
  return response
}

describe('Testing users.get_user_self_extended', () => {
  it('should be truthy or throw', async () => {
    expect(await example()).toBeTruthy()
  })
})
