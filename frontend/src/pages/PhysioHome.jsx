// =============================================================================
// PhysioHome.jsx — the physiotherapist's home page.
//   - Shows their public ID to give to patients
//   - Lists linked patients; for each: choose up to 3 exercises (with side,
//     angles, reps, stop criteria, clinical clearance), see sessions, remove
//   - Lists patients who need attention this week ("flags")
// =============================================================================

import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Check, Copy, LoaderCircle, Plus, RefreshCw, Search } from 'lucide-react'
import useConfirm from '../components/useConfirm'
import { useAuth } from '../auth/authContext'
import { api } from '../api'
import { getStrings } from '../i18n/messages'
import { useLang } from '../i18n/AppLanguage'

const MAX_EXERCISES = 3

// Share of reps that reached the target: mostly good, mixed, or mostly short
const goodRepTone = (s) => {
  const ratio = s.totalReps ? s.goodReps / s.totalReps : 0
  return ratio >= 0.8 ? 'bg-accent-tint text-accent-hover' : ratio >= 0.5 ? 'bg-amber-tint text-amber-ink' : 'bg-danger-tint text-danger'
}

// Exercise name in the app language, falling back to the catalog's English name
const useExerciseName = (catalog) => {
  const { lang } = useLang()
  const names = getStrings(lang).exercises
  return (id) => names[id] ?? catalog?.exercises.find((ex) => ex.id === id)?.name ?? id
}

// The server's "needs attention" reasons, rebuilt from its numbers so they can
// be shown in any language. Same rules as GET /physio/flags in the backend.
const flagReasons = (f, t) => {
  if (typeof f.sessions !== 'number') return f.reasons ?? [] // older server: its English text
  const reasons = []
  if (f.sessions < 3) reasons.push(t.flagFewSessions(f.sessions))
  if (f.total > 0 && f.quality < 0.5) reasons.push(t.flagLowQuality(Math.round(f.quality * 100)))
  if (f.sessions > 0 && f.total === 0) reasons.push(t.flagNoReps)
  if (f.maxPain >= 7) reasons.push(t.flagPain(f.maxPain))
  if (f.incidents?.length) reasons.push(t.flagIncident(f.incidents.join(' | ')))
  return reasons
}

