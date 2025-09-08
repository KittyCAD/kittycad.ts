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
const text = await res.text()
if (text !== 'ok') throw new Error(`unexpected body ${text}`)
console.log('win-ca smoke OK')
