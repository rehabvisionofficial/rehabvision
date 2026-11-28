// =============================================================================
// docs.js — verification and aid documents (photos taken in the app, or files).
//   POST   /api/docs        multipart form: kind + file  -> { doc }   physio only
//   GET    /api/docs/mine                                 -> { docs }  physio only
//   GET    /api/docs/:id    -> the file itself (owner or reviewer)
//   DELETE /api/docs/:id    -> remove my upload (not while it's under review)
// Files go to private object storage (storage/fileStore.js); the browser can
// only get them through GET /api/docs/:id, which checks who is asking.
// =============================================================================

import { randomUUID } from 'node:crypto'
import { Router } from 'express'
import mongoose from 'mongoose'
import Document, { DOC_KINDS } from '../models/Document.js'
import { isAdmin, requireAuth, requireRole } from '../middleware/auth.js'
import readUpload from '../storage/readUpload.js'
import { deleteFile, fileStoreEnabled, getFile, putFile } from '../storage/fileStore.js'

const router = Router()
router.use(requireAuth)

// Kinds that can hold several files (3 months of income proof, several certificates...)
const MULTI = new Set(['income_proof', 'certificate', 'displacement_proof'])
const MAX_PER_KIND = 5

// Documents can't change while a reviewer is looking at them
const VERIFY_KINDS = new Set(DOC_KINDS.slice(0, 10))
const locked = (user, kind) =>
  VERIFY_KINDS.has(kind) ? user.verification?.status === 'pending' : user.aid?.status === 'pending'

// Removes documents and their stored files. A file that fails to delete is
// logged and left behind (an orphan costs storage, never exposes data).
async function removeDocs(filter) {
  const docs = await Document.find(filter).select('+storageKey')
  await Document.deleteMany({ _id: { $in: docs.map((d) => d._id) } })
  await Promise.all(docs.filter((d) => d.storageKey).map((d) =>
    deleteFile(d.storageKey).catch((e) => console.error('Could not delete stored file', d.storageKey, e.message))))
}

router.post('/', requireRole('physio'), readUpload, async (req, res, next) => {
  let storageKey = null
  try {
    const { kind } = req.body ?? {}
    if (!DOC_KINDS.includes(kind)) return res.status(400).json({ error: 'Unknown document type' })
    if (locked(req.user, kind)) return res.status(409).json({ error: 'Documents under review cannot be changed' })

    const previous = await Document.find({ owner: req.user._id, kind }).select('_id')
    if (MULTI.has(kind) && previous.length >= MAX_PER_KIND) return res.status(400).json({ error: 'Too many files of this type' })

    const { buffer, detectedMime: mime } = req.file
    if (fileStoreEnabled()) {
      // random name: no personal data (name, kind) in the bucket
      storageKey = `docs/${req.user._id}/${randomUUID()}`
      await putFile(storageKey, buffer, mime)
    }
    const doc = await Document.create({
      owner: req.user._id, kind, mime, size: buffer.length,
      ...(storageKey ? { storageKey } : { data: buffer }),
    })
    storageKey = null // saved: nothing to clean up

    // A retake replaces the old photo, only once the new one is safely saved
    if (!MULTI.has(kind) && previous.length) await removeDocs({ _id: { $in: previous.map((d) => d._id) } })

    res.status(201).json({ doc })
  } catch (e) {
    if (storageKey) deleteFile(storageKey).catch(() => {}) // uploaded but not recorded
    next(e)
  }
})

router.get('/mine', requireRole('physio'), async (req, res, next) => {
  try {
    res.json({ docs: await Document.find({ owner: req.user._id }).sort({ createdAt: 1 }) })
  } catch (e) {
    next(e)
  }
})

// Owner or reviewer only. Sent as a download-safe file (no HTML is ever served).
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(404).json({ error: 'Not found' })
    const doc = await Document.findById(req.params.id).select('+data +storageKey')
    if (!doc || (!doc.owner.equals(req.user._id) && !isAdmin(req.user))) return res.status(404).json({ error: 'Not found' })
    res.set({
      'Content-Type': doc.mime,
      'Content-Length': String(doc.size),
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Disposition': 'inline',
    })
    if (!doc.storageKey) return res.send(doc.data)
    const body = await getFile(doc.storageKey)
    body.on('error', (e) => res.destroy(e))
    body.pipe(res)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', requireRole('physio'), async (req, res, next) => {
  try {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(404).json({ error: 'Not found' })
    const doc = await Document.findOne({ _id: req.params.id, owner: req.user._id })
    if (!doc) return res.status(404).json({ error: 'Not found' })
    if (locked(req.user, doc.kind)) return res.status(409).json({ error: 'Documents under review cannot be changed' })
    await removeDocs({ _id: doc._id })
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
})

export default router
