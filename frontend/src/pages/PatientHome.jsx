// =============================================================================
// PatientHome.jsx — the patient's home page.
//   1. Link to a physiotherapist: type their public ID, check the name that
//      comes back, then confirm.
//   2. See the (up to 3) exercises the physio assigned, and start one.
//   3. When an exercise is finished, save the results (or keep them on the
//      device if offline, and send them next time).
// Page text follows the app language; the exercise coach follows it too,
// unless the patient picks a different coach language.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { LoaderCircle, Play } from 'lucide-react'
import useConfirm from '../components/useConfirm'
import { useAuth } from '../auth/authContext'
import { api, addSessionReport, saveSession, flushPendingSessions } from '../api'
import ExerciseCoach from '../pose/ExerciseCoach'
import PainReport from '../components/PainReport'
import PhysioDirectory from '../components/PhysioDirectory'
import { LANGUAGES, getStrings, loadLang, saveLang } from '../i18n/messages'
import { useLang } from '../i18n/AppLanguage'

const PatientHome = () => {
  const { user, setUser, refresh, logout } = useAuth()
  const { t, tr, lang: appLang } = useLang()
  const [coachChoice, setCoachLang] = useState(loadLang)
  const coachLang = coachChoice ?? appLang // until the patient picks one, the coach speaks the app language
  const [catalog, setCatalog] = useState(null) // exercise instructions
  const [active, setActive] = useState(null)   // the exercise being done now
  const [finished, setFinished] = useState(null) // a finished session waiting for its pain report
  const [lookupId, setLookupId] = useState('')
  const [found, setFound] = useState(null)     // physio found by public ID, not yet linked
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirm, confirmDialog] = useConfirm()
  const coach = getStrings(coachLang)                 // coach language (save message)
  const { exercises: exerciseNames, howTo, ui: pageUi } = getStrings(appLang) // page language
  const tRef = useRef(t) // current text for the one-time effect below
  tRef.current = t

  // Expired login -> back to the login page; anything else -> show the message
  const handleError = (e) => (e.status === 401 ? logout() : setError(e.message))

  // When the page opens: reload the plan (the physio may have changed it),
  // load exercise instructions, and send any sessions saved while offline.
  useEffect(() => {
    refresh().catch((e) => { if (e.status === 401) logout() })
    api('/exercises').then(setCatalog).catch(() => {})
    flushPendingSessions(user._id).then((n) => {
      if (n) toast.success(tRef.current.sentEarlier(n))
    })
  }, [user._id, refresh, logout])

  const changeCoachLang = (e) => {
    setCoachLang(e.target.value)
    saveLang(e.target.value)
  }

  // Step 1 of linking: find the physio and show their name
  const findPhysio = async (e) => {
    e.preventDefault()
    setError('')
    setFound(null)
    setBusy(true)
    try {
      const data = await api(`/patient/lookup/${encodeURIComponent(lookupId.trim())}`)
      setFound(data.physio)
    } catch (err) {
      handleError(err)
    } finally {
      setBusy(false)
    }
  }

  // Step 2 of linking: the patient confirmed it's the right person
  const linkPhysio = async () => {
    setError('')
    setBusy(true)
    try {
      const data = await api('/patient/physio', { method: 'PUT', body: { publicId: found.publicId } })
      setUser(data.user)
      setFound(null)
      setLookupId('')
      toast.success(t.nowYourPhysio(data.user.physio.name))
    } catch (err) {
      handleError(err)
    } finally {
      setBusy(false)
    }
  }

  const unlinkPhysio = async () => {
    const ok = await confirm({
      title: t.removePhysioTitle(user.physio.name),
      message: t.removePhysioMsg,
      confirmLabel: t.removePhysio,
    })
    if (!ok) return
    setError('')
    try {
      const data = await api('/patient/physio', { method: 'DELETE' })
      setUser(data.user)
    } catch (err) {
      handleError(err)
    }
  }

  // Called by ExerciseCoach when the patient presses "Finish session".
  // The session is saved first (so it's never lost), then we ask about pain.
  const handleFinish = async (summary) => {
    setActive(null)
    const good = summary.reps.filter((r) => r.reachedTarget).length
    try {
      const id = await saveSession(user._id, summary)
      if (id) toast.success(coach.ui.saved(good, summary.reps.length))
      else toast(t.offlineKept)
      setFinished({ id })
    } catch (err) {
      toast.error(t.couldNotSave(tr(err.message)))
    }
  }

  const saveFinished = async (report) => {
    try {
      await addSessionReport(user._id, finished.id, report)
    } catch (err) {
      toast.error(t.couldNotSave(tr(err.message)))
    }
    setFinished(null)
  }

  // Doing an exercise: show only the coach
  if (active) {
    return (
      <ExerciseCoach
        key={active._id}
        assignment={active}
        lang={coachLang}
        onFinish={handleFinish}
        onCancel={() => setActive(null)}
      />
    )
  }

  if (finished) return <PainReport onSave={saveFinished} />

  const exercises = user.exercises ?? []
  const catalogById = Object.fromEntries((catalog?.exercises ?? []).map((ex) => [ex.id, ex]))

  return (
    <div className="stagger flex flex-col gap-6">
      {/* Language for the exercise coach (spoken + on-screen feedback) */}
      <label className="flex items-center gap-3 self-end text-sm font-medium text-ink">
        <span>{t.coachLanguage}</span>
        <select value={coachLang} onChange={changeCoachLang} className="field-sm w-auto cursor-pointer">
          {Object.entries(LANGUAGES).map(([code, l]) => (
            <option key={code} value={code} lang={code}>{l.name}</option>
          ))}
        </select>
      </label>

      {error && <p role="alert" className="alert-error">{tr(error)}</p>}

      {/* --- Physiotherapist --- */}
      <section>
        <h2 className="section-title">{t.myPhysio}</h2>
        {user.physio ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-accent-tint px-4 py-3">
            <span className="font-semibold text-ink">{user.physio.name} <bdi className="ms-1 text-sm font-medium text-accent" dir="ltr">({user.physio.publicId})</bdi></span>
            <button className="btn-danger" onClick={unlinkPhysio}>{t.removePhysio}</button>
          </div>
        ) : (
          <>
            <label htmlFor="physio-id" className="mb-1 block font-semibold">{t.physioId}</label>
            <p className="mb-3 text-sm text-muted">{t.physioIdHelp}</p>
            <form onSubmit={findPhysio} onInvalidCapture={(e) => { e.preventDefault(); e.currentTarget.querySelector(':invalid')?.focus() }} className="flex flex-wrap gap-2">
              {/* invalid fields show the styled hints below instead of the browser's popup */}
              <input id="physio-id" className="field min-w-0 max-w-xs flex-1 font-mono uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal" placeholder="PT-XXXXXX" value={lookupId}
                onChange={(e) => setLookupId(e.target.value)} required />
              <p className="field-hint hint-empty order-last basis-full [--gap:0.5rem]">{t.hintPhysioIdEmpty}</p>
              <button className="btn-primary" disabled={busy}>
                {busy && !found ? <LoaderCircle aria-hidden className="animate-spin" /> : null} {t.findPhysio}
              </button>
            </form>
            {found && (
              <div role="status" className="mt-4 flex animate-alert-in flex-wrap items-center gap-3 rounded-2xl bg-accent-tint px-4 py-3 text-sm ring-2 ring-accent/40">
                <span className="me-auto text-ink">{t.isThisYourPhysio} <b>{found.name}</b> <bdi dir="ltr">({found.publicId})</bdi></span>
                <button className="btn-primary" onClick={linkPhysio} disabled={busy}>{t.yesThatsThem}</button>
                <button className="btn-secondary" onClick={() => setFound(null)}>{t.noSearchAgain}</button>
              </div>
            )}
          </>
        )}
      </section>

      {!user.physio && <PhysioDirectory onPick={(p) => { setFound(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />}

      {/* --- Exercises --- */}
      <section>
        <h2 className="section-title">{t.myExercises}</h2>
        {!user.physio ? (
          <p className="card border-dashed px-5 py-8 text-center text-sm text-muted">{t.addPhysioFirst}</p>
        ) : exercises.length === 0 ? (
          <p className="card border-dashed px-5 py-8 text-center text-sm text-muted">{t.noExercisesYet}</p>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted">{t.cameraStays}</p>
            <ul className="stagger flex flex-col gap-4">
              {exercises.map((a) => {
                const info = catalogById[a.exerciseId]
                // translated instructions (i18n/patientText.js) if we have them, else the catalog's English
                const translated = howTo[a.exerciseId]
                const how = translated ?? (info && { setup: info.setup, form: info.ideal_form, camera: info.measurement.preferred_camera_view })
                return (
                  <li key={a._id} className="card card-hover flex flex-col gap-2 p-5 sm:p-6">
                    <div className="text-lg font-bold text-ink">
                      {exerciseNames[a.exerciseId] ?? a.exerciseId} · {t[a.side]}
                    </div>
                    <div className="text-sm font-medium text-ink">{t.repsFromTo(a.reps, a.startAngle, a.targetAngle)}</div>
                    <div className="rounded-xl border-s-4 border-danger bg-danger-tint px-3 py-2 text-sm font-medium text-danger">{t.stopIf} <bdi>{a.stopCriteria}</bdi></div>
                    {how && (
                      <details className="mt-1 rounded-2xl bg-paper px-4 py-3 text-sm text-ink [&[open]>summary]:mb-2 [&>p]:leading-relaxed">
                        <summary>{t.howToDoIt} {!translated && t.instructionsInEnglish && <span className="font-normal text-muted">{t.instructionsInEnglish}</span>}</summary>
                        <div {...(translated ? {} : { lang: "en", dir: "ltr" })} className="text-start">
                          <p>{how.setup}</p>
                          <ul className="my-2 list-disc space-y-1 ps-5 marker:text-accent">
                            {how.form.map((line) => <li key={line}>{line}</li>)}
                          </ul>
                          <p className="text-xs font-medium text-muted">{pageUi.camera} {how.camera}</p>
                        </div>
                      </details>
                    )}
                    <button className="btn-primary btn-lg mt-2 self-start" onClick={() => setActive(a)}>
                      <Play aria-hidden className="rtl:-scale-x-100" /> {t.startExercise}
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </section>

      {confirmDialog}
      {catalog?.safety_note && <p className="text-sm leading-relaxed text-muted">{t.safetyNote}</p>}
    </div>
  )
}

export default PatientHome
