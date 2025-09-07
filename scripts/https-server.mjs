import https from 'node:https'
import fs from 'node:fs'

const port = 4443
const host = '127.0.0.1'
const pfx = fs.readFileSync('servercert.pfx')
const passphrase = 'pass'

const server = https.createServer({ pfx, passphrase }, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('ok')
})

server.listen(port, host, () => {
  console.log(`https server listening at https://${host}:${port}`)
})

