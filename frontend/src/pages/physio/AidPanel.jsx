// =============================================================================
// AidPanel.jsx — financial aid application (business plan slides 7–8):
// five tracks on top of the regional discount, the documents each track
// needs, a sworn declaration and consent to verification.
// =============================================================================

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { HandHeart, LoaderCircle, Send } from 'lucide-react'
import DocCapture from '../../components/DocCapture'
import { StatusPill } from './VerificationPanel'
import { api } from '../../api'
import { useLang } from '../../i18n/AppLanguage'
import { AID_TRACKS, suggestedAid } from '../../billing/pricing'

// Same as AID_DOCS in backend/src/routes/physioAccount.js
const AID_DOCS = {
  A: ['graduation_proof'],
  B: ['income_declaration', 'income_proof', 'municipality_letter'],
  C: ['displacement_proof', 'municipality_letter'],
  D: ['pledge_letter'],
  E: ['sponsor_letter'],
}
const MULTI = new Set(['income_proof', 'displacement_proof'])

export default function AidPanel({ account, reload }) {
  const { t, tr, locale } = useLang()
  const aid = account.aid
  const [tracks, setTracks] = useState(aid.status === 'pending' ? aid.tracks ?? {} : {})
  const [declaration, setDeclaration] = useState(false)
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const date = (d) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(d))
  const banned = aid.bannedUntil && new Date(aid.bannedUntil) > new Date()
  const locked = aid.status === 'pending'
  const canApply = ['pending', 'approved'].includes(account.verification.status)

  const chosen = Object.keys(tracks).filter((k) => tracks[k])
  const neededDocs = [...new Set(chosen.flatMap((k) => AID_DOCS[k]))]
  const docsOf = (kind) => account.docs.filter((d) => d.kind === kind)
  const missing = neededDocs.filter((k) => !docsOf(k).length)
  const set = (k, v) => setTracks((tr0) => ({ ...tr0, [k]: v || undefined }))

  const apply = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await api('/physio/aid', { method: 'POST', body: { tracks, declaration, consent } })
      await reload()
      toast.success(t.aidSent)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const trackBox = (k, control) => {
    const [title, text] = t.trackTitles[k]
    const on = !!tracks[k]
    return (
      <li key={k} className={`rounded-3xl p-5 ring-1 transition duration-300 ${on ? 'bg-accent-tint/60 ring-accent/40' : 'bg-white ring-ink/10'}`}>
        <div className="flex items-start gap-3">
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors ${on ? 'bg-accent text-white' : 'bg-paper text-muted'}`}>{k}</span>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted">{text}</p>
            {control}
          </div>
        </div>
      </li>
    )
  }

  return (
    <div className="stagger flex flex-col gap-6">
      <section className="panel flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={aid.status}>{t.aidStatus[aid.status]?.split(':')[0]}</StatusPill>
          {aid.status === 'approved' && aid.validUntil && <span className="font-semibold text-accent">{t.aidApproved(aid.approvedPct, date(aid.validUntil))}</span>}
        </div>
        <p className="text-muted">{aid.status === 'none' || aid.status === 'approved' ? t.aidIntro : t.aidStatus[aid.status]}</p>
        {aid.note && <p className="well text-sm"><b>{t.reviewerNote}</b> {aid.note}</p>}
        {banned && <p className="alert-error">{t.aidBanned(date(aid.bannedUntil))}</p>}
      </section>

      {!canApply && !banned && <p className="notice bg-amber-tint text-amber-ink"><HandHeart aria-hidden /> {t.aidNeedsVerification}</p>}
      {error && <p role="alert" className="alert-error">{tr(error)}</p>}

      {canApply && !banned && (
        <form onSubmit={apply} onInvalidCapture={(e) => { e.preventDefault(); e.currentTarget.querySelector(':invalid')?.focus() }} className="flex flex-col gap-6">
          {/* an unticked box shakes and turns red (.consent) instead of the browser's popup */}
          <fieldset disabled={locked} className="contents">
            <ul className="grid gap-3 md:grid-cols-2">
              {trackBox('A', (
                <label className="consent"><input type="checkbox" checked={!!tracks.A} onChange={(e) => set('A', e.target.checked)} /><span>{t.trackTitles.A[0]}</span></label>
              ))}
              {trackBox('B', (
                <select className="field-sm" value={tracks.B ?? ''} onChange={(e) => set('B', e.target.value)} aria-label={t.trackTitles.B[0]}>
                  <option value="">{t.calcNoAid}</option>
                  {Object.keys(AID_TRACKS.B.options).map((o) => <option key={o} value={o}>{t.bandOptions[o]}</option>)}
                </select>
              ))}
              {trackBox('C', (
                <select className="field-sm" value={tracks.C ?? ''} onChange={(e) => set('C', e.target.value)} aria-label={t.trackTitles.C[0]}>
                  <option value="">{t.calcNoAid}</option>
                  {Object.keys(AID_TRACKS.C.options).map((o) => <option key={o} value={o}>{t.warOptions[o]}</option>)}
                </select>
              ))}
              {trackBox('D', (
                <label className="consent"><input type="checkbox" checked={!!tracks.D} onChange={(e) => set('D', e.target.checked)} /><span>{t.trackTitles.D[0]}</span></label>
              ))}
              {trackBox('E', (
                <label className="field-label">{t.sponsorName}
                  <input className="field-sm" maxLength={120} value={tracks.E ?? ''} onChange={(e) => set('E', e.target.value)} />
                </label>
              ))}
            </ul>
          </fieldset>

          {chosen.length > 0 && (
            <>
              <p className="pill-ok self-start">{t.suggested(suggestedAid(tracks))}</p>
              <section className="flex flex-col gap-4">
                <h2 className="section-title mb-0">{t.docsForTracks}</h2>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {neededDocs.map((kind) => (
                    <DocCapture key={kind} kind={kind} docs={docsOf(kind)} required multi={MULTI.has(kind)} locked={locked} onChanged={reload} />
                  ))}
                </ul>
              </section>
            </>
          )}

          {!locked && (
            <section className="panel flex flex-col gap-4">
              <label className="consent"><input type="checkbox" required checked={declaration} onChange={(e) => setDeclaration(e.target.checked)} /><span>{t.declaration}</span></label>
              <label className="consent"><input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>{t.consentAidCheck}</span></label>
              {missing.length > 0 && <p className="pill-wait self-start">{t.missingDocs(missing.length)}</p>}
              <button className="btn-primary btn-lg self-start" disabled={busy || !chosen.length || missing.length > 0}>
                {busy ? <LoaderCircle aria-hidden className="animate-spin" /> : <Send aria-hidden className="rtl:-scale-x-100" />} {t.applyAid}
              </button>
            </section>
          )}
        </form>
      )}
    </div>
  )
}
