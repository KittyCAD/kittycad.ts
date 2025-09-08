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
