// =============================================================================
// auth.js — create an account, log in, and "who am I?".
//   POST /api/auth/register  { name, email, password, role }  -> { token, user }
//   POST /api/auth/login     { email, password }              -> { token, user }
//   GET  /api/auth/me        (logged in)                      -> { user }
//   POST /api/auth/forgot-password { email }                  -> { message }
//   POST /api/auth/reset-password  { token, password }        -> { token, user }
// =============================================================================

import { createHash, randomBytes, randomInt } from 'node:crypto'
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { isAdmin, requireAuth, signToken } from '../middleware/auth.js'
import { authLimiter, resetLimiter } from '../middleware/rateLimiter.js'
import { sendPasswordResetEmail } from '../config/mailer.js'
import { clientUrl } from '../config/deploy.js'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BCRYPT_ROUNDS = 10

// Used to compare against when an email doesn't exist, so a login attempt
// takes the same time whether or not the account exists (hides which emails
// are registered).
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', BCRYPT_ROUNDS)

// Physio public IDs look like "PT-7K3Q9X". No 0/O/1/I, so they're easy to read out.
const ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
function makePublicId() {
  let id = 'PT-'
  for (let i = 0; i < 6; i++) id += ID_ALPHABET[randomInt(ID_ALPHABET.length)]
  return id
}

// The user as the browser should see it. For patients, includes their
// physio's name and public ID (not the physio's email or other details).
export async function publicUser(user) {
  if (user.role === 'patient' && user.physio) {
    await user.populate('physio', 'name publicId')
  }
  return { ...user.toJSON(), isAdmin: isAdmin(user) }
}

router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { name, email, password, role, referralId } = req.body ?? {}

    if (typeof name !== 'string' || !name.trim() || name.trim().length > 100) {
      return res.status(400).json({ error: 'Please enter your name (max 100 characters)' })
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > 254) {
      return res.status(400).json({ error: 'Please enter a valid email address' })
    }
    // bcrypt only uses the first 72 bytes of a password, so cap it there
    if (typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password) > 72) {
      return res.status(400).json({ error: 'Password must be 8–72 characters' })
    }
    if (role !== 'patient' && role !== 'physio') {
      return res.status(400).json({ error: 'Role must be "patient" or "physio"' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ error: 'An account with this email already exists' })
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
    const base = { name: name.trim(), email: normalizedEmail, passwordHash, role }
    if (role === 'patient') base.exercises = []
    // Physio-to-physio referral: both get a free month once the new physio is verified
    if (role === 'physio' && typeof referralId === 'string' && referralId.trim()) {
      const referrer = await User.findOne({ publicId: referralId.trim().toUpperCase(), role: 'physio' }, '_id')
      if (!referrer) return res.status(400).json({ error: 'No physiotherapist found with that referral ID' })
      base.referredBy = referrer._id
    }

    // Physios get a unique public ID. A clash is very unlikely (32^6 ≈ 1 billion
    // options), but if it happens we just try another one.
    let user
    for (let attempt = 0; attempt < 5 && !user; attempt++) {
      try {
        user = await User.create(role === 'physio' ? { ...base, publicId: makePublicId() } : base)
      } catch (e) {
        if (e.code === 11000 && e.keyPattern?.publicId) continue // ID clash: retry
        if (e.code === 11000 && e.keyPattern?.email) {
          return res.status(409).json({ error: 'An account with this email already exists' })
        }
        throw e
      }
    }
    if (!user) throw new Error('Could not generate a unique public ID')

    res.status(201).json({ token: signToken(user), user: await publicUser(user) })
  } catch (e) {
    next(e)
  }
})

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {}
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() })
    // Always run bcrypt (see DUMMY_HASH above), then give the same error
    // for "no such email" and "wrong password".
    const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH)
    if (!user || !ok) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    res.json({ token: signToken(user), user: await publicUser(user) })
  } catch (e) {
    next(e)
  }
})

// --- Forgot password ---------------------------------------------------------

const RESET_MINUTES = 30
const hashToken = (token) => createHash('sha256').update(token).digest('hex')

// Always answers the same way, whether or not the email has an account, so
// this can't be used to find out who is registered. The email is sent in the
// background so the response time doesn't give it away either.
router.post('/forgot-password', resetLimiter, async (req, res, next) => {
  try {
    const { email, lang } = req.body ?? {}
    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > 254) {
      return res.status(400).json({ error: 'Please enter a valid email address' })
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() })
    if (user) {
      const token = randomBytes(32).toString('hex')
      user.resetTokenHash = hashToken(token)
      user.resetTokenExpires = new Date(Date.now() + RESET_MINUTES * 60 * 1000)
      await user.save()

      const link = `${clientUrl()}/reset-password?token=${token}`
      // lang is checked against the known languages inside (anything else -> English)
      sendPasswordResetEmail(user, link, RESET_MINUTES, lang).catch((e) =>
        console.error('Could not send password reset email:', e.message),
      )
    }

    res.json({ message: 'If an account exists for that email, a reset link is on its way.' })
  } catch (e) {
    next(e)
  }
})

// Uses the normal login limit: the strict one is only needed where emails are
// sent, and the 64-character reset code can't be guessed anyway.
router.post('/reset-password', authLimiter, async (req, res, next) => {
  try {
    const { token, password } = req.body ?? {}
    if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) {
      return res.status(400).json({ error: 'This reset link is invalid. Please request a new one.' })
    }
    if (typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password) > 72) {
      return res.status(400).json({ error: 'Password must be 8–72 characters' })
    }

    const user = await User.findOne({
      resetTokenHash: hashToken(token),
      resetTokenExpires: { $gt: new Date() },
    })
    if (!user) {
      return res.status(400).json({ error: 'This reset link is invalid or has expired. Please request a new one.' })
    }

    // Save the new password and use up the link (it works only once).
    // Back-date passwordChangedAt by 1s so the token we return below
    // (issued in this same second) isn't treated as an old one.
    user.passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
    user.resetTokenHash = null
    user.resetTokenExpires = null
    user.passwordChangedAt = new Date(Date.now() - 1000)
    await user.save()

    // Log them straight in
    res.json({ token: signToken(user), user: await publicUser(user) })
  } catch (e) {
    next(e)
  }
})

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    res.json({ user: await publicUser(req.user) })
  } catch (e) {
    next(e)
  }
})

export default router
