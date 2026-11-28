// =============================================================================
// deploy.js — settings that differ between running locally and hosting
// (backend on Render, website on Vercel).
//
// These are functions, not constants, because .env is loaded in server.js
// after the imports have already run.
// =============================================================================

const DEV_ORIGIN = 'http://localhost:5173'

// The website address(es) allowed to call this API, from CLIENT_ORIGIN.
// Several can be given, separated by commas, e.g.
//   CLIENT_ORIGIN=https://rehabvision.vercel.app,https://www.rehabvision.com
// A trailing "/" is removed, because browsers send the origin without one.
export function clientOrigins() {
  const list = (process.env.CLIENT_ORIGIN || DEV_ORIGIN)
    .split(',')
    .map((s) => s.trim().replace(/\/+$/, ''))
    .filter(Boolean)
  return list.length ? list : [DEV_ORIGIN]
}

// The main website address: the first one in CLIENT_ORIGIN.
// Used to build links in emails (e.g. the password reset link).
export function clientUrl() {
  return clientOrigins()[0]
}

// Hosts like Render pass every request through their own proxy, so without
// this the server sees the proxy's address instead of the visitor's, and all
// visitors would share one rate-limit counter. Render sets RENDER=true and
// Vercel sets VERCEL=1 on their servers, so this turns on automatically
// there. TRUST_PROXY overrides it: "false", "true", or a number of proxies.
export function trustProxySetting() {
  const v = process.env.TRUST_PROXY?.trim()
  if (v) {
    if (v === 'true') return true
    if (v === 'false') return false
    if (/^\d+$/.test(v)) return Number(v)
    return v // e.g. "loopback" (see Express "trust proxy" docs)
  }
  return process.env.RENDER === 'true' || Boolean(process.env.VERCEL)
}
