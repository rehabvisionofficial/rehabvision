// =============================================================================
// server.js — entry point of the backend (the API the website talks to).
//
// Its job: accounts and login (patients + physiotherapists), linking patients
// to their physio, storing the exercises a physio assigns, and saving the
// exercise results the patient's phone sends at the end of a session.
// The pose tracking itself happens in the browser, NOT here.
// =============================================================================

import dotenv from 'dotenv'
// Read secrets/settings from the .env file into process.env
// (MONGO_URI, JWT_SECRET, PORT, ...). The values are only read later, when
// the server starts, so they are loaded in time.
dotenv.config({ quiet: true })

import express from 'express'
import cors from 'cors'

import connectDB from './config/db.js'
import { clientOrigins, trustProxySetting } from './config/deploy.js'
import rateLimiter from './middleware/rateLimiter.js'
import authRoutes from './routes/auth.js'
import exercisesRoutes from './routes/exercises.js'
import patientRoutes from './routes/patient.js'
import physioRoutes from './routes/physio.js'
import sessionsRoutes from './routes/sessions.js'
import physioAccountRoutes from './routes/physioAccount.js'
import docsRoutes from './routes/docs.js'
import { fileStoreEnabled } from './storage/fileStore.js'
import adminRoutes from './routes/admin.js'

export const app = express()
const PORT = process.env.PORT || 5001

// --- Middleware: runs on every request before it reaches a route -----------

// CORS: only allow the website (Vite dev server by default, the Netlify site
// when hosted; see CLIENT_ORIGIN) to call this API from a browser. Other
// sites' pages are blocked.
app.use(cors({ origin: clientOrigins() }))

// Behind a host's proxy (Render, or Vercel): use the visitor's real IP, so
// each visitor gets their own rate-limit counter. See config/deploy.js.
app.set('trust proxy', trustProxySetting())

// Basic protection against too many requests from one IP
app.use(rateLimiter)

// (Document uploads are multipart forms, read by multer in routes/docs.js.)
// Parse JSON request bodies so routes can read req.body
app.use(express.json({ limit: '200kb' }))

// On Vercel there is no start() step (see the bottom of this file), so connect
// to the database on the first request instead. The connection is then reused.
let dbReady = null
if (process.env.VERCEL) {
  app.use(async (_req, _res, next) => {
    try {
      if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set in Vercel environment variables')
      dbReady ??= connectDB()
      await dbReady
      next()
    } catch (err) {
      dbReady = null // try again on the next request
      next(err)
    }
  })
}

// --- Routes ------------------------------------------------------------------

// Quick "is the server alive?" check: open http://localhost:5001/api/health
app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)          // register, login, who am I
app.use('/api/exercises', exercisesRoutes) // the exercise catalog
app.use('/api/patient', patientRoutes)    // patient: find/link physio
app.use('/api/physio', physioRoutes)      // physio: patients, exercises, flags
app.use('/api/sessions', sessionsRoutes)  // patient: save/list sessions
app.use('/api/physio', physioAccountRoutes) // physio: profile, verification, aid, billing
app.use('/api/docs', docsRoutes)          // physio: verification and aid documents
app.use('/api/admin', adminRoutes)        // review team: verification, aid, payments

// Unknown /api route
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }))

// Any unexpected error: log it, and send a generic message (no internals)
app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' })
  }
  console.error(err)
  res.status(500).json({ error: 'Something went wrong on the server' })
})

// --- Start -------------------------------------------------------------------

// Connect to the database first; only start accepting requests once that works.
// If it fails (e.g. MONGO_URI missing or wrong), print why and stop.
async function start() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.startsWith('[')) {
    throw new Error('JWT_SECRET is not set. Copy .env.example to .env and fill it in.')
  }
  await connectDB().then(() => console.log('CONNECTED'))
  if (!fileStoreEnabled()) {
    console.warn('File storage (R2) is not configured: uploaded documents are kept in MongoDB. See backend/.env.example.')
  }
  // Express 5 also calls this when listening FAILS (e.g. port already in use),
  // so check for an error instead of always printing "running"
  app.listen(PORT, (err) => {
    if (err) {
      console.error(
        err.code === 'EADDRINUSE'
          ? `Port ${PORT} is already in use: another copy of the server is probably running. Stop it or change PORT in .env.`
          : `Could not start the server: ${err.message}`,
      )
      process.exit(1)
    }
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

// Locally (npm run dev / npm start) we run our own server. On Vercel, Vercel
// runs the app itself as a function, using the default export below.
if (!process.env.VERCEL) {
  start().catch((err) => {
    console.error('Failed to start server:', err.message)
    process.exit(1)
  })
}

export default app
