// =============================================================================
// api.js — every call from the website to the backend goes through here.
// It adds the login token, turns errors into readable messages, and keeps
// sessions that couldn't be sent (offline) so they can be sent later.
// =============================================================================

const TOKEN_KEY = "authToken";
const PENDING_KEY = "pendingSessions";

// Browser storage can be blocked (e.g. private mode), so wrap every access
function storageGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function storageSet(key, value) {
  try {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch { /* ignore */ }
}

export const getToken = () => storageGet(TOKEN_KEY);
export const setToken = (token) => storageSet(TOKEN_KEY, token);

// An error from the API, with the HTTP status (0 = couldn't reach the server)
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Where the backend lives.
//  - Locally: empty, so requests go to "/api/..." on the website itself, and
//    vite.config.js forwards them to the backend on port 5001.
//  - Hosted: set VITE_API_URL to the backend's address when building
//    (e.g. https://rehabvision-api.onrender.com in Vercel's environment
//    variables). It's built into the website, so it is not a secret.
const API_BASE = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");

// api("/auth/login", { method: "POST", body: {...} }) -> parsed JSON
// body can also be a FormData (file uploads): it is sent as-is, and the
// browser sets the multipart Content-Type itself.
export async function api(path, { method = "GET", body } = {}) {
  const headers = {};
  const isForm = body instanceof FormData;
  if (body !== undefined && !isForm) headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_BASE}/api${path}`, {
      method,
      headers,
      body: body === undefined || isForm ? body : JSON.stringify(body),
    });
  } catch {
    throw new ApiError("Can't reach the server. Check your internet connection.", 0);
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(data?.error || `Request failed (${res.status})`, res.status);
  }
  return data;
}

// ---- Sessions, with an offline queue ----------------------------------------

function readQueue() {
  try { return JSON.parse(storageGet(PENDING_KEY) || "[]"); } catch { return []; }
}
function writeQueue(queue) {
  storageSet(PENDING_KEY, queue.length ? JSON.stringify(queue) : null);
}

// Saves a finished session. If the server can't be reached (or has a
// temporary problem), the session is kept on this device and sent later.
// Returns the saved session's id, or null if it was queued.
export async function saveSession(userId, summary) {
  try {
    const data = await api("/sessions", { method: "POST", body: summary });
    return data.session._id;
  } catch (e) {
    // 400 = the server says the data is invalid; retrying won't help
    if (e.status === 400) throw e;
    writeQueue([...readQueue(), { userId, summary }]);
    return null;
  }
}

// Adds the pain score / incident note to a session saved by saveSession:
// on the server if it was saved, else to the copy still queued on this device.
export async function addSessionReport(userId, sessionId, report) {
  if (sessionId) return api(`/sessions/${sessionId}/report`, { method: "PATCH", body: report });
  const queue = readQueue();
  for (let i = queue.length - 1; i >= 0; i--) {
    if (queue[i].userId === userId) {
      queue[i].summary = { ...queue[i].summary, ...report };
      break;
    }
  }
  writeQueue(queue);
}

// Tries to send this user's queued sessions. Others' sessions on a shared
// device are left alone. Returns how many were sent.
// If a send is already running, callers share it, so nothing is sent twice.
let flushing = null;
export function flushPendingSessions(userId) {
  if (!flushing) {
    flushing = doFlush(userId).finally(() => { flushing = null; });
  }
  return flushing;
}

async function doFlush(userId) {
  const queue = readQueue();
  const keep = [];
  let sent = 0;
  for (const item of queue) {
    if (item.userId !== userId) { keep.push(item); continue; }
    try {
      await api("/sessions", { method: "POST", body: item.summary });
      sent += 1;
    } catch (e) {
      if (e.status !== 400) keep.push(item); // invalid ones are dropped
    }
  }
  writeQueue(keep);
  return sent;
}

// A private file (verification/aid document) as a Blob, sent with the login token
export async function apiBlob(path) {
  const token = getToken();
  let res;
  try {
    res = await fetch(`${API_BASE}/api${path}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  } catch {
    throw new ApiError("Can't reach the server. Check your internet connection.", 0);
  }
  if (!res.ok) throw new ApiError(`Request failed (${res.status})`, res.status);
  return res.blob();
}
