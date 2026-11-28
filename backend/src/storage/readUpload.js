// =============================================================================
// readUpload.js — reads ONE uploaded file from a multipart/form-data request
// (multer), keeps it in memory (never on the server's disk), and checks it.
//
// Multer only reads the upload; it trusts whatever type the browser claims.
// So the real type is decided here from the file's first bytes: a renamed
// file can't pretend to be a photo or a PDF.
//
// After it runs: req.file.buffer (the bytes), req.file.detectedMime, and the
// form's text fields in req.body (e.g. req.body.kind).
// =============================================================================

import multer from 'multer'

export const MAX_BYTES = 4 * 1024 * 1024

// File signatures ("magic bytes") for every type we accept
const SIGNATURES = [
  ['image/jpeg', (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff],
  ['image/png', (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))],
  ['image/webp', (b) => b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP'],
  ['application/pdf', (b) => b.subarray(0, 5).toString('latin1') === '%PDF-'],
]

/** The real type of a file from its first bytes, or null if we don't accept it. */
export const detectMime = (buf) => SIGNATURES.find(([, test]) => buf.length >= 12 && test(buf))?.[0] ?? null

// Messages are the ones the website already translates (frontend/src/i18n/errors.js)
const BAD_FILE = 'Upload a photo (JPG, PNG, WebP) or a PDF'
const TOO_BIG = 'Files must be under 4 MB'

const parser = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_BYTES, // stops reading as soon as a file is too big
    files: 1,
    fields: 5,           // only "kind" is expected
    fieldSize: 1024,
    parts: 6,
  },
}).single('file')

/** Express middleware for POST routes that take one file in the "file" field. */
export default function readUpload(req, res, next) {
  if (!req.is('multipart/form-data')) return res.status(400).json({ error: BAD_FILE })
  parser(req, res, (err) => {
    if (err) {
      const tooBig = err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE'
      return res.status(400).json({ error: tooBig ? TOO_BIG : BAD_FILE })
    }
    if (!req.file?.buffer?.length) return res.status(400).json({ error: BAD_FILE })
    const mime = detectMime(req.file.buffer)
    if (!mime) return res.status(400).json({ error: BAD_FILE })
    req.file.detectedMime = mime
    next()
  })
}
