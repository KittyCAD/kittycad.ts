export interface PageWithItems<Item> {
  items?: Item[] | null
  next_page?: string | null
}

function hasPageFields<Item>(
  page: PageWithItems<Item>
): page is PageWithItems<Item> & { items: Item[] } {
  return (
    page !== null &&
    typeof page === 'object' &&
    Object.hasOwn(page, 'items') &&
    Array.isArray(page.items)
  )
}

export class Pager<P extends object, Page extends PageWithItems<Item>, Item> {
  private readonly fetchPage: (params: P) => Promise<Page>
  private readonly baseParams: P & { page_token?: unknown }
  private readonly tokenField: keyof P | 'page_token'

  private started = false
  private nextToken: string | null | undefined
  private readonly seenTokens = new Set<string>()

  constructor(
    fetchPage: (params: P) => Promise<Page>,
    params: P,
    tokenField: keyof P | 'page_token' = 'page_token'
  ) {
    this.fetchPage = fetchPage
    this.baseParams = { ...params }
    this.tokenField = tokenField
    this.reset()
  }

  hasNext(): boolean {
    return !this.started || !!this.nextToken
  }

  reset(): void {
    this.started = false
    this.nextToken = undefined
    this.seenTokens.clear()
    const initialToken = this.baseParams[this.tokenField]
    if (typeof initialToken === 'string') this.seenTokens.add(initialToken)
  }

  async next(): Promise<Item[]> {
    // If already exhausted, return empty array to signal completion
    if (this.started && !this.nextToken) return []

    const params: P =
      this.started && this.nextToken
        ? { ...this.baseParams, [this.tokenField]: this.nextToken }
        : { ...this.baseParams }

    const page = await this.fetchPage(params)
    if (!hasPageFields(page)) {
      throw new TypeError('Invalid paginated response: expected an items array')
    }
    const nextToken = page.next_page ?? null
    if (nextToken !== null) {
      if (typeof nextToken !== 'string' || !nextToken.trim()) {
        throw new TypeError(
          'Invalid paginated response: invalid next_page token'
        )
      }
      // A retry may request the same token again. A successful page pointing
      // back within this traversal would cycle instead of making progress.
      if (this.seenTokens.has(nextToken)) {
        throw new Error('Paginated response repeated a page token')
      }
      this.seenTokens.add(nextToken)
    }

    // Only advance after validating this page, so failures can be retried.
    this.started = true
    this.nextToken = nextToken
    return page.items
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
