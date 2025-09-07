// Import the SDK to trigger cross-fetch polyfill and win-ca side effects in Node.
import { Client } from '../dist/mjs/index.js'

// Touch the client so tree-shakers can’t skip it (harmless)
new Client('')

const res = await fetch('https://127.0.0.1:4443/')
if (!res.ok) throw new Error(`unexpected status ${res.status}`)
const text = await res.text()
if (text !== 'ok') throw new Error(`unexpected body ${text}`)
console.log('win-ca smoke OK')
