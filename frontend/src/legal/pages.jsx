// =============================================================================
// pages.jsx — the policy pages, in all 8 app languages.
// The text lives in content/<code>.jsx; the app's language setting picks one.
//
// DRAFTS: have them reviewed by a lawyer before launch, and every translation
// by a native speaker. If the app changes what it collects or who it shares
// with, update every language. en.jsx is the reference text.
// =============================================================================

import LegalLayout from './LegalLayout'
import en from './content/en'
import fr from './content/fr'
import ar from './content/ar'
import hyw from './content/hyw'
import es from './content/es'
import de from './content/de'
import it from './content/it'
import tr from './content/tr'
import { useLang } from '../i18n/AppLanguage'

const CONTENT = { en, fr, ar, hyw, es, de, it, tr }

const makePage = (key) => function LegalPage() {
  const { lang } = useLang()
  const page = (CONTENT[lang] ?? en)[key]
  return (
    <LegalLayout title={page.title}>
      <page.Body />
    </LegalLayout>
  )
}

export const PrivacyPage = makePage('privacy')
export const TermsPage = makePage('terms')
export const PricingPage = makePage('pricing')
export const CookiesPage = makePage('cookies')
export const AccessibilityPage = makePage('accessibility')
