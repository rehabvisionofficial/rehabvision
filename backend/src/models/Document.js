// =============================================================================
// Document.js — a photo or PDF a physio uploads for verification or aid
// (ID, selfie with ID, OPTL card, receipts, letters...). Only the owner and
// reviewers can open it.
// The file itself lives in private object storage (Cloudflare R2, see
// storage/fileStore.js) under `storageKey`. Older uploads, and uploads on a
// server without R2 settings (local development), keep the bytes in `data`.
// =============================================================================

import mongoose from 'mongoose'

// What each upload is. Verification (slide 9) and aid (slide 8) share some.
export const DOC_KINDS = [
  // verification
  'id_front', 'id_back', 'selfie_id', 'optl_front', 'optl_back', 'optl_dues',
  'degree', 'workplace', 'insurance', 'certificate',
  // financial aid
  'income_declaration', 'income_proof', 'municipality_letter', 'graduation_proof',
  'displacement_proof', 'pledge_letter', 'sponsor_letter',
]

export const MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
export { MAX_BYTES } from '../storage/readUpload.js'

const documentSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    kind: { type: String, enum: DOC_KINDS, required: true },
    mime: { type: String, enum: MIME_TYPES, required: true },
    size: { type: Number, required: true },
    storageKey: { type: String, select: false },        // where the file is in R2
    data: { type: Buffer, select: false },              // or the bytes themselves (older uploads)
  },
  { timestamps: true },
)

// Every document needs its file somewhere
documentSchema.pre('validate', function () {
  if (this.isNew && !this.storageKey && !this.data?.length) this.invalidate('data', 'A document needs a file')
})

documentSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.data
    delete ret.storageKey
    delete ret.__v
    return ret
  },
})

export default mongoose.model('Document', documentSchema)
