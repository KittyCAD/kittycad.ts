import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ml } from '../../src/index.ts'

const iso = '2023-01-01T00:00:00Z'

function mkT2C(idNum) {
  const pad = String(idNum).padStart(12, '0')
  return {
    conversation_id: '00000000-0000-0000-0000-000000000000',
    created_at: iso,
    id: `11111111-1111-1111-1111-${pad}`,
    model: 'cad',
    model_version: 'v1',
    output_format: 'step',
    prompt: 'test',
    status: 'completed',
    type: 'text_to_cad',
    updated_at: iso,
    user_id: '22222222-2222-2222-2222-222222222222',
  }
}

function makeRes(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('pagination ml.list_text_to_cad_models_for_user_pager', () => {
  const originalFetch = globalThis.fetch
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('walks two pages and yields unique items', async () => {
    const page1 = {
      items: Array.from({ length: 10 }, (_, i) => mkT2C(i + 1)),
      next_page: 'tok2',
    }
    const page2 = {
      items: [mkT2C(11), mkT2C(12)],
      next_page: null,
    }
    const mock = vi
      .fn()
      .mockResolvedValueOnce(makeRes(page1))
      .mockResolvedValueOnce(makeRes(page2))
    globalThis.fetch = mock

    const pager = ml.list_text_to_cad_models_for_user_pager({
      limit: 10,
      page_token: '',
      sort_by: 'created_at_ascending',
      conversation_id: '00000000-0000-0000-0000-000000000000',
      no_models: true,
    })

    let count = 0
    const ids = new Set()

    while (pager.hasNext()) {
      const chunk = await pager.next()
      for (const x of chunk) {
        ids.add(x.id)
        count++
        if (count >= 12) break
      }
      if (count >= 12) break
    }

    expect(count).toBe(12)
    expect(ids.size).toBe(12)
    expect(pager.hasNext()).toBe(false)
    expect(await pager.next()).toEqual([])
    expect(mock).toHaveBeenCalledTimes(2)
  })
})
