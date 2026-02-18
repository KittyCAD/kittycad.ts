import { orgs, ApiError } from '../../src/index.js'

async function example() {
  const response = await orgs.retrigger_org_dataset({
    id: '00000000-0000-0000-0000-000000000000',
    statuses: 'string',
  })
  return response
}

describe('Testing orgs.retrigger_org_dataset', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
