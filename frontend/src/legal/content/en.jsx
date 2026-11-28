// =============================================================================
// English policy text. The French and Arabic files must say the same thing.
// Facts come from the code (checked November 2026):
//   data stored: backend/src/models/User.js, Session.js
//   browser storage: src/api.js, src/i18n/messages.js, StorageNotice.jsx
//   camera frames are analysed on the device (src/pose/); only numbers are sent
// =============================================================================

import { Link } from 'react-router'
import { BUSINESS as B, PLANS, POLICY as P, mailto } from '../business'

const planLabel = (plan, i) =>
  plan.maxPatients ? `Up to ${plan.maxPatients} patients` : `More than ${PLANS[i - 1].maxPatients} patients`

export default {
  privacy: {
    title: 'Privacy policy',
    Body: () => (
      <>
        <p>
          This policy explains what personal data {B.name} (&ldquo;we&rdquo;), based in {B.country}, collects,
          why, who can see it, and your choices. For any privacy question or request, email {mailto(B.privacyEmail)}.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li><b>Your account:</b> name, email address, whether you are a patient or a physiotherapist, and your password. We store the password only as a one-way hash, never the password itself.</li>
          <li><b>Password reset:</b> if you use &ldquo;Forgot password&rdquo;, we email you a one-time link. We store only a scrambled (hashed) version of its code, and the link expires after 30 minutes.</li>
          <li><b>Physiotherapists:</b> a public ID (like PT-ABC234) that we create so patients can find you.</li>
          <li><b>Patients:</b> which physiotherapist you have linked to, and the exercises they assign you: exercise, side, angles, safe range, number of repetitions, when to stop, and their confirmation that you are cleared for the exercise.</li>
          <li><b>Exercise results:</b> for each session, the exercise and side, the plan at that time, the highest angle reached in each repetition and whether it reached the target, the number of repetitions, an optional pain score, and the date and time.</li>
          <li><b>Technical data:</b> your IP address is held briefly in the server&rsquo;s memory to limit how many requests one connection can make. It is not saved in our database. Our hosting providers may keep their own server logs.</li>
          <li><b>Billing (physiotherapists and institutions only):</b> the details needed to invoice you and record your payments. Payments are made directly to us, outside the app; we never see or store card numbers in the app.</li>
          <li><b>Physiotherapist verification:</b> photos or scans you upload of your ID or passport (front and back), a live selfie holding your ID, your OPTL card (front and back) and current dues receipt, your degree or equivalence, and proof of your workplace; optionally insurance and training certificates. We also store your phone number, pricing region, clinic name, the languages you treat in, and the review decision.</li>
          <li><b>Financial aid (physiotherapists who apply):</b> the aid tracks you choose and their documents: income declaration and proof, municipality or mokhtar letter, graduation dates, displacement, damage or injury evidence, pledge or sponsor letters, and the decision.</li>
          <li><b>Payments:</b> the plan you choose, the Whish Money or OMT transfer reference you enter, the amount, and until when you have paid.</li>
          <li><b>Pain and incidents:</b> after a session, patients can rate their pain from 0 to 10 and describe a problem. Your physiotherapist sees it with the session.</li>
        </ul>
        <p>Exercise plans and results are <b>health data</b>. We only use them to run the service for you and your physiotherapist.</p>

        <h2>What we do not collect</h2>
        <ul>
          <li><b>No video or photos of your exercises.</b> The camera image is analysed on your own device to measure the angle of your joint. It is never uploaded or saved. Only the numbers listed above are sent.</li>
          <li><b>No tracking.</b> {B.name} has no analytics, advertising or social-media trackers, and sets no cookies. See <Link to="/cookies">Cookies and storage</Link>.</li>
          <li>We do not sell your data or use it for advertising.</li>
        </ul>

        <h2>Who can see your data</h2>
        <ul>
          <li><b>Your physiotherapist</b>, once you link to them: your name, email address, assigned exercises, your 50 most recent exercise results (including results from before you linked to them), and a weekly &ldquo;needs attention&rdquo; summary based on them. If you remove your physiotherapist, they can no longer see any of your data in {B.name}, and your assigned exercises are cleared.</li>
          <li><b>Patients</b> who enter a physiotherapist&rsquo;s public ID see that physiotherapist&rsquo;s name and ID.</li>
          <li><b>Service providers</b> that run the service for us: Netlify (hosts the website), Render (runs our server), our private MongoDB database, and our email provider (sends password-reset emails). They may only use the data to provide their service to us.</li>
          <li>Authorities, only where the law requires us to share it.</li>
          <li><b>Our review team</b> sees physiotherapists&rsquo; verification and aid documents, only to decide on them. With your consent we may check them with the Order of Physiotherapists (OPTL) or the issuer, and audit about 10% of approved aid files each quarter.</li>
          <li><b>Logged-in patients</b> see the name, region, clinic, languages and verified badge of physiotherapists who choose to be listed in the directory.</li>
        </ul>

        <h2>Why we use it (legal basis)</h2>
        <ul>
          <li>Account and billing details: to provide the service you signed up for.</li>
          <li>Health data (exercise plans and results): with your explicit consent, given when you create a patient account. You can withdraw it at any time by removing your physiotherapist or asking us to delete your account. Withdrawing does not affect use before that.</li>
          <li>IP address for rate limiting: to keep the service secure and available.</li>
        </ul>
        <p>We follow Lebanon&rsquo;s Law No. 81 of 2018 on electronic transactions and personal data, and, for users in the European Union, the General Data Protection Regulation (GDPR).</p>

        <h2>Where your data is stored</h2>
        <p>Our servers and database may be located outside your country. Where the law requires it, we use appropriate safeguards for these transfers.</p>

        <h2>Spoken feedback</h2>
        <p>The exercise coach speaks short phrases (such as &ldquo;Good&rdquo;) using your browser&rsquo;s built-in text-to-speech. Some browsers use an online voice service from the browser maker for this. The phrases are the same for everyone and contain no personal data.</p>

        <h2>How long we keep it</h2>
        <p>We keep your account and results while your account is open. When you ask us to delete your account, we delete it and its results within {P.deletionDays} days, except records the law requires us to keep (such as invoices).</p>
        <p>Verification and aid documents are kept while your account is open, so we can re-check them yearly and audit aid. When an aid period ends, we delete its documents within 12 months unless an audit or dispute needs them.</p>

        <h2>Your rights</h2>
        <p>You can ask to see the data we hold about you, correct it, delete it, receive a copy, or object to or restrict its use. To make a request, including closing your account, email {mailto(B.privacyEmail)}. We answer within {P.deletionDays} days. If you are not satisfied, you can complain to the data-protection authority where you live.</p>

        <h2>Security</h2>
        <p>Passwords are stored only as a hash. In the app, you must log in to see any personal data, and a patient&rsquo;s data can only be seen by that patient and their linked physiotherapist. Our team and service providers only access data when needed to run or fix the service. No system is completely secure; if a breach affects you, we will tell you as the law requires.</p>

        <h2>Children</h2>
        <p>Patients under {P.adultAge} may only use {B.name} under the supervision of a parent or guardian, who creates and manages the account and gives the consents on the child&rsquo;s behalf.</p>

        <h2>Changes</h2>
        <p>We will update this page when what we collect changes, and change the date at the top.</p>
      </>
    ),
  },

  terms: {
    title: 'Terms of use',
    Body: () => (
      <>
        <p>
          These terms apply when you use {B.name}, based in {B.country}. By creating an account you agree to them,
          to the <Link to="/privacy">Privacy policy</Link> and, for physiotherapists and institutions, to
          the <Link to="/pricing">Pricing, cancellation and refund policy</Link>.
        </p>

        <h2>What {B.name} is</h2>
        <p>A tool that lets a physiotherapist assign home exercises and lets the patient do them in front of a camera, with on-screen and spoken feedback on the joint angle and repetitions.</p>

        <h2>Not medical advice, not for emergencies</h2>
        <ul>
          <li>{B.name} does not diagnose or treat any condition and does not replace your physiotherapist or doctor.</li>
          <li>Angles measured by the camera are estimates. They can be wrong because of lighting, camera position, clothing or how much of your body is visible.</li>
          <li>Follow your physiotherapist&rsquo;s instructions. Stop and seek advice if you feel pain or new symptoms, or if anything on your plan says to stop.</li>
          <li>In an emergency, call your local emergency number.</li>
        </ul>

        <h2>Your account</h2>
        <ul>
          <li>Give accurate details and keep your password private. An account is for one person.</li>
          <li>Patients under {P.adultAge} may only use {B.name} under the supervision of a parent or guardian, who is responsible for the account.</li>
        </ul>

        <h2>Physiotherapists and institutions</h2>
        <ul>
          <li>You must be qualified and allowed to practise where you treat patients.</li>
          <li>You are responsible for the exercises, angles, safe ranges and stop criteria you assign, and for confirming each patient is clinically cleared for them.</li>
          <li>Use patients&rsquo; data only to treat them, and follow the health-data and professional rules that apply to you.</li>
          <li>Subscriptions, cancellation and refunds are covered by the <Link to="/pricing">Pricing, cancellation and refund policy</Link>.</li>
          <li><b>Verification:</b> patients can only find and add you once our team has verified your documents. We re-check them every year, with a 30-day grace period. We may suspend an account whose documents are false or expired.</li>
          <li><b>Remote care:</b> {B.name} supports home exercises you prescribe. Make sure any remote follow-up is allowed by the rules that apply to you; World Physiotherapy lists telehealth as not permitted in Lebanon, so take written advice before offering remote treatment.</li>
          <li><b>Financial aid</b> is decided by our team. False documents mean the aid is removed and you cannot apply again for 12 months.</li>
        </ul>

        <h2>Price</h2>
        <p>{B.name} is free for patients. Physiotherapists pay a monthly plan, by Whish Money or OMT transfer, which we confirm. Plans, discounts, aid and refunds are explained in the <Link to="/pricing">Pricing, cancellation and refund policy</Link>.</p>

        <h2>Acceptable use</h2>
        <p>Do not misuse the service: no access to other people&rsquo;s accounts or data, no attempts to break or overload it, and nothing unlawful.</p>

        <h2>Availability and changes</h2>
        <p>We work to keep {B.name} running, but cannot promise it will always be available or free of errors. We may change or stop features, and will update these terms when we do.</p>

        <h2>Liability</h2>
        <p>We are not responsible for losses caused by using exercises or measurements against your physiotherapist&rsquo;s advice, or by events outside our control. Nothing in these terms limits liability that cannot be limited by law, or your rights as a consumer.</p>

        <h2>Ending your use</h2>
        <p>You can stop using {B.name} at any time and ask us to delete your account ({mailto(B.privacyEmail)}). We may suspend an account that breaks these terms.</p>

        <h2>Law and contact</h2>
        <p>These terms are governed by the laws of {B.country}, and disputes are handled by the competent courts of {B.country}, without affecting any rights you have under the laws of the country where you live. Questions: {mailto(B.email)}.</p>
      </>
    ),
  },

  pricing: {
    title: 'Pricing, cancellation and refunds',
    Body: () => (
      <>
        <p>{B.name} is <b>free for patients</b>. Each physiotherapist pays a monthly plan based on how many active patients they have. You pay by Whish Money or OMT transfer and enter the receipt reference in the app; we confirm it within 1 working day.</p>

        <h2>Prices</h2>
        <table className="data-table">
          <thead><tr><th>Patients linked at the same time</th><th>Price per physiotherapist</th></tr></thead>
          <tbody>
            {PLANS.map((plan, i) => (
              <tr key={plan.price}><td>{planLabel(plan, i)}</td><td>${plan.price} per month</td></tr>
            ))}
          </tbody>
        </table>
        <p>Prices are in US dollars. Each party pays its own bank or transfer fees. If a tax applies, it is shown on the invoice. An institution pays the same price for each of its physiotherapists unless we agree otherwise in writing.</p>

        <h2>Regional discount</h2>
        <p>Where you practise sets a discount from 0% (Beirut) to 50% (Akkar), based on typical clinic prices and need in the region: D = min(50%, 0.5 × (1 − P / 35) + 0.3 × N), rounded to the nearest 5%, where P is the region&rsquo;s typical session price in dollars and N a need score from 0 to 1. Your workplace proof confirms the region.</p>

        <h2>Financial aid</h2>
        <ul>
          <li>Five tracks add to the regional discount: early career (+30%, once), income hardship (+10 to +40%), war or displacement (+20 to +30%), community care pledge (+20%) and sponsored seats (up to 100%, paid by an NGO, the Ministry of Public Health, the OPTL or a university).</li>
          <li>The total discount is capped at 75%, and the price never goes below $6 a month, unless a sponsor pays for your seat.</li>
          <li>We decide within 5 working days. Totals above 50% need a second reviewer. Aid lasts 6 months and is renewed with fresh proof.</li>
        </ul>

        <h2>Paying a year ahead, pilot and referrals</h2>
        <ul>
          <li>Pay 12 months ahead for the price of 10.</li>
          <li>Pilot physiotherapists get their first month free, then half price for 12 months.</li>
          <li>Refer another physiotherapist with your public ID: you both get one free month once they are verified.</li>
        </ul>

        <h2>Billing</h2>
        <ul>
          <li>You are billed monthly, in advance, from the day your subscription starts.</li>
          <li>Your plan depends on how many patients are linked to you at the same time. If you go above your plan&rsquo;s limit, we will ask you to move to the next plan from your next billing month. We never charge for past months.</li>
          <li>Moving to a bigger plan takes effect straight away; the new price starts from your next billing month. Moving to a smaller plan takes effect from your next billing month, as long as your patients fit within it.</li>
          <li>You cannot link more patients than your plan allows; choose a bigger plan first in Plan and billing.</li>
        </ul>

        <h2>Cancelling</h2>
        <ul>
          <li>You can cancel at any time by emailing {mailto(B.email)}. There is no minimum period and no cancellation fee.</li>
          <li>Cancellation takes effect at the end of the month you have already paid for. You keep full access until then and are not charged again.</li>
          <li>After that, we may limit your account so you cannot link new patients or assign exercises until you subscribe again. Your patients keep their free accounts and their own results.</li>
        </ul>

        <h2>Refunds</h2>
        <ul>
          <li><b>First payment guarantee:</b> if you are new to {B.name}, you can get a full refund of your first payment by asking within {P.moneyBackDays} days of paying it.</li>
          <li><b>Always refunded:</b> duplicate payments, billing mistakes, and any charge made after your cancellation took effect.</li>
          <li><b>Long outages:</b> if {B.name} is unavailable for more than {P.outageHours} hours in a row because of a problem on our side, we refund or credit those days, pro rata, if you ask.</li>
          <li><b>If we end the service</b> or close your account without you breaking the <Link to="/terms">Terms</Link>, we refund the unused part of the month you paid for.</li>
          <li>Otherwise, months that have already started are not refunded, including when you cancel part-way through a month.</li>
          <li>Accounts closed because they broke the Terms are not refunded for the current month.</li>
        </ul>

        <h2>How to ask for a refund</h2>
        <p>Email {mailto(B.email)} within {P.refundRequestDays} days of the payment, with your name and the payment date. We reply within {P.refundReplyDays} business days, and pay approved refunds within {P.refundPayDays} days, using the same method you paid with where possible.</p>

        <h2>Late payment</h2>
        <p>If an invoice is not paid within {P.latePaymentDays} days of its due date, we may limit your account to viewing only until it is paid. We never delete patients&rsquo; data because of a late payment.</p>

        <h2>Price changes</h2>
        <p>We will email you at least {P.priceNoticeDays} days before a price change. The new price applies from your first billing month after the notice, and you can cancel before then.</p>

        <h2>Your legal rights</h2>
        <p>Nothing in this policy limits any right you have under the consumer-protection laws that apply to you.</p>
      </>
    ),
  },

  cookies: {
    title: 'Cookies and storage',
    Body: () => (
      <>
        <p>{B.name} sets <b>no cookies</b> and uses no analytics, advertising or third-party trackers. It saves a few items in your browser&rsquo;s local storage, only so the features you use work:</p>
        <table className="data-table">
          <thead><tr><th>Item</th><th>What it is for</th><th>When it is removed</th></tr></thead>
          <tbody>
            <tr><td><code>authToken</code></td><td>Keeps you logged in</td><td>When you log out, or when the login expires</td></tr>
            <tr><td><code>pendingSessions</code></td><td>Exercise results saved while you were offline, so they can be sent later</td><td>As soon as they are sent</td></tr>
            <tr><td><code>appLanguage</code></td><td>The language you chose for the app</td><td>When you clear your browser data</td></tr>
            <tr><td><code>coachLanguage</code></td><td>The coach language you chose</td><td>When you clear your browser data</td></tr>
            <tr><td><code>storageNoticeSeen</code></td><td>Remembers that you closed the storage notice</td><td>When you clear your browser data</td></tr>
          </tbody>
        </table>
        <p>These items are strictly necessary for the service you asked for, so we do not ask for consent to use them. If we ever add optional cookies or analytics, we will ask for your consent first and you will be able to refuse.</p>
        <p>You can delete these items at any time in your browser settings (for this site: clear site data). You will then be logged out, and any results not yet sent will be lost.</p>
      </>
    ),
  },

  accessibility: {
    title: 'Accessibility',
    Body: () => (
      <>
        <p>We want everyone, including people in pain, older people and people with disabilities, to be able to use {B.name}. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>
        <h2>What we have done</h2>
        <ul>
          <li>Large default text (18px), high-contrast colours, and buttons at least 44 pixels tall.</li>
          <li>Everything can be used with a keyboard, with a clearly visible focus outline.</li>
          <li>Form fields have visible labels, and errors are explained in words, not only in colour.</li>
          <li>The exercise coach speaks its feedback, so you don&rsquo;t need to look at the screen.</li>
          <li>Animations are reduced if your device is set to reduce motion.</li>
          <li>The app, the exercise coach and these policies are available in eight languages: Arabic (right-to-left), Western Armenian, English, French, Spanish, German, Italian and Turkish.</li>
        </ul>
        <h2>Known limitations</h2>
        <ul>
          <li>The exercise coach needs a camera and enough of your body in view to measure angles.</li>
          <li>A few rare technical messages from the server, which only appear if something goes wrong inside the app, are in English only.</li>
          <li>The site has not yet been audited by an independent accessibility expert.</li>
        </ul>
        <h2>Tell us about a problem</h2>
        <p>If something is hard to use, email {mailto(B.email)} and say which page and what happened. We will reply and work on a fix.</p>
      </>
    ),
  },
}
