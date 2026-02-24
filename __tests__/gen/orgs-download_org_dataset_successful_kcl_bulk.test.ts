import { orgs, ApiError } from '../../src/index.js'

async function example() {
  const response = await orgs.download_org_dataset_successful_kcl_bulk({
    id: '00000000-0000-0000-0000-000000000000',
  })
  return response
}

describe('Testing orgs.download_org_dataset_successful_kcl_bulk', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
