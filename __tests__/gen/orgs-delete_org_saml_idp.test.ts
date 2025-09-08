import { orgs, ApiError } from '../../src/index.js'

async function example() {
  const response = await orgs.delete_org_saml_idp()
  return response
}

describe('Testing orgs.delete_org_saml_idp', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
