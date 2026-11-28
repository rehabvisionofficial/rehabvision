// =============================================================================
// DocCapture.jsx — one document slot (e.g. "OPTL card, front"): take a photo
// with the phone camera or choose a file, see it, retake or remove it.
// Photos are shrunk on the phone (max 1800 px, JPEG) before upload, so they
// send fast on a weak connection and stay well under the 4 MB limit.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { Camera, Check, FileText, LoaderCircle, Plus, Trash2, Upload } from 'lucide-react'
import { api, apiBlob } from '../api'
import { useLang } from '../i18n/AppLanguage'

const MAX_BYTES = 4 * 1024 * 1024
const MAX_SIDE = 1800

async function prepare(file) {
  if (file.type === 'application/pdf') return { mime: file.type, blob: file }
  const img = await createImageBitmap(file) // throws for formats the browser can't read (e.g. HEIC)
  const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(img.width * scale)
  canvas.height = Math.round(img.height * scale)
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85))
  return { mime: 'image/jpeg', blob }
}

// Shows a stored document: the image itself, or a PDF icon
export function DocThumb({ doc, onOpen }) {
  const [url, setUrl] = useState(null)
  useEffect(() => {
    let alive = true
    let made
    apiBlob(`/docs/${doc._id}`).then((b) => {
      made = URL.createObjectURL(b)
      if (alive) setUrl(made)
      else URL.revokeObjectURL(made)
    }).catch(() => {})
    return () => { alive = false; if (made) URL.revokeObjectURL(made) }
  }, [doc._id])

  const open = () => (onOpen ? onOpen(url) : url && window.open(url, '_blank', 'noopener'))
  return (
    <button type="button" onClick={open} className="doc-thumb group" aria-label={doc.kind}>
      {doc.mime === 'application/pdf'
        ? <FileText aria-hidden className="h-10 w-10" />
        : url ? <img src={url} alt="" /> : <LoaderCircle aria-hidden className="h-6 w-6 animate-spin" />}
    </button>
  )
}

export default function DocCapture({ kind, docs = [], required, multi, selfie, locked, onChanged }) {
  const { t, tr } = useLang()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const cameraRef = useRef(null)
  const fileRef = useRef(null)
  const [label, hint] = t.docKinds[kind] ?? [kind, '']
  const done = docs.length > 0

  const upload = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // the same photo can be chosen again after a retake
    if (!file) return
    setError('')
    setBusy(true)
    try {
      const { mime, blob } = await prepare(file)
      if (blob.size > MAX_BYTES) throw new Error(t.fileTooBig)
      // sent as a real file (multipart form), not base64 text: a third smaller
      const form = new FormData()
      form.append('kind', kind)
      form.append('file', blob, mime === 'application/pdf' ? 'document.pdf' : 'photo.jpg')
      await api('/docs', { method: 'POST', body: form })
      await onChanged()
    } catch (err) {
      setError(err.message || t.err.badFile)
    } finally {
      setBusy(false)
    }
  }

  const remove = async (doc) => {
    setError('')
    try {
      await api(`/docs/${doc._id}`, { method: 'DELETE' })
      await onChanged()
    } catch (err) {
      setError(err.message)
    }
  }

  const canAdd = !locked && (multi ? docs.length < 5 : true)

  return (
    <li className="doc-tile" data-state={done ? 'done' : 'empty'}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold leading-snug">{label}</h4>
          {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
        </div>
        {done
          ? <span className="grid h-7 w-7 shrink-0 animate-pop place-items-center rounded-full bg-accent text-white" title={t.uploaded}><Check aria-hidden className="h-4 w-4" /><span className="sr-only">{t.uploaded}</span></span>
          : <span className={`shrink-0 text-xs font-semibold ${required ? 'text-amber-ink' : 'text-muted'}`}>{required ? t.required : t.optional}</span>}
      </div>

      {done && (
        <ul className={`grid gap-2 ${docs.length > 1 ? 'grid-cols-2' : ''}`}>
          {docs.map((d) => (
            <li key={d._id} className="relative">
              <DocThumb doc={d} />
              {!locked && (
                <button type="button" onClick={() => remove(d)} className="absolute end-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-danger shadow-soft hover:bg-white" aria-label={`${t.removeFile}: ${label}`}>
                  <Trash2 aria-hidden className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {canAdd && (
        <div className="mt-auto flex flex-wrap gap-2">
          {/* capture opens the camera directly on phones; desktops show a file picker */}
          <input ref={cameraRef} type="file" accept="image/*" capture={selfie ? 'user' : 'environment'} className="sr-only" tabIndex={-1} onChange={upload} />
          <input ref={fileRef} type="file" accept="image/*,application/pdf" className="sr-only" tabIndex={-1} onChange={upload} />
          <button type="button" className="btn-primary" disabled={busy} onClick={() => cameraRef.current.click()} aria-label={`${selfie ? t.takeSelfie : t.takePhoto}: ${label}`}>
            {busy ? <LoaderCircle aria-hidden className="animate-spin" /> : done && multi ? <Plus aria-hidden /> : <Camera aria-hidden />}
            {busy ? t.uploading : done ? (multi ? t.addAnother : t.retake) : selfie ? t.takeSelfie : t.takePhoto}
          </button>
          {!selfie && (
            <button type="button" className="btn-secondary" disabled={busy} onClick={() => fileRef.current.click()} aria-label={`${t.uploadFile}: ${label}`}>
              <Upload aria-hidden /> {t.uploadFile}
            </button>
          )}
        </div>
      )}
      {error && <p role="alert" className="alert-error">{tr(error)}</p>}
    </li>
  )
}
