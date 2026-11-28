// =============================================================================
// BillingPanel.jsx — plan, price and payment for the physio (slides 4–5, 10).
// Payment is by Whish Money or OMT transfer (no card processor in Lebanon
// yet): the physio sends the money, enters the receipt reference, and the
// review team confirms it, which extends "paid until".
// =============================================================================

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Check, Clock, Gift, LoaderCircle, Wallet } from 'lucide-react'
import { api } from '../../api'
import { useAuth } from '../../auth/authContext'
import { useLang } from '../../i18n/AppLanguage'
import { PLANS } from '../../billing/pricing'

const amount = (n) => (Number.isInteger(Number(n)) ? String(n) : Number(n).toFixed(2))
const money = (n) => `$${amount(n)}`
const minus = (pct) => (pct ? `−${pct}%` : '0%')

export default function BillingPanel({ account, reload }) {
  const { user } = useAuth()
  const { t, tr, locale } = useLang()
  const { billing, quote: q, patientCount } = account
  const [busy, setBusy] = useState('')
  const [method, setMethod] = useState('whish')
  const [reference, setReference] = useState('')
  const [error, setError] = useState('')
  const date = (d) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(d))
  const paidActive = billing.paidUntil && new Date(billing.paidUntil) > new Date()

  const run = async (key, fn) => {
    setError('')
    setBusy(key)
    try {
      await fn()
      await reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  const choose = (plan, annual = !!billing.annual) => run(plan, async () => {
    await api('/physio/billing/plan', { method: 'PUT', body: { plan, annual } })
    toast.success(t.planChanged)
  })

  const pay = (e) => {
    e.preventDefault()
    run('pay', async () => {
      await api('/physio/billing/payment', { method: 'POST', body: { method, reference } })
      setReference('')
      toast.success(t.paymentSent)
    })
  }

  const row = (label, value, strong) => (
    <div className={`flex items-baseline justify-between gap-4 py-2 ${strong ? 'text-lg font-semibold' : 'text-sm'}`}>
      <dt className={strong ? '' : 'text-muted'}>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  )

  return (
    <div className="stagger flex flex-col gap-6">
      <p className="text-muted">{t.billingIntro}</p>
      {error && <p role="alert" className="alert-error">{tr(error)}</p>}

      <ul className="grid gap-4 md:grid-cols-3">
        {Object.entries(PLANS).map(([key, p]) => {
          const current = billing.plan === key
          const tooSmall = patientCount > p.maxPatients
          return (
            <li key={key} className={`card flex flex-col gap-2 p-6 transition duration-300 ${current ? 'ring-2 ring-accent' : ''}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{t.plans[key]}</h3>
                {current && <span className="pill-ok text-xs"><Check aria-hidden /> {t.currentPlan}</span>}
              </div>
              <p className="text-3xl font-semibold tabular-nums">${p.price}<span className="text-base font-medium text-muted">{t.perMonth}</span></p>
              <p className="text-sm text-muted">{t.upToPatients(p.maxPatients)}</p>
              {current
                ? <p className="mt-auto pt-2 text-sm font-semibold text-accent">{t.patientsUsed(patientCount, p.maxPatients)}</p>
                : (
                  <button className="btn-secondary mt-auto" disabled={!!busy || tooSmall} onClick={() => choose(key)}>
                    {busy === key && <LoaderCircle aria-hidden className="animate-spin" />} {t.choosePlan}
                  </button>
                )}
            </li>
          )
        })}
      </ul>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="panel">
          <h2 className="section-title">{t.breakdown}</h2>
          <dl className="divide-y divide-rule">
            {row(t.listPrice, money(q.list))}
            {row(account.profile.region ? t.regionalDiscount(t.regions[account.profile.region]) : t.noRegionYet, minus(q.regionalPct))}
            {q.aidPct > 0 && row(t.aidDiscount, `−${q.aidPct}%`)}
            {q.pilot && row(t.pilotPrice, '−50%')}
            {q.sponsorPct > 0 && row(t.sponsorShare, `−${q.sponsorPct}%`)}
            {row(t.monthly, money(q.monthly), true)}
          </dl>
          <p className="mt-2 text-xs text-muted">{t.capNote}</p>
          <label className="consent mt-4">
            <input type="checkbox" checked={!!billing.annual} disabled={!!busy} onChange={(e) => choose(billing.plan, e.target.checked)} />
            <span>{t.payYearly}</span>
          </label>
          <div className="mt-5 flex items-end justify-between rounded-2xl bg-ink px-5 py-4 text-white">
            <span className="text-sm text-white/75">{t.dueNow}<span className="block">{t.forMonths(q.months)}</span></span>
            <span key={q.dueNow} className="animate-tick text-4xl font-semibold tabular-nums">{money(q.dueNow)}</span>
          </div>
        </section>

        <section className="panel flex flex-col gap-4">
          <h2 className="section-title mb-0">{t.howToPay}</h2>
          <p className={paidActive ? 'pill-ok self-start' : 'pill-quiet self-start'}>
            <Wallet aria-hidden /> {paidActive ? t.paidUntil(date(billing.paidUntil)) : t.notPaidYet}
          </p>
          {billing.freeMonths > 0 && <p className="notice bg-amber-tint text-amber-ink"><Gift aria-hidden /> {t.freeMonthsLeft(billing.freeMonths)}</p>}
          {billing.pending?.reference ? (
            <p className="notice bg-amber-tint text-amber-ink"><Clock aria-hidden /> {t.paymentPending(amount(billing.pending.amount), billing.pending.reference)}</p>
          ) : !account.verification.verified ? (
            <p className="text-sm text-muted">{t.verifyBeforePaying}</p>
          ) : (
            <>
              <ol className="flex list-decimal flex-col gap-1.5 ps-5 text-sm marker:font-semibold marker:text-accent">
                <li>{t.payStep1(amount(q.dueNow))}</li>
                <li>{t.payStep2} <code dir="ltr" className="rounded bg-paper px-1.5 font-semibold">{user.publicId}</code></li>
                <li>{t.payStep3}</li>
              </ol>
              {/* invalid fields show the translated hint below instead of the browser's popup */}
              <form onSubmit={pay} onInvalidCapture={(e) => { e.preventDefault(); e.currentTarget.querySelector(':invalid')?.focus() }} className="flex flex-col gap-3">
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold text-muted">{t.payMethod}</legend>
                  <div className="segmented max-w-xs">
                    <span className="segmented-indicator" aria-hidden />
                    <label><input className="sr-only" type="radio" name="method" checked={method === 'whish'} onChange={() => setMethod('whish')} />Whish</label>
                    <label><input className="sr-only" type="radio" name="method" checked={method === 'omt'} onChange={() => setMethod('omt')} />OMT</label>
                  </div>
                </fieldset>
                <label className="field-label">
                  {t.payRef}
                  <input className="field" dir="ltr" required pattern="[A-Za-z0-9\-]{4,40}" value={reference} onChange={(e) => setReference(e.target.value)} />
                  <span className="label-hint">{t.err.refInvalid}</span>
                </label>
                <button className="btn-primary self-start" disabled={busy === 'pay'}>
                  {busy === 'pay' && <LoaderCircle aria-hidden className="animate-spin" />} {t.sendPayment}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
