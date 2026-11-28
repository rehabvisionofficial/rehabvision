// =============================================================================
// fileStore.js — where uploaded documents (IDs, OPTL cards, receipts...) live.
//
// Cloudflare R2, a PRIVATE bucket: files are never public. The browser only
// ever gets a file through GET /api/docs/:id, which checks who is asking.
// R2 speaks the Amazon S3 API, so this uses the standard AWS SDK; moving to
// AWS S3 or Backblaze B2 later is a matter of changing the settings below.
//
// Settings (backend/.env, or Render's environment):
//   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
//   R2_ENDPOINT (optional) to point at another S3-compatible service.
// Without them, files are kept in MongoDB instead (fine for local development).
// =============================================================================

import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

// Read lazily: server.js loads .env after the imports have run
const settings = () => {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_ENDPOINT } = process.env
  const endpoint = R2_ENDPOINT || (R2_ACCOUNT_ID && `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`)
  if (!endpoint || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) return null
  return { endpoint, bucket: R2_BUCKET, accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY }
}

let client = null
let clientFor = ''
function s3() {
  const s = settings()
  if (!s) throw new Error('File storage is not configured')
  const id = `${s.endpoint}|${s.accessKeyId}`
  if (!client || clientFor !== id) {
    client = new S3Client({
      region: 'auto', // R2 has no regions
      endpoint: s.endpoint,
      forcePathStyle: true, // bucket in the path: works with R2 and other S3-compatible services
      // only send/check checksums when the API requires them (newer SDK
      // defaults add headers that not every S3-compatible service accepts)
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED',
      credentials: { accessKeyId: s.accessKeyId, secretAccessKey: s.secretAccessKey },
    })
    clientFor = id
  }
  return { client, bucket: s.bucket }
}

/** True when object storage is set up; otherwise uploads stay in MongoDB. */
export const fileStoreEnabled = () => settings() !== null

/** Saves a file. key = where it goes in the bucket (no personal data in it). */
export async function putFile(key, body, contentType) {
  const { client, bucket } = s3()
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }))
}

/** Opens a file. Returns a readable stream; pipe it to the response. */
export async function getFile(key) {
  const { client, bucket } = s3()
  const out = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
  return out.Body
}

/** Deletes a file. Deleting one that is already gone is not an error. */
export async function deleteFile(key) {
  const { client, bucket } = s3()
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
}
