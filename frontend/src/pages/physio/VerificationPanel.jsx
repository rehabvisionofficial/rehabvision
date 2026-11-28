// =============================================================================
// VerificationPanel.jsx — the physio proves who they are (business plan
// slide 9): practice details, then photos of ID, live selfie with ID, OPTL
// card and dues receipt, degree and workplace proof. Patients can only find
// verified physios. The review team decides (see ReviewPanel).
// =============================================================================

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BadgeCheck, Clock, LoaderCircle, Send, ShieldAlert } from 'lucide-react'
import DocCapture from '../../components/DocCapture'
import { api } from '../../api'
import { useLang } from '../../i18n/AppLanguage'
import { REGIONS } from '../../billing/pricing'

// Same list as REQUIRED_VERIFICATION in backend/src/routes/physioAccount.js
export const REQUIRED = ['id_front', 'id_back', 'selfie_id', 'optl_front', 'optl_back', 'optl_dues', 'degree', 'workplace']
const OPTIONAL = ['insurance', 'certificate']
const LANGS = ['ar', 'en', 'fr', 'hy', 'es', 'de', 'it', 'tr']

export function StatusPill({ status, children }) {
  const cls = { approved: 'pill-ok', pending: 'pill-wait', rejected: 'pill-bad' }[status] ?? 'pill-quiet'
  const Icon = { approved: BadgeCheck, pending: Clock, rejected: ShieldAlert }[status] ?? ShieldAlert
  return <span className={cls}><Icon aria-hidden /> {children}</span>
}

export default function VerificationPanel({ account, reload }) {
  const { t, tr, locale } = useLang()
  const v = account.verification
  const locked = v.status === 'pending'
  const [profile, setProfile] = useState(account.profile)
  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const date = (d) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(d))
  const docsOf = (kind) => account.docs.filter((d) => d.kind === kind)
  const missing = REQUIRED.filter((k) => !docsOf(k).length)
  // Yearly re-check: can be sent from 30 days before the end date
  const renewDue = v.status === 'approved' && (!v.verified || new Date(v.verifiedUntil) - Date.now() < 30 * 24 * 3600 * 1000)

  const saveProfile = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await api('/physio/profile', { method: 'PUT', body: profile })
      await reload()
      toast.success(t.profileSaved)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const send = async () => {
    setError('')
    setSending(true)
    try {
      await api('/physio/verification', { method: 'POST', body: { consent: true } })
      await reload()
      toast.success(t.sentForReview)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  const toggleLang = (code) => setProfile((p) => ({
    ...p,
    languages: p.languages.includes(code) ? p.languages.filter((l) => l !== code) : [...p.languages, code],
  }))

  return (
    <div className="stagger flex flex-col gap-6">
      <section className={`panel flex flex-col gap-3 ${v.status === 'approved' ? 'bg-accent-tint/60' : ''}`}>
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={v.status}>{t.vStatus[v.status]?.split(':')[0] ?? t.vStatus.none}</StatusPill>
          {v.verified && v.verifiedUntil && <span className="text-sm text-muted">{t.verifiedUntil(date(v.verifiedUntil))}</span>}
          {v.specialist && <span className="pill-ok"><BadgeCheck aria-hidden /> {t.specialistBadge}</span>}
        </div>
        {v.status !== 'approved' && <p className="text-muted">{v.status === 'none' ? t.verifyIntro : t.vStatus[v.status]}</p>}
        {v.note && <p className="well text-sm"><b>{t.reviewerNote}</b> {v.note}</p>}
      </section>

      {error && <p role="alert" className="alert-error">{tr(error)}</p>}

      {/* invalid fields show the translated hints below instead of the browser's popup */}
      <form onSubmit={saveProfile} onInvalidCapture={(e) => { e.preventDefault(); e.currentTarget.querySelector(':invalid')?.focus() }} className="panel flex flex-col gap-4">
        <h2 className="section-title mb-0">{t.profileTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field-label">
            {t.region}
            <select className="field" value={profile.region ?? ''} disabled={locked} required
              onChange={(e) => setProfile({ ...profile, region: e.target.value || null })}>
              <option value="">{t.chooseRegion}</option>
              {Object.keys(REGIONS).map((r) => <option key={r} value={r}>{t.regions[r]}</option>)}
            </select>
            <span className="label-hint">{t.chooseRegion}</span>
            <span className="text-xs font-normal">{t.regionHelp}</span>
          </label>
          <label className="field-label">
            {t.phone}
            <input className="field" type="tel" dir="ltr" autoComplete="tel" placeholder="+961 3 123 456" required
              pattern="\+?[0-9 \(\)\-]{6,20}" value={profile.phone ?? ''} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            <span className="label-hint">{t.err.phoneInvalid}</span>
            <span className="text-xs font-normal">{t.phoneHelp}</span>
          </label>
          <label className="field-label sm:col-span-2">
            {t.clinic}
            <input className="field" maxLength={120} value={profile.clinic ?? ''} onChange={(e) => setProfile({ ...profile, clinic: e.target.value })} />
          </label>
        </div>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-muted">{t.languagesSpoken}</legend>
          <div className="flex flex-wrap gap-2">
            {LANGS.map((code) => (
              <label key={code} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 transition duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-accent ${profile.languages.includes(code) ? 'bg-accent text-white ring-accent' : 'bg-white text-ink ring-ink/15 hover:ring-accent/40'}`}>
                <input type="checkbox" className="sr-only" checked={profile.languages.includes(code)} onChange={() => toggleLang(code)} />
                {t.langNames[code]}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="consent">
          <input type="checkbox" checked={profile.listed} onChange={(e) => setProfile({ ...profile, listed: e.target.checked })} />
          <span>{t.listMe}</span>
        </label>
        <button className="btn-secondary self-start" disabled={saving}>
          {saving && <LoaderCircle aria-hidden className="animate-spin" />} {t.saveProfile}
        </button>
      </form>

      <section className="flex flex-col gap-4">
        <h2 className="section-title mb-0">{t.docsTitle}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...REQUIRED, ...OPTIONAL].map((kind) => (
            <DocCapture key={kind} kind={kind} docs={docsOf(kind)} required={REQUIRED.includes(kind)}
              multi={kind === 'certificate'} selfie={kind === 'selfie_id'} locked={locked} onChanged={reload} />
          ))}
        </ul>
      </section>

      {!locked && (v.status !== 'approved' || renewDue) && (
        <section className="panel flex flex-col gap-4">
          {missing.length > 0 && <p className="pill-wait self-start">{t.missingDocs(missing.length)}</p>}
          {(!profile.region || !profile.phone || !account.profile.region || !account.profile.phone) && <p className="text-sm text-muted">{t.needRegionPhone}</p>}
          <label className="consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>{t.consentVerify}</span>
          </label>
          <button className="btn-primary btn-lg self-start" onClick={send}
            disabled={sending || !consent || missing.length > 0 || !account.profile.region || !account.profile.phone}>
            {sending ? <LoaderCircle aria-hidden className="animate-spin" /> : <Send aria-hidden className="rtl:-scale-x-100" />} {t.sendForReview}
          </button>
        </section>
      )}
    </div>
  )
}
