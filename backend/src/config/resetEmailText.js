// =============================================================================
// resetEmailText.js — the password-reset email in each app language (the same
// 8 as the website: frontend/src/i18n/AppLanguage.jsx). Unknown -> English.
// Have every translation checked by a native speaker.
// =============================================================================

const TEXT = {
  en: {
    dir: 'ltr',
    subject: 'Reset your RehabVision password',
    hi: (name) => `Hi ${name},`,
    asked: 'Someone (hopefully you) asked to reset the password for your RehabVision account.',
    expires: (m) => `This link works once and expires in ${m} minutes.`,
    button: 'Choose a new password',
    paste: 'Or paste this into your browser:',
    ignore: "If you didn't ask for this, you can ignore this email. Your password won't change.",
  },
  fr: {
    dir: 'ltr',
    subject: 'Réinitialisez votre mot de passe RehabVision',
    hi: (name) => `Bonjour ${name},`,
    asked: 'Quelqu’un (vous, nous l’espérons) a demandé à réinitialiser le mot de passe de votre compte RehabVision.',
    expires: (m) => `Ce lien ne fonctionne qu’une fois et expire dans ${m} minutes.`,
    button: 'Choisir un nouveau mot de passe',
    paste: 'Ou collez ceci dans votre navigateur :',
    ignore: 'Si vous n’êtes pas à l’origine de cette demande, ignorez cet e-mail. Votre mot de passe ne changera pas.',
  },
  ar: {
    dir: 'rtl',
    subject: 'إعادة تعيين كلمة مرور RehabVision',
    hi: (name) => `مرحباً ${name}،`,
    asked: 'طلب أحدهم (نأمل أن تكون أنت) إعادة تعيين كلمة المرور لحسابك على RehabVision.',
    expires: (m) => `يعمل هذا الرابط مرة واحدة وتنتهي صلاحيته خلال ${m} دقيقة.`,
    button: 'اختر كلمة مرور جديدة',
    paste: 'أو الصق هذا الرابط في المتصفح:',
    ignore: 'إذا لم تطلب ذلك، يمكنك تجاهل هذه الرسالة. لن تتغير كلمة المرور.',
  },
  hyw: {
    dir: 'ltr',
    subject: 'Վերակայեցէք ձեր RehabVision-ի գաղտնաբառը',
    hi: (name) => `Բարեւ ${name},`,
    asked: 'Մէկը (յուսանք՝ դուք) խնդրեց վերակայել ձեր RehabVision-ի հաշիւին գաղտնաբառը։',
    expires: (m) => `Այս յղումը մէկ անգամ կը գործէ եւ կը սպառի ${m} վայրկեանէն։`,
    button: 'Ընտրել նոր գաղտնաբառ',
    paste: 'Կամ պատճէնեցէք ասիկա ձեր դիտարկիչին մէջ՝',
    ignore: 'Եթէ դուք չէք խնդրած, կրնաք անտեսել այս նամակը։ Ձեր գաղտնաբառը պիտի չփոխուի։',
  },
  es: {
    dir: 'ltr',
    subject: 'Restablece tu contraseña de RehabVision',
    hi: (name) => `Hola, ${name}:`,
    asked: 'Alguien (esperamos que tú) ha pedido restablecer la contraseña de tu cuenta de RehabVision.',
    expires: (m) => `Este enlace funciona una sola vez y caduca en ${m} minutos.`,
    button: 'Elegir una contraseña nueva',
    paste: 'O pega esto en tu navegador:',
    ignore: 'Si no lo has pedido tú, ignora este correo. Tu contraseña no cambiará.',
  },
  de: {
    dir: 'ltr',
    subject: 'Setze dein RehabVision-Passwort zurück',
    hi: (name) => `Hallo ${name},`,
    asked: 'Jemand (hoffentlich du) hat darum gebeten, das Passwort deines RehabVision-Kontos zurückzusetzen.',
    expires: (m) => `Dieser Link funktioniert einmal und läuft in ${m} Minuten ab.`,
    button: 'Neues Passwort wählen',
    paste: 'Oder füge dies in deinen Browser ein:',
    ignore: 'Wenn du das nicht angefordert hast, kannst du diese E-Mail ignorieren. Dein Passwort bleibt unverändert.',
  },
  it: {
    dir: 'ltr',
    subject: 'Reimposta la tua password di RehabVision',
    hi: (name) => `Ciao ${name},`,
    asked: 'Qualcuno (speriamo tu) ha chiesto di reimpostare la password del tuo account RehabVision.',
    expires: (m) => `Questo link funziona una sola volta e scade tra ${m} minuti.`,
    button: 'Scegli una nuova password',
    paste: 'Oppure incolla questo nel browser:',
    ignore: 'Se non l’hai chiesto tu, ignora questa email. La tua password non cambierà.',
  },
  tr: {
    dir: 'ltr',
    subject: 'RehabVision şifrenizi sıfırlayın',
    hi: (name) => `Merhaba ${name},`,
    asked: 'Birisi (umarız sizsiniz) RehabVision hesabınızın şifresini sıfırlamak istedi.',
    expires: (m) => `Bu bağlantı yalnızca bir kez çalışır ve ${m} dakika içinde geçerliliğini yitirir.`,
    button: 'Yeni şifre belirle',
    paste: 'Ya da bunu tarayıcınıza yapıştırın:',
    ignore: 'Bunu siz istemediyseniz bu e-postayı yok sayabilirsiniz. Şifreniz değişmeyecek.',
  },
}

// lang comes from the request body: only the table's own keys count
// (so "constructor", "__proto__", numbers etc. fall back to English)
export const resetEmailText = (lang) => (typeof lang === 'string' && Object.hasOwn(TEXT, lang) ? TEXT[lang] : TEXT.en)
