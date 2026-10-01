export interface PageWithItems<Item> {
  items?: Item[] | null
  next_page?: string | null
}

export class Pager<P extends object, Page extends PageWithItems<Item>, Item> {
  private readonly fetchPage: (params: P) => Promise<Page>
  private readonly baseParams: P
  private readonly tokenField: keyof P | 'page_token'

  private started = false
  private nextToken: string | null | undefined

  constructor(
    fetchPage: (params: P) => Promise<Page>,
    params: P,
    tokenField: keyof P | 'page_token' = 'page_token'
  ) {
    this.fetchPage = fetchPage
    this.baseParams = { ...params }
    this.tokenField = tokenField
  }

  hasNext(): boolean {
    return !this.started || !!this.nextToken
  }

  reset(): void {
    this.started = false
    this.nextToken = undefined
  }

  async next(): Promise<Item[]> {
    // If already exhausted, return empty array to signal completion
    if (this.started && !this.nextToken) return []

    const params: P = { ...this.baseParams }
    if (this.started && this.nextToken) {
      ;(params as any)[this.tokenField as string] = this.nextToken
    }

    const page = await this.fetchPage(params)
    this.started = true
    this.nextToken = page?.next_page ?? null
    return (page?.items ?? []) as Item[]
  }
}

export function createPager<
  P extends object,
  Page extends PageWithItems<Item>,
  Item,
>(
  fetchPage: (params: P) => Promise<Page>,
  params: P,
  tokenField: keyof P | 'page_token' = 'page_token'
): Pager<P, Page, Item> {
  return new Pager<P, Page, Item>(fetchPage, params, tokenField)
}

/**
 * Read a complete legacy collection from an absolute URL. Accept either a
 * single array (or the named legacy envelope) or Dropshot items/next_page pages.
 * The reader owns transport, authentication, cancellation, and HTTP errors.
 * Reject malformed or changing responses rather than return a partial list.
 */
export async function collectApiList<Item>(
  url: string,
  readPage: (url: string) => Promise<unknown>,
  legacyListField?: string
): Promise<Item[]> {
  const baseUrl = new URL(url)
  const items: Item[] = []
  const seen = new Set<string>()
  const initialToken = baseUrl.searchParams.get('page_token')
  if (initialToken) seen.add(initialToken)
  let nextUrl = url
  let paginated = false

  while (true) {
    const page = await readPage(nextUrl)
    if (Array.isArray(page)) {
      if (paginated) {
        throw new Error('API list changed format during pagination')
      }
      return page as Item[]
    }
    if (page === null || typeof page !== 'object') {
      throw new Error('Invalid API list response')
    }
    if (legacyListField && legacyListField in page) {
      if (paginated) {
        throw new Error('API list changed format during pagination')
      }
      const legacyItems = (page as Record<string, unknown>)[legacyListField]
      if ('items' in page || !Array.isArray(legacyItems)) {
        throw new Error('Invalid API list response')
      }
      return legacyItems as Item[]
    }
    if (!('items' in page) || !Array.isArray(page.items)) {
      throw new Error('Invalid API list response')
    }
    const cursor = 'next_page' in page ? page.next_page : undefined
    if (
      cursor !== null &&
      (typeof cursor !== 'string' || !cursor || seen.has(cursor))
    ) {
      throw new Error('Invalid or repeated API pagination cursor')
    }
    for (const item of page.items) items.push(item as Item)
    if (cursor === null) return items
    seen.add(cursor as string)
    paginated = true
    const next = new URL(baseUrl)
    next.searchParams.set('page_token', cursor as string)
    nextUrl = next.href
  }
}
