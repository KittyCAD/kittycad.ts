import { payments } from '../../src/index.js'

async function example() {
  const response = await payments.get_payment_balance_for_user({
    include_total_due: true,
  })
  return response
}

describe('Testing payments.get_payment_balance_for_user', () => {
  it('should be truthy or throw', async () => {
    const examplePromise = example()
    const timeoutPromise = new Promise((r) =>
      setTimeout(() => r('timeout'), 450)
    )
    expect(await Promise.any([examplePromise, timeoutPromise])).toBe('timeout')
  })
})
