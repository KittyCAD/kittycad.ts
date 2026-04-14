import { orgs, Client, ApiError } from '@kittycad/lib'

const client = new Client()

async function example() {
  const response = await orgs.upsert_billing_contract_for_any_org({
    id: '00000000-0000-0000-0000-000000000000',
    body: {
      billing_cadence: 'annual',
      commitment_scope: 'pooled',
      currency:
        'A billing currency code. This is intentionally billing-owned instead of Stripe-owned, so contract and manual invoice flows can use the same validated type without reaching back into a provider-specific crate.',
      discount_description:
        'Free-form finance note for discounts or negotiated pricing.',
      effective_at: 'Timestamp when the contract starts to apply.',
      external_customer_id:
        'Provider-owned customer reference for downstream invoicing systems.',
      items: [],
      name: 'Human-readable contract label.',
      notes: 'Internal notes about the contract.',
      periods: [],
      provider: 'stripe',
      rollover_policy: 'none',
      status: 'draft',
      term_end_at: 'Timestamp when the contract term ends.',
    },
    client,
  })
  return response
}

describe('Testing orgs.upsert_billing_contract_for_any_org', () => {
  it('should be truthy or throw', async () => {
    try {
      await example()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
    }
  })
})
