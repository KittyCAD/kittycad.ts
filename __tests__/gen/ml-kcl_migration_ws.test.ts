import { ml, Client } from '@kittycad/lib'

async function example() {
  const client = new Client('your-token')
  const conn = await ml.kcl_migration_ws.connect({ client })
}

describe('Testing ml.kcl_migration_ws', () => {
  it('should be truthy or throw', async () => {
    expect(true).toBeTruthy()
  })
})
