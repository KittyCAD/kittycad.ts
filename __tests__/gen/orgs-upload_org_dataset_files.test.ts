import { orgs, ApiError } from '../../src/index.js'

async function example() {
  const response = await orgs.upload_org_dataset_files({
    files: [
      {
        name: 'thing.kcl',
        data: new Blob(['thing = 1'], { type: 'text/plain' }),
      },
    ],
    id: '00000000-0000-0000-0000-000000000000',
  })
  return response
}

describe('Testing orgs.upload_org_dataset_files', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
