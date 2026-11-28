// Tests for document uploads: reading/checking the file (readUpload) and
// saving/reading/deleting it in an S3-compatible bucket (fileStore), using a
// small fake bucket server so no real cloud account is needed.
//   cd backend && npm test

import { after, before, describe, test } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import express from 'express'
import readUpload, { MAX_BYTES, detectMime } from './readUpload.js'
import { deleteFile, fileStoreEnabled, getFile, putFile } from './fileStore.js'

const JPEG = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(200, 1)])
const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(200, 2)])
const WEBP = Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBP'), Buffer.alloc(200, 3)])
const PDF = Buffer.concat([Buffer.from('%PDF-1.7\n'), Buffer.alloc(200, 4)])

const listen = (server) => new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server.address().port)))

describe('detectMime', () => {
  test('recognises each accepted type by its first bytes', () => {
    assert.equal(detectMime(JPEG), 'image/jpeg')
    assert.equal(detectMime(PNG), 'image/png')
    assert.equal(detectMime(WEBP), 'image/webp')
    assert.equal(detectMime(PDF), 'application/pdf')
  })
  test('rejects anything else, including a RIFF file that is not WebP', () => {
    assert.equal(detectMime(Buffer.from('<html><script>alert(1)</script></html>')), null)
    assert.equal(detectMime(Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WAVE'), Buffer.alloc(20)])), null)
    assert.equal(detectMime(Buffer.alloc(0)), null)
  })
})

describe('readUpload', () => {
  let server
  let url
  before(async () => {
    const app = express()
    app.post('/up', readUpload, (req, res) =>
      res.json({ kind: req.body.kind, mime: req.file.detectedMime, size: req.file.buffer.length }))
    server = http.createServer(app)
    url = `http://127.0.0.1:${await listen(server)}/up`
  })
  after(() => server.close())

  const send = (bytes, { kind = 'id_front', claimed = 'image/jpeg', field = 'file' } = {}) => {
    const form = new FormData()
    form.append('kind', kind)
    form.append(field, new Blob([bytes], { type: claimed }), 'photo.jpg')
    return fetch(url, { method: 'POST', body: form })
  }

  test('accepts a photo and reports its real type and the form fields', async () => {
    const res = await send(PNG, { claimed: 'image/jpeg' }) // browser label is ignored
    assert.equal(res.status, 200)
    assert.deepEqual(await res.json(), { kind: 'id_front', mime: 'image/png', size: PNG.length })
  })

  test('accepts a PDF', async () => {
    const res = await send(PDF, { claimed: 'application/pdf' })
    assert.equal((await res.json()).mime, 'application/pdf')
  })

  test('rejects a renamed file pretending to be a photo', async () => {
    const res = await send(Buffer.from('<html>not an image</html>'.repeat(5)))
    assert.equal(res.status, 400)
    assert.equal((await res.json()).error, 'Upload a photo (JPG, PNG, WebP) or a PDF')
  })

  test('rejects a file over 4 MB', async () => {
    const big = Buffer.concat([JPEG, Buffer.alloc(MAX_BYTES)])
    const res = await send(big)
    assert.equal(res.status, 400)
    assert.equal((await res.json()).error, 'Files must be under 4 MB')
  })

  test('rejects a request with no file, or a file under another field name', async () => {
    assert.equal((await send(JPEG, { field: 'other' })).status, 400)
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"kind":"id_front"}' })
    assert.equal(res.status, 400)
  })
})

describe('fileStore (against a fake S3-compatible bucket)', () => {
  const objects = new Map() // "/bucket/key" -> { body, type }
  const seen = []
  let server
  const saved = {}

  before(async () => {
    server = http.createServer((req, res) => {
      const chunks = []
      req.on('data', (c) => chunks.push(c))
      req.on('end', () => {
        const path = decodeURIComponent(req.url.split('?')[0])
        seen.push({ method: req.method, path, auth: req.headers.authorization ?? '' })
        if (req.method === 'PUT') {
          objects.set(path, { body: Buffer.concat(chunks), type: req.headers['content-type'] })
          res.writeHead(200, { ETag: '"x"' }).end()
        } else if (req.method === 'GET') {
          const o = objects.get(path)
          if (!o) return res.writeHead(404, { 'Content-Type': 'application/xml' }).end('<Error><Code>NoSuchKey</Code></Error>')
          res.writeHead(200, { 'Content-Type': o.type, 'Content-Length': o.body.length }).end(o.body)
        } else if (req.method === 'DELETE') {
          objects.delete(path)
          res.writeHead(204).end()
        } else res.writeHead(400).end()
      })
    })
    const port = await listen(server)
    for (const k of ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET', 'R2_ENDPOINT']) saved[k] = process.env[k]
    Object.assign(process.env, {
      R2_ACCOUNT_ID: '', R2_ENDPOINT: `http://127.0.0.1:${port}`,
      R2_ACCESS_KEY_ID: 'test-key', R2_SECRET_ACCESS_KEY: 'test-secret', R2_BUCKET: 'test-bucket',
    })
  })
  after(() => {
    server.close()
    for (const [k, v] of Object.entries(saved)) { if (v === undefined) delete process.env[k]; else process.env[k] = v }
  })

  test('is enabled once the settings are present', () => assert.equal(fileStoreEnabled(), true))

  test('saves, reads back and deletes a file, signed with the access key', async () => {
    await putFile('docs/u1/abc', JPEG, 'image/jpeg')
    assert.deepEqual(objects.get('/test-bucket/docs/u1/abc'), { body: JPEG, type: 'image/jpeg' })
    assert.match(seen[0].auth, /^AWS4-HMAC-SHA256 Credential=test-key\//)

    const body = await getFile('docs/u1/abc')
    const chunks = []
    for await (const c of body) chunks.push(c)
    assert.deepEqual(Buffer.concat(chunks), JPEG)

    await deleteFile('docs/u1/abc')
    assert.equal(objects.has('/test-bucket/docs/u1/abc'), false)
  })

  test('is disabled when a setting is missing', () => {
    const bucket = process.env.R2_BUCKET
    delete process.env.R2_BUCKET
    assert.equal(fileStoreEnabled(), false)
    process.env.R2_BUCKET = bucket
  })
})
