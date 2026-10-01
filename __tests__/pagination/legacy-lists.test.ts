import { describe, expect, it, vi } from 'vitest'
import {
  ApiError,
  Client,
  collectApiList,
  meta,
  ml,
  orgs,
  projects,
} from '@kittycad/lib'

function response(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function clientFor(fetch: typeof globalThis.fetch): Client {
  return new Client({
    token: 'test-token',
    baseUrl: 'https://example.test/sdk',
    fetch,
  })
}

function deferred<T>() {
  let resolve: (value: T) => void
  const promise = new Promise<T>((r) => {
    resolve = r
  })
  return { promise, resolve: (value: T) => resolve(value) }
}

const id = '00000000-0000-0000-0000-000000000001'
interface LegacyCall {
  name: string
  path: string
  read: (client: Client, signal?: AbortSignal) => Promise<unknown>
  legacyListField?: string
}

const legacyCalls: LegacyCall[] = [
  {
    name: 'announcements',
    path: '/announcements',
    read: (client, signal) => meta.get_announcements({ client, signal }),
    legacyListField: 'announcements',
  },
  {
    name: 'user projects',
    path: '/user/projects',
    read: (client, signal) => projects.list_projects({ client, signal }),
  },
  {
    name: 'project share links',
    path: `/user/projects/${id}/share-links`,
    read: (client, signal) =>
      projects.list_project_share_links({ client, signal, id }),
  },
  {
    name: 'semantic search',
    path: `/org/datasets/${id}/search/semantic?q=some+words&limit=2`,
    read: (client, signal) =>
      orgs.search_org_dataset_semantic({
        client,
        signal,
        id,
        q: 'some words',
        limit: 2,
      }),
  },
]

function expectedList(call: LegacyCall, items: unknown[]) {
  return call.legacyListField ? { [call.legacyListField]: items } : items
}

describe.each(legacyCalls)('generated legacy GET: $name', (call) => {
  it.each([{ items: [] }, { items: [{ id: 'legacy' }] }])(
    'preserves legacy responses: %j',
    async ({ items }) => {
      const body = expectedList(call, items)
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(response(body))
      expect(await call.read(clientFor(fetch))).toEqual(body)
      expect(fetch).toHaveBeenCalledTimes(1)
    }
  )

  it('collects every page with the configured transport and cancellation', async () => {
    const cursor = 'opaque+/?=&% cursor'
    const first = [{ id: 'first' }]
    const last = [{ id: 'last' }]
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(response({ items: first, next_page: cursor }))
      .mockResolvedValueOnce(response({ items: [], next_page: 'last' }))
      .mockResolvedValueOnce(response({ items: last, next_page: null }))
    const controller = new AbortController()

    expect(await call.read(clientFor(fetch), controller.signal)).toEqual(
      expectedList(call, [...first, ...last])
    )
    const initial = `https://example.test/sdk${call.path}`
    expect(fetch.mock.calls[0][0]).toBe(initial)
    const second = new URL(initial)
    second.searchParams.set('page_token', cursor)
    expect(fetch.mock.calls[1][0]).toBe(second.href)
    second.searchParams.set('page_token', 'last')
    expect(fetch.mock.calls[2][0]).toBe(second.href)
    for (const [, init] of fetch.mock.calls) {
      expect(init).toEqual({
        method: 'GET',
        headers: { Authorization: 'Bearer test-token' },
        signal: controller.signal,
      })
    }
  })
})

describe('collection failures through generated calls', () => {
  it('waits for the final page before resolving the collection', async () => {
    const reached = deferred<void>()
    const last = deferred<Response>()
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(
        response({ items: [{ id: 'first' }], next_page: 'second' })
      )
      .mockImplementationOnce(() => {
        reached.resolve()
        return last.promise
      })
    let settled = false
    const pending = projects.list_projects({ client: clientFor(fetch) })
    void pending.then(() => {
      settled = true
    })
    await reached.promise
    expect(settled).toBe(false)
    last.resolve(response({ items: [{ id: 'last' }], next_page: null }))
    expect(await pending).toEqual([{ id: 'first' }, { id: 'last' }])
  })

  it('preserves ApiError on a failed later page', async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(
        response({ items: [{ id: 'first' }], next_page: 'second' })
      )
      .mockResolvedValueOnce(new Response('upstream exploded', { status: 502 }))
    const pending = projects.list_projects({ client: clientFor(fetch) })
    await expect(pending).rejects.toBeInstanceOf(ApiError)
    await expect(pending).rejects.toMatchObject({
      status: 502,
      message: 'upstream exploded',
    })
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('rejects malformed JSON on a later page', async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(response({ items: [], next_page: 'second' }))
      .mockResolvedValueOnce(new Response('{not JSON'))
    await expect(
      projects.list_projects({ client: clientFor(fetch) })
    ).rejects.toBeInstanceOf(SyntaxError)
  })

  it('rejects cancellation during a later page', async () => {
    const reached = deferred<void>()
    const release = deferred<void>()
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(
        response({ items: [{ id: 'first' }], next_page: 'second' })
      )
      .mockImplementationOnce(async (_url, init) => {
        reached.resolve()
        await release.promise
        init?.signal?.throwIfAborted()
        return response({ items: [{ id: 'last' }], next_page: null })
      })
    const controller = new AbortController()
    const pending = projects.list_projects({
      client: clientFor(fetch),
      signal: controller.signal,
    })
    await reached.promise
    controller.abort()
    release.resolve()
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
  })

  it.each([
    null,
    {},
    { items: null, next_page: null },
    { items: 'bad', next_page: null },
    { items: [] },
    { items: [], next_page: '' },
    { items: [], next_page: 7 },
  ])('rejects a malformed later page: %j', async (body) => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(
        response({ items: [{ id: 'first' }], next_page: 'second' })
      )
      .mockResolvedValueOnce(response(body))
    await expect(
      projects.list_projects({ client: clientFor(fetch) })
    ).rejects.toThrow(/Invalid/)
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it.each([{ items: [] }, { items: [{ id: 'legacy' }] }])(
    'rejects switching from pages to arrays: %j',
    async ({ items }) => {
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(
          response({ items: [{ id: 'first' }], next_page: 'second' })
        )
        .mockResolvedValueOnce(response(items))
      await expect(
        projects.list_projects({ client: clientFor(fetch) })
      ).rejects.toThrow('changed format')
    }
  )

  it('rejects switching from pages to an announcements envelope', async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(response({ items: [], next_page: 'second' }))
      .mockResolvedValueOnce(response({ announcements: [] }))
    await expect(
      meta.get_announcements({ client: clientFor(fetch) })
    ).rejects.toThrow('changed format')
  })

  it.each([
    { announcements: null },
    { announcements: [], items: [], next_page: null },
  ])('rejects invalid or ambiguous announcements: %j', async (body) => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(response(body))
    await expect(
      meta.get_announcements({ client: clientFor(fetch) })
    ).rejects.toThrow('Invalid API list response')
  })

  it('rejects an unrelated collection envelope', async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(response({ announcements: [] }))
    await expect(
      projects.list_project_categories({ client: clientFor(fetch) })
    ).rejects.toThrow('Invalid API list response')
  })
})

