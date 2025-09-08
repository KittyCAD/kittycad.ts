import 'cross-fetch/polyfill'

export class Client {
  constructor(readonly token: string) {
    this.token = token
  }
}

// On Windows + Node, load system CAs so TLS works behind enterprise roots.
// This is a no-op on non-Windows platforms and in browsers.
try {
  if (
    typeof process !== 'undefined' &&
    (process as unknown as NodeJS.Process).versions?.node &&
    (process as unknown as NodeJS.Process).platform === 'win32'
  ) {
    // Dynamic import via indirection to avoid Rollup code-splitting.
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const din = new Function('m', 'return import(m)') as (
      m: string
    ) => Promise<unknown>
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    din('win-ca')
  }
} catch {
  // ignore if not available
}
