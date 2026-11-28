// =============================================================================
// moveDocsToR2.js — one-time move of documents uploaded before R2 was set up
// (their bytes are in MongoDB) into the R2 bucket.
//   cd backend && npm run move-docs-to-r2
// Needs the R2_* settings in .env. Safe to run again: it only touches
// documents that still have their bytes in MongoDB, and it removes those
// bytes only after the file is saved in R2.
// =============================================================================

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import Document from '../models/Document.js'
import { fileStoreEnabled, putFile } from '../storage/fileStore.js'

dotenv.config({ quiet: true })

if (!fileStoreEnabled()) {
  console.error('R2 is not configured. Fill in the R2_* settings in backend/.env first.')
  process.exit(1)
}

await connectDB()
const pending = Document.find({ storageKey: { $exists: false }, data: { $exists: true } }).select('+data').cursor()
let moved = 0
for await (const doc of pending) {
  const key = `docs/${doc.owner}/${doc._id}`
  await putFile(key, doc.data, doc.mime)
  await Document.updateOne({ _id: doc._id }, { $set: { storageKey: key }, $unset: { data: 1 } })
  moved += 1
}
console.log(`Moved ${moved} document(s) to R2.`)
await mongoose.disconnect()