describe('collectApiList', () => {
  const url =
    'https://example.test/projects?limit=2&sort_by=name&page_token=initial'

  it('preserves query parameters and replaces the opaque page token', async () => {
    const read = vi
      .fn<(url: string) => Promise<unknown>>()
      .mockResolvedValueOnce({ items: [1], next_page: 'next+/?=&% token' })
      .mockResolvedValueOnce({ items: [2], next_page: null })
    expect(await collectApiList<number>(url, read)).toEqual([1, 2])
    expect(read.mock.calls[0][0]).toBe(url)
    const next = new URL(read.mock.calls[1][0])
    expect(next.origin).toBe('https://example.test')
    expect(next.pathname).toBe('/projects')
    expect([...next.searchParams]).toEqual([
      ['limit', '2'],
      ['sort_by', 'name'],
      ['page_token', 'next+/?=&% token'],
    ])
  })

  it.each(['initial', 'second'])(
    'rejects repeated cursor %s',
    async (cursor) => {
      const read = vi
        .fn<(url: string) => Promise<unknown>>()
        .mockResolvedValueOnce({ items: [1], next_page: cursor })
        .mockResolvedValueOnce({ items: [2], next_page: cursor })
      await expect(collectApiList(url, read)).rejects.toThrow(
        'repeated API pagination cursor'
      )
      expect(read).toHaveBeenCalledTimes(cursor === 'initial' ? 1 : 2)
    }
  )

  it('rejects a longer cursor cycle', async () => {
    const read = vi
      .fn<(url: string) => Promise<unknown>>()
      .mockResolvedValueOnce({ items: [1], next_page: 'second' })
      .mockResolvedValueOnce({ items: [2], next_page: 'third' })
      .mockResolvedValueOnce({ items: [3], next_page: 'second' })
    await expect(collectApiList(url, read)).rejects.toThrow(
      'repeated API pagination cursor'
    )
    expect(read).toHaveBeenCalledTimes(3)
  })

  it('handles large pages without spreading into function arguments', async () => {
    const items = Array.from({ length: 150000 }, (_, i) => i)
    const read = vi
      .fn<(url: string) => Promise<unknown>>()
      .mockResolvedValueOnce({ items, next_page: null })
    expect(await collectApiList<number>(url, read)).toEqual(items)
  })

  it('accepts a legacy response when starting at a page token', async () => {
    const read = vi
      .fn<(url: string) => Promise<unknown>>()
      .mockResolvedValueOnce([1])
    expect(await collectApiList<number>(url, read)).toEqual([1])
  })
})

describe('existing SDK contracts', () => {
  it('keeps ResultsPage calls single-page', async () => {
    const page = { items: [{ id: 'first' }], next_page: 'second' }
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(response(page))
    const client = clientFor(fetch)
    expect(await ml.list_text_to_cad_parts_for_user({ client })).toEqual(page)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('keeps list arguments optional for callers without a client', async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(response([]))
    vi.stubGlobal('fetch', fetch)
    try {
      expect(await projects.list_project_categories()).toEqual([])
    } finally {
      vi.unstubAllGlobals()
    }
  })
})
