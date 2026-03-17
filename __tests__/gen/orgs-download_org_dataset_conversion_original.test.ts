import { orgs, Client, ApiError } from '../../src/index.js'

const client = new Client()

async function example() {
  const response = await orgs.download_org_dataset_conversion_original({
    conversion_id: '00000000-0000-0000-0000-000000000000',
    id: '00000000-0000-0000-0000-000000000000',
    client,
  })
  return response
}

describe('Testing orgs.download_org_dataset_conversion_original', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
