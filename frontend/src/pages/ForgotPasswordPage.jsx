// =============================================================================
// ForgotPasswordPage.jsx — enter your email to get a password reset link.
// The server answers the same way whether or not the email has an account.
// =============================================================================

import { useState } from 'react'
import { Link } from 'react-router'
import { LoaderCircle } from 'lucide-react'
import { api } from '../api'
import AuthLayout from '../components/AuthLayout'
import { useLang } from '../i18n/AppLanguage'

const ForgotPasswordPage = () => {
  const { t, tr, lang } = useLang()
  const [email, setEmail] = useState('')
  const [sentTo, setSentTo] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await api('/auth/forgot-password', { method: 'POST', body: { email, lang } }) // lang: the email is written in the app language
      setSentTo(email.trim())
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout>
      <main className="auth-card">
        {sentTo ? (
          <>
            <h1 className="mb-4 text-3xl font-semibold">{t.checkEmailTitle}</h1>
            <div role="status" className="flex flex-col gap-3.5 leading-relaxed text-ink">
              <p>{t.checkEmailBefore} <bdi className="font-semibold">{sentTo}</bdi>{t.checkEmailAfter}</p>
              <p className="text-sm text-muted">{t.cantFind} <button type="button" className="link" onClick={() => setSentTo('')}>{t.tryAgainLink}</button>.</p>
            </div>
            <p className="mt-6 text-center text-sm text-muted"><Link className="link" to="/login">{t.backToLogin}</Link></p>
          </>
        ) : (
          <>
            <h1 className="mb-3 text-3xl font-semibold">{t.titles['/forgot-password']}</h1>
            <p className="mb-6 text-muted">{t.forgotIntro}</p>
            <form onSubmit={submit} onInvalidCapture={(e) => { e.preventDefault(); e.currentTarget.querySelector(':invalid')?.focus() }} className="stagger flex flex-col gap-3.5">
              <label className="form-label" htmlFor="forgot-email">{t.email}</label>
              <input id="forgot-email" className="field" type="email" placeholder="name@example.com" autoComplete="email" autoFocus
                value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={254} />
              <p className="field-hint hint-empty">{t.hintLoginEmailEmpty}</p>
              <p className="field-hint hint-format">{t.hintEmailFormat}</p>
              {error && <p role="alert" className="alert-error">{tr(error)}</p>}
              <button className="btn-primary btn-lg mt-2 w-full" disabled={busy}>
                {busy ? <><LoaderCircle aria-hidden className="animate-spin" /> {t.sending}</> : t.sendResetLink}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-muted">{t.remembered} <Link className="link" to="/login">{t.logIn}</Link></p>
          </>
        )}
      </main>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
