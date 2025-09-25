// Ensure Node trusts system CAs or Windows Root store, then fetch.
// Prefer built-in TLS APIs on modern Node, fall back to win-ca.
try {
  const tls = await import('node:tls')
  if (
    typeof tls.setDefaultCACertificates === 'function' &&
    typeof tls.getCACertificates === 'function'
  ) {
    // Use system store as defaults (works for Node 22.15+).
    tls.setDefaultCACertificates(tls.getCACertificates('system'))
  }
} catch {}

const nodeVersion = process.versions?.node
const major = nodeVersion
  ? Number.parseInt(nodeVersion.split('.')[0] ?? '', 10)
  : Number.NaN
const needsCaPatch =
  process.platform === 'win32' && Number.isFinite(major) && major < 22

if (needsCaPatch) {
  try {
    await import('win-ca')
  } catch {}
  try {
    const crossFetchModule = await import('cross-fetch')
    const patchedFetch = crossFetchModule.fetch ?? crossFetchModule.default
    if (typeof patchedFetch === 'function') {
      globalThis.fetch = patchedFetch
    }
    if (typeof crossFetchModule.Headers === 'function') {
      globalThis.Headers = crossFetchModule.Headers
    }
    if (typeof crossFetchModule.Request === 'function') {
      globalThis.Request = crossFetchModule.Request
    }
    if (typeof crossFetchModule.Response === 'function') {
      globalThis.Response = crossFetchModule.Response
    }
  } catch {}
}

// Import the SDK to trigger cross-fetch polyfill and win-ca (Windows fallback).
import { Client } from '../dist/mjs/index.js'
new Client('')

const target = process.env.SMOKE_URL || 'https://localhost:4443/'

async function retry(fn, { attempts = 60, delayMs = 500 } = {}) {
  let lastErr
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (e) {
      lastErr = e
      await new Promise((r) => setTimeout(r, delayMs))
    }
  }
  throw lastErr
}

const res = await retry(() => fetch(target))
if (!res.ok) throw new Error(`unexpected status ${res.status}`)

let body
try {
  body = await res.json()
} catch {
  throw new Error('unexpected body: not valid JSON')
}

if (body?.status !== 'ok') {
  let printable
  try {
    printable = JSON.stringify(body)
  } catch {
    printable = String(body)
  }
  throw new Error(`unexpected body ${printable}`)
}
console.log('win-ca smoke OK')
