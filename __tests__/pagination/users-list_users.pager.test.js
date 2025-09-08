import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { users } from '../../src/index.js'

const iso = '2023-01-01T00:00:00Z'

function mkUser(i) {
  const pad = String(i).padStart(12, '0')
  return {
    id: `00000000-0000-0000-0000-${pad}`,
    image: 'https://example.com/a.png',
    created_at: iso,
    updated_at: iso,
  }
}

function makeRes(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('pagination users.list_usersPager', () => {
  const originalFetch = globalThis.fetch
  beforeEach(() => {
    vi.restoreAllMocks()
  })
  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('walks two pages and yields unique items', async () => {
    const page1 = {
      items: Array.from({ length: 10 }, (_, i) => mkUser(i + 1)),
      next_page: 'tok2',
    }
    const page2 = {
      items: [mkUser(11), mkUser(12)],
      next_page: null,
    }
    const mock = vi
      .fn()
      .mockResolvedValueOnce(makeRes(page1))
      .mockResolvedValueOnce(makeRes(page2))
    globalThis.fetch = mock

    const pager = users.list_usersPager({
      limit: 10,
      page_token: '',
      sort_by: 'created_at_ascending',
    })

    let count = 0
    const ids = new Set()

    while (pager.hasNext()) {
      const chunk = await pager.next()
      for (const u of chunk) {
        ids.add(u.id)
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

