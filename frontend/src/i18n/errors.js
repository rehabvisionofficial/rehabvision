// =============================================================================
// errors.js — shows server and network error messages in the app language.
// The backend answers in English; each known message is matched here and
// replaced. Unknown messages are shown as they are (in English).
// If you change a message in the backend, update its pattern here.
// =============================================================================

const PATTERNS = [
  [/^Can't reach the server/, 'cantReach'],
  [/^Request failed \((\d+)\)$/, 'requestFailed'],
  [/^An account with this email already exists$/, 'emailTaken'],
  [/^Email and password are required$/, 'emailPasswordRequired'],
  [/^IDs look like PT-ABC234$/, 'idFormat'],
  [/^Invalid email or password$/, 'invalidLogin'],
  [/^Not found$/, 'notFound'],
  [/^Password must be 8–72 characters$/, 'passwordLength'],
  [/^Patient not found$/, 'patientNotFound'],
  [/^Please enter a valid email address$/, 'validEmail'],
  [/^Please enter your name/, 'nameRequired'],
  [/^Please log in$/, 'pleaseLogIn'],
  [/^Your session has expired/, 'sessionExpired'],
  [/^Something went wrong on the server$/, 'serverError'],
  [/^Too many requests/, 'tooManyRequests'],
  [/^Too many login attempts/, 'tooManyLogins'],
  [/^No physiotherapist found with that ID$/, 'noPhysioFound'],
  [/^Only \w+ accounts can do this$/, 'onlyRole'],
  [/^A patient can have at most (\d+) exercises$/, 'maxExercises'],
  [/^This reset link is invalid\. Please request a new one\.$/, 'resetInvalid'],
  [/^This reset link is invalid or has expired/, 'resetExpired'],
  [/^Your password was changed, please log in again$/, 'passwordChanged'],
  [/^Too many password reset requests/, 'tooManyResets'],
  [/^A session needs at least one rep$/, 'needOneRep'],
  [/^Unknown region$/, 'regionUnknown'],
  [/^Enter a valid phone number$/, 'phoneInvalid'],
  [/^Clinic name is too long$/, 'clinicLong'],
  [/^Unknown language$/, 'langUnknown'],
  [/^Documents under review cannot be (changed|removed)$/, 'reviewLocked'],
  [/^Please agree to have your documents checked$/, 'consentNeeded'],
  [/^Your documents are already being reviewed$/, 'alreadyReview'],
  [/^Add your region and phone number first$/, 'regionPhoneFirst'],
  [/^Missing documents:/, 'missingDocs'],
  [/^You cannot apply for aid until the ban ends$/, 'aidBanned'],
  [/^Your application is already being reviewed$/, 'aidPending'],
  [/^Send your verification documents first$/, 'verifyFirst'],
  [/^Choose at least one aid track$/, 'chooseTrack'],
  [/^Early-career aid can only be given once$/, 'earlyOnce'],
  [/^Please confirm the declaration/, 'declarationNeeded'],
  [/^Unknown plan$/, 'planUnknown'],
  [/^This plan allows (\d+) patients; you have (\d+)$/, 'planTooSmall'],
  [/^Choose Whish or OMT$/, 'chooseMethod'],
  [/^Enter the transfer reference/, 'refInvalid'],
  [/^Your account must be verified before paying$/, 'verifyBeforePay'],
  [/^Upload a photo \(JPG, PNG, WebP\) or a PDF$/, 'badFile'],
  [/^Files must be under 4 MB$/, 'fileSize'],
  [/^Too many files of this type$/, 'tooManyFiles'],
  [/^This physiotherapist can't take new patients right now$/, 'physioFull'],
  [/^No physiotherapist found with that referral ID$/, 'referralUnknown'],
  [/^Only reviewers can do this$/, 'onlyReviewers'],
  [/^Invalid decision$/, 'invalidDecision'],
  [/^Nothing to review$/, 'nothingToReview'],
  [/^Aid must be 0–75%$/, 'aidRange'],
  [/^Sponsor share must be 0–100%/, 'sponsorRange'],
  [/^No free months to use$/, 'noFreeMonths'],
  [/^Exercise (\d+): invalid$/, 'exInvalid'],
  [/^Exercise (\d+): unknown exercise$/, 'exUnknown'],
  [/^Exercise (\d+): side must be left or right$/, 'exSide'],
  [/^Exercise (\d+): this exercise and side is already in the list$/, 'exDuplicate'],
  [/^Exercise (\d+): (startAngle|targetAngle|permittedMin|permittedMax) must be a number from 0 to 180$/, 'exAngle'],
  [/^Exercise (\d+): the permitted minimum must be lower than the maximum$/, 'exMinMax'],
  [/^Exercise (\d+): the start angle must be inside the permitted range$/, 'exStartRange'],
  [/^Exercise (\d+): the target angle must be inside the permitted range$/, 'exTargetRange'],
  [/^Exercise (\d+): start and target must be at least (\d+)° apart$/, 'exApart'],
  [/^Exercise (\d+): repetitions must be a whole number from 1 to 100$/, 'exReps'],
  [/^Exercise (\d+): please write when the patient should stop/, 'exStop'],
  [/^Exercise (\d+): confirm clinical clearance before assigning$/, 'exClearance'],
]

export function translateError(message, t) {
  if (!message) return message
  for (const [pattern, key] of PATTERNS) {
    const match = message.match(pattern)
    if (!match) continue
    const text = t.err[key]
    if (typeof text !== 'function') return text
    const args = match.slice(1)
    if (key === 'exAngle') args[1] = t.err.fields[args[1]] // field name in the app language
    return text(...args)
  }
  return message
}
