import { describe, expect, it } from 'vitest'
import { Client } from '../../src/client.js'
import { get_user_factory_materials_pager } from '../../src/api/factory/get_user_factory_materials.js'

function response(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
  })
}

function clientWithResponses(
  responses: Response[],
  requests: Request[]
): Client {
  return new Client({
    token: 'test-token',
    baseUrl: 'https://example.test',
    fetch: async (input, init) => {
      const request = new Request(input, init)
      requests.push(request)
      expect(request.headers.get('Authorization')).toBe('Bearer test-token')
      expect(new URL(request.url).pathname).toBe('/user/factory/materials')
      const next = responses[requests.length - 1]
      if (!next) throw new Error('Unexpected continuation request')
      return next.clone()
    },
  })
}

const item = { name: 'Aluminum' }
const firstPage = { items: [item], next_page: 'next-page' }

const invalidPages = [
  { name: 'null page', body: null },
  { name: 'legacy array', body: [item] },
  { name: 'missing items', body: { next_page: null } },
  { name: 'null items', body: { items: null, next_page: null } },
  { name: 'non-array items', body: { items: {}, next_page: null } },
  { name: 'empty cursor', body: { items: [item], next_page: '' } },
  { name: 'whitespace cursor', body: { items: [item], next_page: ' ' } },
  { name: 'non-string cursor', body: { items: [item], next_page: 3 } },
  { name: 'repeated cursor', body: { items: [item], next_page: 'next-page' } },
]

const terminalPages = [
  { name: 'empty page without a cursor', body: { items: [] }, items: [] },
  {
    name: 'nonempty page without a cursor',
    body: { items: [item] },
    items: [item],
  },
  {
    name: 'empty page with a null cursor',
    body: { items: [], next_page: null },
    items: [],
  },
  {
    name: 'nonempty page with a null cursor',
    body: { items: [item], next_page: null },
    items: [item],
  },
]

describe('generated public pager accepts terminal pages', () => {
  it.each(terminalPages)(
    'finishes an initial $name',
    async ({ body, items }) => {
      const requests: Request[] = []
      const client = clientWithResponses([response(body)], requests)
      const pager = get_user_factory_materials_pager({ client })
      expect(pager.hasNext()).toBe(true)
      expect(await pager.next()).toEqual(items)
      expect(pager.hasNext()).toBe(false)
      expect(await pager.next()).toEqual([])
      expect(requests).toHaveLength(1)
    }
  )

  it.each(terminalPages)('finishes a later $name', async ({ body, items }) => {
    const requests: Request[] = []
    const client = clientWithResponses(
      [response(firstPage), response(body)],
      requests
    )
    const pager = get_user_factory_materials_pager({ client })
    expect(await pager.next()).toEqual([item])
    expect(pager.hasNext()).toBe(true)
    expect(await pager.next()).toEqual(items)
    expect(pager.hasNext()).toBe(false)
    expect(await pager.next()).toEqual([])
    expect(requests).toHaveLength(2)
    expect(new URL(requests[1].url).searchParams.get('page_token')).toBe(
      'next-page'
    )
  })
})

describe('generated public pager fails closed', () => {
  it.each(invalidPages)(
    'rejects $name before returning its items',
    async ({ body }) => {
      const requests: Request[] = []
      const client = clientWithResponses(
        [response(firstPage), response(body)],
        requests
      )
      const pager = get_user_factory_materials_pager({ client, limit: 1 })
      expect(await pager.next()).toEqual([item])
      await expect(pager.next()).rejects.toThrow(
        /paginated response|page token/
      )
      expect(requests).toHaveLength(2)
    }
  )

  it.each([401, 403, 404, 429, 500])(
    'propagates later HTTP %s',
    async (status) => {
      const requests: Request[] = []
      const client = clientWithResponses(
        [
          response(firstPage),
          new Response(JSON.stringify({ message: 'failed' }), { status }),
        ],
        requests
      )
      const pager = get_user_factory_materials_pager({ client, limit: 1 })
      expect(await pager.next()).toEqual([item])
      await expect(pager.next()).rejects.toThrow()
      expect(requests).toHaveLength(2)
    }
  )

  it('continues empty pages, preserves a starting cursor and resets', async () => {
    const requests: Request[] = []
    const pages = [
      response(firstPage),
      response({ items: [], next_page: 'last-page' }),
      response({ items: [item], next_page: null }),
    ]
    const client = clientWithResponses([...pages, ...pages], requests)
    const params = { client, limit: 1, page_token: 'start' }
    const pager = get_user_factory_materials_pager(params)
    for (let traversal = 0; traversal < 2; traversal++) {
      expect(pager.hasNext()).toBe(true)
      expect(await pager.next()).toEqual([item])
      expect(await pager.next()).toEqual([])
      expect(pager.hasNext()).toBe(true)
      expect(await pager.next()).toEqual([item])
      expect(pager.hasNext()).toBe(false)
      expect(await pager.next()).toEqual([])
      if (traversal === 0) pager.reset()
    }
    expect(
      requests.map((request) =>
        new URL(request.url).searchParams.get('page_token')
      )
    ).toEqual([
      'start',
      'next-page',
      'last-page',
      'start',
      'next-page',
      'last-page',
    ])
    expect(params.page_token).toBe('start')
    expect(requests).toHaveLength(6)
  })

  it('rejects a cycle back to the explicit starting cursor', async () => {
    const requests: Request[] = []
    const client = clientWithResponses(
      [response({ items: [item], next_page: 'start' })],
      requests
    )
    const pager = get_user_factory_materials_pager({
      client,
      page_token: 'start',
    })
    await expect(pager.next()).rejects.toThrow(/page token/)
    expect(requests).toHaveLength(1)
  })

  it('allows repeated items when the continuation advances', async () => {
    const requests: Request[] = []
    const client = clientWithResponses(
      [response(firstPage), response({ items: [item], next_page: null })],
      requests
    )
    const pager = get_user_factory_materials_pager({ client })
    expect(await pager.next()).toEqual([item])
    expect(await pager.next()).toEqual([item])
    expect(pager.hasNext()).toBe(false)
    expect(requests).toHaveLength(2)
  })

  it('rejects a multi-page cycle within one traversal', async () => {
    const requests: Request[] = []
    const client = clientWithResponses(
      [
        response(firstPage),
        response({ items: [item], next_page: 'third-page' }),
        response({ items: [item], next_page: 'next-page' }),
      ],
      requests
    )
    const pager = get_user_factory_materials_pager({ client })
    expect(await pager.next()).toEqual([item])
    expect(await pager.next()).toEqual([item])
    await expect(pager.next()).rejects.toThrow(/page token/)
    expect(requests).toHaveLength(3)
  })

  it('does not advance after a failed request and permits retry', async () => {
    const requests: Request[] = []
    const client = clientWithResponses(
      [
        response(firstPage),
        new Response(null, { status: 503 }),
        response({ items: [item], next_page: null }),
      ],
      requests
    )
    const pager = get_user_factory_materials_pager({ client })
    await pager.next()
    await expect(pager.next()).rejects.toThrow()
    expect(pager.hasNext()).toBe(true)
    expect(await pager.next()).toEqual([item])
    expect(
      requests.map((request) =>
        new URL(request.url).searchParams.get('page_token')
      )
    ).toEqual([null, 'next-page', 'next-page'])
    expect(pager.hasNext()).toBe(false)
  })
})
