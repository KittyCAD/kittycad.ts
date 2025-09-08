import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ml } from '../../src/index.ts'

function makeRes(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('query building skips undefined params', () => {
  const originalFetch = globalThis.fetch
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('does not include page_token/conversation_id when undefined', async () => {
    const mock = vi.fn().mockResolvedValueOnce(
      makeRes({ items: [], next_page: null })
    )
    globalThis.fetch = mock

    await ml.list_text_to_cad_models_for_user({
      limit: 5,
      sort_by: 'created_at_descending',
      no_models: true,
      // page_token and conversation_id intentionally omitted (undefined)
    })

    expect(mock).toHaveBeenCalledTimes(1)
    const calledUrl = String(mock.mock.calls[0][0])
    expect(calledUrl).toContain('/user/text-to-cad')
    expect(calledUrl).toContain('limit=5')
    expect(calledUrl).toContain('sort_by=created_at_descending')
    expect(calledUrl).toContain('no_models=true')
    expect(calledUrl).not.toContain('page_token=')
    expect(calledUrl).not.toContain('conversation_id=')
    expect(calledUrl).not.toContain('undefined')
  })
})