const PhysioHome = () => {
  const { user, logout } = useAuth()
  const { t, tr, locale } = useLang()
  const [catalog, setCatalog] = useState(null)
  const [patients, setPatients] = useState(null) // null = still loading
  const [flags, setFlags] = useState(null)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [query, setQuery] = useState('')

  // Expired login -> back to the login page; anything else -> show the message
  const handleError = useCallback((e) => (e.status === 401 ? logout() : setError(e.message)), [logout])

  const load = useCallback(async () => {
    setError('')
    try {
      const [c, p, f] = await Promise.all([
        api('/exercises'),
        api('/physio/patients'),
        api('/physio/flags'),
      ])
      setCatalog(c)
      setPatients(p.patients)
      setFlags(f.flagged)
    } catch (e) {
      handleError(e)
      // stop showing the loading placeholders
      setPatients((p) => p ?? [])
      setFlags((f) => f ?? [])
    }
  }, [handleError])

  useEffect(() => { load() }, [load])

  const refresh = async () => {
    setRefreshing(true)
    await load()
    setRefreshing(false)
  }

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(user.publicId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(t.copyFailed)
    }
  }

  const q = query.trim().toLowerCase()
  const shownPatients = (patients ?? []).filter((p) =>
    !q || p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q))

  return (
    <div className="stagger flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-lift sm:p-8">
        <div aria-hidden className="absolute -end-16 -top-20 h-64 w-64 rounded-full bg-accent/50 blur-3xl" />
        <p className="relative flex flex-col gap-2 text-sm font-semibold text-white/70">
          {t.yourPublicId}
          <code dir="ltr" className="self-start text-4xl tracking-[0.06em] text-white sm:text-6xl">{user.publicId}</code>
        </p>
        <div className="relative mt-5 flex flex-wrap items-center gap-4">
          <button className="btn bg-white text-ink hover:bg-accent-tint" onClick={copyId}>
            {copied ? <Check key="done" aria-hidden className="animate-icon-in text-success" /> : <Copy key="copy" aria-hidden className="animate-icon-in" />}
            {copied ? t.copied : t.copyId}
          </button>
          <p className="text-sm text-white/75">{t.giveIdToPatients}</p>
        </div>
        <p className="sr-only" role="status">{copied ? t.idCopied : ''}</p>
      </section>

      {error && <p role="alert" className="alert-error">{tr(error)}</p>}

      <section>
        <h2 className="section-title">{t.needsAttention}</h2>
        {flags === null ? (
          <div className="skeleton h-12" aria-busy="true" aria-label={t.loading} />
        ) : flags.length === 0 ? (
          <p className="text-sm text-muted">{t.noFlagged}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {flags.map((f) => (
              <li key={f.patientId} className="animate-alert-in rounded-2xl border-s-4 border-caution bg-caution-tint px-4 py-2.5 text-sm text-caution">
                <b>{f.name}</b>: {flagReasons(f, t).join('; ')}
                {f.lastSeen && ` (${t.lastSession(new Date(f.lastSeen).toLocaleDateString(locale))})`}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3 pt-1">
          <h2 className="section-title mb-0">{t.myPatients}</h2>
          <button className="btn-secondary" onClick={refresh} disabled={refreshing}>
            <RefreshCw aria-hidden className={refreshing ? 'animate-spin' : ''} /> {t.refreshList}
          </button>
        </div>
        {/* search only helps once the list is long */}
        {patients?.length > 3 && (
          <label className="relative mb-4 block">
            <span className="sr-only">{t.searchPatients}</span>
            <Search aria-hidden className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input className="field ps-11" type="search" placeholder={t.searchPatients}
              value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        )}
        {patients === null ? (
          <div className="flex flex-col gap-4" aria-busy="true" aria-label={t.loadingPatients}>
            <div className="skeleton h-40" />
            <div className="skeleton h-40" />
          </div>
        ) : patients.length === 0 ? (
          <p className="card border-dashed px-5 py-8 text-center text-sm text-muted">{t.noPatientsYet}</p>
        ) : shownPatients.length === 0 ? (
          <p className="card px-5 py-8 text-center text-sm text-muted">{t.noPatientMatch(query.trim())}</p>
        ) : (
          <ul className="stagger flex flex-col gap-4">
            {shownPatients.map((p) => (
              <PatientCard key={p._id} patient={p} catalog={catalog} onChanged={load} onError={handleError} />
            ))}
          </ul>
        )}
      </section>


      {catalog && (
        <section className="text-sm leading-relaxed text-muted">
          <p><b>{t.safety}</b> {t.safetyNote}</p>
          <p className="mt-1"><b>{t.measurement}</b> {t.measurementNote}</p>
        </section>
      )}
    </div>
  )
}

// One patient: their current exercises, plus buttons to edit / see sessions / remove
function PatientCard({ patient, catalog, onChanged, onError }) {
  const { t, locale } = useLang()
  const [editing, setEditing] = useState(false)
  const [sessions, setSessions] = useState(null) // null = not loaded/hidden
  const [loadingSessions, setLoadingSessions] = useState(false)
  const [confirm, confirmDialog] = useConfirm()
  const nameOf = useExerciseName(catalog)

  const toggleSessions = async () => {
    if (sessions) return setSessions(null)
    setLoadingSessions(true)
    try {
      const data = await api(`/physio/patients/${patient._id}/sessions`)
      setSessions(data.sessions)
    } catch (e) {
      onError(e)
    } finally {
      setLoadingSessions(false)
    }
  }

  const remove = async () => {
    const ok = await confirm({
      title: t.removePatientTitle(patient.name),
      message: t.removePatientMsg,
      confirmLabel: t.removePatient,
    })
    if (!ok) return
    try {
      await api(`/physio/patients/${patient._id}`, { method: 'DELETE' })
      onChanged()
    } catch (e) {
      onError(e)
    }
  }

  const exercises = patient.exercises ?? []

  return (
    <li className="card card-hover p-5 sm:p-6">
      <div className="text-lg font-bold text-ink">{patient.name} <bdi dir="ltr" className="text-sm font-medium text-muted">({patient.email})</bdi></div>
      {exercises.length === 0 ? (
        <p className="mt-2 text-sm text-muted">{t.noExercisesAssigned}</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink">
          {exercises.map((a) => (
            <li key={a._id} className="bg-paper px-3 py-2">
              {t.exerciseLine(nameOf(a.exerciseId), t[a.side], a.reps, a.startAngle, a.targetAngle, a.permittedMin, a.permittedMax)}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-2 border-t border-rule pt-4">
        <button className="btn-secondary" onClick={() => setEditing(!editing)} disabled={!catalog} aria-expanded={editing}>
          {editing ? t.closeEditor : t.editExercises}
        </button>
        <button className="btn-secondary" onClick={toggleSessions} aria-expanded={Boolean(sessions)} disabled={loadingSessions}>
          {loadingSessions && <LoaderCircle aria-hidden className="animate-spin" />}
          {sessions ? t.hideSessions : t.showSessions}
        </button>
        <button className="btn-danger ms-auto" onClick={remove}>{t.removePatient}</button>
      </div>

      {editing && catalog && (
        <AssignmentEditor
          patient={patient}
          catalog={catalog}
          onSaved={() => { setEditing(false); onChanged() }}
          onError={onError}
        />
      )}

      {sessions && (
        sessions.length === 0 ? <p className="mt-4 animate-fade-up text-sm text-muted">{t.noSessionsYet}</p> : (
          <table className="data-table mt-4 block animate-fade-up overflow-x-auto border border-rule sm:table">
            <thead>
              <tr><th>{t.thDate}</th><th>{t.thExercise}</th><th>{t.thSide}</th><th>{t.thGoodTotal}</th><th>{t.thTarget}</th><th>{t.thPain}</th></tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s._id}>
                  <td>{new Date(s.performedAt).toLocaleString(locale)}</td>
                  <td>{nameOf(s.exerciseId)}</td>
                  <td>{t[s.side] ?? s.side}</td>
                  <td><span className={`inline-block rounded-full px-2.5 py-0.5 font-semibold ${goodRepTone(s)}`}>{s.goodReps} / {s.totalReps}</span></td>
                  <td>{s.plan?.targetAngle}°</td>
                  <td className={s.painScore >= 7 || s.incident ? 'font-semibold text-danger' : ''}>
                    {s.painScore ?? '–'}{s.incident && <span className="block text-xs font-normal">{s.incident}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
      {confirmDialog}
    </li>
  )
}

// Default values for a newly chosen exercise, from the catalog's reference
// motion. These are anatomical references, NOT a prescription — the physio
// must adjust them for the patient.
function defaultsFor(catalog, exerciseId) {
  const ex = catalog.exercises.find((e) => e.id === exerciseId)
  const { start, end } = ex.illustrative_motion_deg
  return {
    exerciseId,
    startAngle: String(start),
    targetAngle: String(end),
    permittedMin: String(Math.min(start, end)),
    permittedMax: String(Math.max(start, end)),
  }
}

// Form fields are strings while editing; '' must not silently become 0
const toNumber = (v) => (String(v).trim() === '' ? NaN : Number(v))

// Same rules as backend/src/routes/physio.js (keep MIN_RANGE_DEG in sync),
// checked here so the exact field is flagged before saving.
const MIN_RANGE_DEG = 10
const ANGLES = ['startAngle', 'targetAngle', 'permittedMin', 'permittedMax']
function rowErrors(r, t) {
  const err = {}
  const n = Object.fromEntries(ANGLES.map((f) => [f, toNumber(r[f])]))
  for (const f of ANGLES) {
    if (!Number.isFinite(n[f]) || n[f] < 0 || n[f] > 180) err[f] = t.enter0to180
  }
  if (!err.permittedMin && !err.permittedMax && n.permittedMin >= n.permittedMax) {
    err.permittedMax = t.aboveSafeMin
  }
  const rangeOk = !err.permittedMin && !err.permittedMax
  for (const f of ['startAngle', 'targetAngle']) {
    if (!err[f] && rangeOk && (n[f] < n.permittedMin || n[f] > n.permittedMax)) err[f] = t.outsideSafeRange
  }
  if (!err.startAngle && !err.targetAngle && Math.abs(n.targetAngle - n.startAngle) < MIN_RANGE_DEG) {
    err.targetAngle = t.atLeastFromStart(MIN_RANGE_DEG)
  }
  const reps = toNumber(r.reps)
  if (!Number.isInteger(reps) || reps < 1 || reps > 100) err.reps = t.enter1to100
  if (!r.stopCriteria.trim()) err.stopCriteria = t.writeWhenStop
  if (!r.clinicalClearance) err.clinicalClearance = t.confirmClearance
  return err
}

// Edit a patient's exercise list (max 3). The server checks every value again.
function AssignmentEditor({ patient, catalog, onSaved, onError }) {
  const { t, tr } = useLang()
  const nameOf = useExerciseName(catalog)
  const [rows, setRows] = useState(() =>
    (patient.exercises ?? []).map((a) => ({
      exerciseId: a.exerciseId,
      side: a.side,
      startAngle: String(a.startAngle),
      targetAngle: String(a.targetAngle),
      permittedMin: String(a.permittedMin),
      permittedMax: String(a.permittedMax),
      reps: String(a.reps),
      stopCriteria: a.stopCriteria,
      clinicalClearance: a.clinicalClearance,
    })),
  )
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const tRef = useRef(t)
  tRef.current = t
  const [tried, setTried] = useState(false) // "fill this in" errors wait for the first Save
  const errors = rows.map((r) => rowErrors(r, t))
  const shown = errors.map((e) => (tried ? e : Object.fromEntries(Object.entries(e).filter(([f]) => ANGLES.includes(f) || f === 'reps'))))

  const updateRow = (i, changes) => setRows(rows.map((r, j) => (j === i ? { ...r, ...changes } : r)))

  const addRow = () => setRows([
    ...rows,
    { ...defaultsFor(catalog, catalog.exercises[0].id), side: 'right', reps: '10', stopCriteria: '', clinicalClearance: false },
  ])

  const save = async () => {
    setError('')
    setTried(true)
    if (errors.some((e) => Object.keys(e).length)) {
      setError(t.fixHighlighted)
      return
    }
    setBusy(true)
    try {
      const exercises = rows.map((r) => ({
        exerciseId: r.exerciseId,
        side: r.side,
        startAngle: toNumber(r.startAngle),
        targetAngle: toNumber(r.targetAngle),
        permittedMin: toNumber(r.permittedMin),
        permittedMax: toNumber(r.permittedMax),
        reps: toNumber(r.reps),
        stopCriteria: r.stopCriteria,
        clinicalClearance: r.clinicalClearance,
      }))
      await api(`/physio/patients/${patient._id}/exercises`, { method: 'PUT', body: { exercises } })
      toast.success(tRef.current.exercisesSaved(patient.name))
      onSaved()
    } catch (e) {
      if (e.status === 401) onError(e)
      else setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  // Error text sits under the field and is announced with it (aria-describedby)
  const fieldError = (i, field) => shown[i][field] && (
    <span id={`err-${i}-${field}`} className="field-error">{shown[i][field]}</span>
  )
  const invalidProps = (i, field) => ({
    'aria-invalid': Boolean(shown[i][field]),
    'aria-describedby': shown[i][field] ? `err-${i}-${field}` : undefined,
  })

  const numberField = (i, field, label, props) => (
    <label className="field-label">
      {label}
      <input className="field-sm w-24" type="number" {...props} {...invalidProps(i, field)}
        value={rows[i][field]} onChange={(e) => updateRow(i, { [field]: e.target.value })} />
      {fieldError(i, field)}
    </label>
  )
  const angle = { min: '0', max: '180' }

  return (
    <div className="mt-4 animate-fade-up border-t border-ink bg-paper p-4 sm:p-5">
      <p className="mb-4 text-xs leading-relaxed text-muted">{t.editorIntro(MAX_EXERCISES)}</p>
      {rows.map((r, i) => (
        <div key={i} className="mb-4 flex animate-fade-up flex-col gap-3 border border-rule bg-white p-4">
          <div className="flex flex-wrap items-end gap-3">
            <label className="field-label">
              {t.exercise}
              <select className="field-sm" value={r.exerciseId}
                onChange={(e) => updateRow(i, defaultsFor(catalog, e.target.value))}>
                {catalog.exercises.map((ex) => <option key={ex.id} value={ex.id}>{nameOf(ex.id)}</option>)}
              </select>
            </label>
            <label className="field-label">
              {t.side}
              <select className="field-sm" value={r.side} onChange={(e) => updateRow(i, { side: e.target.value })}>
                <option value="left">{t.left}</option>
                <option value="right">{t.right}</option>
              </select>
            </label>
            {numberField(i, 'startAngle', t.startDeg, angle)}
            {numberField(i, 'targetAngle', t.targetDeg, angle)}
            {numberField(i, 'permittedMin', t.safeMinDeg, angle)}
            {numberField(i, 'permittedMax', t.safeMaxDeg, angle)}
            {numberField(i, 'reps', t.reps, { min: '1', max: '100' })}
            <button className="btn-danger ms-auto"
              onClick={() => setRows(rows.filter((_, j) => j !== i))}>{t.removeExercise}</button>
          </div>
          <label className="field-label">
            {t.stopIfLabel}
            <input className="field-sm normal-case tracking-normal" maxLength={500} value={r.stopCriteria}
              placeholder={t.stopIfPlaceholder} {...invalidProps(i, 'stopCriteria')}
              onChange={(e) => updateRow(i, { stopCriteria: e.target.value })} />
            {fieldError(i, 'stopCriteria')}
          </label>
          <label className={`flex cursor-pointer items-start gap-2.5 bg-caution-tint px-3 py-2.5 text-sm font-medium text-caution ${shown[i].clinicalClearance ? 'outline outline-2 outline-danger' : ''}`}>
            <input type="checkbox" checked={r.clinicalClearance} {...invalidProps(i, 'clinicalClearance')}
              onChange={(e) => updateRow(i, { clinicalClearance: e.target.checked })} />
            {t.clearance}
          </label>
          {fieldError(i, 'clinicalClearance')}
        </div>
      ))}
      {error && <p role="alert" className="alert-error mb-3">{tr(error)}</p>}
      <div className="flex gap-2">
        <button className="btn-secondary" onClick={addRow} disabled={rows.length >= MAX_EXERCISES}>
          <Plus aria-hidden /> {t.addExercise}
        </button>
        <button className="btn-primary" onClick={save} disabled={busy}>
          {busy && <LoaderCircle aria-hidden className="animate-spin" />} {t.saveExercises}
        </button>
      </div>
    </div>
  )
}

export default PhysioHome
