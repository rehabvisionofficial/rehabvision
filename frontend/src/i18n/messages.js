// =============================================================================
// messages.js — every piece of text the exercise coach says or shows, in each
// language.
//
// Each language has:
//   name        -> how the language appears in the picker (in its own language)
//   speechLang  -> voice language for the browser's text-to-speech
//   dir         -> "rtl" for right-to-left languages (Arabic), else "ltr"
//   speech      -> what the coach says out loud during the exercise
//   ui          -> on-screen text on the exercise screen
//   exercises   -> exercise names (keys match the ids in the exercise catalog JSON)
//
// To add a language: copy the "en" block, change the key (e.g. "pt"), and
// translate every string. Missing strings fall back to English.
// =============================================================================

import { PATIENT_TEXT } from "./patientText";

export const LANGUAGES = {
  ar: {
    name: "العربية",
    speechLang: "ar-LB", // Lebanese Arabic; falls back to any Arabic voice
    dir: "rtl",
    speech: {
      tooFar: "خفّف شوي، ما تزيد عن الحد",       // "ease off a bit, don't go past the limit"
      notEnough: "كمّل شوي كمان",                // "keep going a little more"
      good: "ممتاز",                              // "excellent"
      notVisible: "رجاع لورا، لازم شوفك كلّك",  // "step back, I need to see all of you"
      done: "برافو، خلّصت كل التكرارات",         // "well done, you finished all the reps"
    },
    ui: {
      language: "اللغة",
      angle: "الزاوية",
      target: "الهدف",
      reps: "التكرارات",
      finish: "إنهاء الجلسة",
      back: "رجوع",
      left: "شمال",
      right: "يمين",
      loading: "عم يتحمّل النموذج…",
      moveIntoView: "تحرّك ليبيّن كل الطرف بالكاميرا",
      pastSafe: "تجاوزت الحد الآمن!",
      targetReached: "برافو، خلّصت كل التكرارات! فيك تنهي الجلسة.",
      modelError: "ما قدرنا نحمّل النموذج: ",
      saved: (good, total) => `انحفظت الجلسة: ${good}/${total} تكرارات صحيحة`,
      tracking: "عم نتابعك",
      findingYou: "وقّف قدّام الكاميرا",
      voiceOn: "الصوت شغّال",
      voiceOff: "الصوت مسكّر",
      safeRange: "الحد الآمن",
      leaveTitle: "بدّك تطلع من التمرين؟",
      leaveMessage: "التكرارات اللي عملتها ما رح تنحفظ.",
      leave: "اطلع",
      stay: "كمّل",
    },
    exercises: {
      supine_heel_slide: "سحب الكعب (ثني الركبة وانت ممدّد)",
      seated_knee_extension: "فرد الركبة وانت قاعد",
      standing_shoulder_forward_flexion: "رفع الإيد لقدّام وانت واقف",
      seated_elbow_flexion: "ثني الكوع",
      standing_bicep_curl: "تمرين الباي (ثني الكوع مع وزن)",
      standing_hip_abduction: "رفع الإجر عالجنب وانت واقف",
    },
  },

  // Western Armenian (ISO 639-3 "hyw"), written in traditional orthography.
  // Browsers have no Western Armenian voice, so speech uses an Armenian (hy)
  // voice if the device has one; the words are still Western Armenian.
  hyw: {
    name: "Արեւմտահայերէն",
    speechLang: "hy-AM",
    dir: "ltr",
    speech: {
      tooFar: "Քիչ մը մեղմացուր, սահմանէդ մի՛ անցնիր",       // "ease off a bit, don't go past your limit"
      notEnough: "Քիչ մըն ալ շարունակէ",                      // "keep going a little more"
      good: "Շատ լաւ",                                        // "very good"
      notVisible: "Ետ քաշուէ, պէտք է ամբողջովին տեսնեմ քեզ",  // "step back, I need to see all of you"
      done: "Կեցցե՛ս, բոլոր կրկնութիւնները աւարտեցիր",        // "well done, you finished all the reps"
    },
    ui: {
      language: "Լեզու",
      angle: "Անկիւն",
      target: "Նպատակ",
      reps: "Կրկնութիւններ",
      finish: "Աւարտել նիստը",
      back: "Ետ",
      left: "Ձախ",
      right: "Աջ",
      loading: "Մոտելը կը բեռնուի…",
      moveIntoView: "Տեղաւորուէ այնպէս, որ ամբողջ անդամը երեւի",
      pastSafe: "Ապահով սահմանէդ անդին անցար։",
      targetReached: "Կեցցե՛ս, բոլոր կրկնութիւնները աւարտեցան։ Կրնաս նիստը աւարտել։",
      modelError: "Մոտելը չկրցանք բեռնել – ",
      saved: (good, total) => `Նիստը պահուեցաւ – ${good}/${total} ճիշդ կրկնութիւն`,
    },
    exercises: {
      supine_heel_slide: "Կրունկի սահեցում (ծունկը ծալել՝ պառկած)",
      seated_knee_extension: "Նստած՝ ծունկը երկարել",
      standing_shoulder_forward_flexion: "Կանգնած՝ թեւը առջեւ բարձրացնել",
      seated_elbow_flexion: "Արմուկը ծալել",
      standing_bicep_curl: "Երկգլխանի մկանի վարժութիւն (արմուկը ծալել ծանրութեամբ)",
      standing_hip_abduction: "Կանգնած՝ ոտքը կողքի վրայ բարձրացնել",
    },
  },

  en: {
    name: "English",
    speechLang: "en-US",
    dir: "ltr",
    speech: {
      tooFar: "Ease off a little, don't go past your limit",
      notEnough: "Try to go a little further",
      good: "Excellent",
      notVisible: "Step back, I need to see all of you",
      done: "Well done, you finished all your reps",
    },
    ui: {
      language: "Language",
      angle: "Angle",
      target: "Target",
      reps: "Reps",
      finish: "Finish session",
      back: "Back",
      left: "Left",
      right: "Right",
      loading: "Loading model…",
      moveIntoView: "Move so the whole limb is in view",
      pastSafe: "Past your safe range!",
      targetReached: "Well done, all reps finished! You can finish the session.",
      modelError: "Could not load the pose model: ",
      saved: (good, total) => `Session saved: ${good}/${total} good reps`,
      tracking: "Tracking",
      findingYou: "Step into view",
      voiceOn: "Voice on",
      voiceOff: "Voice off",
      safeRange: "Safe range",
      leaveTitle: "Leave this exercise?",
      leaveMessage: "The reps you've done so far won't be saved.",
      leave: "Leave",
      stay: "Keep going",
    },
    exercises: {
      supine_heel_slide: "Heel slide (knee bend, lying down)",
      seated_knee_extension: "Seated knee extension",
      standing_shoulder_forward_flexion: "Standing shoulder forward raise",
      seated_elbow_flexion: "Elbow bend",
      standing_bicep_curl: "Bicep curl",
      standing_hip_abduction: "Standing hip abduction (side leg raise)",
    },
  },

  fr: {
    name: "Français",
    speechLang: "fr-FR",
    dir: "ltr",
    speech: {
      tooFar: "Doucement, ne dépassez pas la limite",
      notEnough: "Essayez d'aller un peu plus loin",
      good: "Excellent",
      notVisible: "Reculez, je dois vous voir en entier",
      done: "Bravo, vous avez terminé toutes vos répétitions",
    },
    ui: {
      language: "Langue",
      angle: "Angle",
      target: "Objectif",
      reps: "Répétitions",
      finish: "Terminer la séance",
      back: "Retour",
      left: "Gauche",
      right: "Droite",
      loading: "Chargement du modèle…",
      moveIntoView: "Placez-vous pour que tout le membre soit visible",
      pastSafe: "Vous dépassez votre zone de sécurité !",
      targetReached: "Bravo, toutes les répétitions sont faites ! Vous pouvez terminer la séance.",
      modelError: "Impossible de charger le modèle : ",
      saved: (good, total) => `Séance enregistrée : ${good}/${total} bonnes répétitions`,
      tracking: "Suivi en cours",
      findingYou: "Placez-vous devant la caméra",
      voiceOn: "Voix activée",
      voiceOff: "Voix coupée",
      safeRange: "Zone sûre",
      leaveTitle: "Quitter cet exercice ?",
      leaveMessage: "Les répétitions faites jusqu'ici ne seront pas enregistrées.",
      leave: "Quitter",
      stay: "Continuer",
    },
    exercises: {
      supine_heel_slide: "Glissement du talon (flexion du genou, allongé)",
      seated_knee_extension: "Extension du genou en position assise",
      standing_shoulder_forward_flexion: "Élévation du bras vers l'avant, debout",
      seated_elbow_flexion: "Flexion du coude",
      standing_bicep_curl: "Curl des biceps",
      standing_hip_abduction: "Abduction de la hanche debout (levée latérale de la jambe)",
    },
  },

  es: {
    name: "Español",
    speechLang: "es-ES",
    dir: "ltr",
    speech: {
      tooFar: "Con calma, no pases tu límite",
      notEnough: "Intenta llegar un poco más lejos",
      good: "Excelente",
      notVisible: "Da un paso atrás, necesito verte entero",
      done: "Muy bien, has terminado todas las repeticiones",
    },
    ui: {
      language: "Idioma",
      angle: "Ángulo",
      target: "Objetivo",
      reps: "Repeticiones",
      finish: "Terminar sesión",
      back: "Volver",
      left: "Izquierda",
      right: "Derecha",
      loading: "Cargando modelo…",
      moveIntoView: "Colócate para que se vea toda la extremidad",
      pastSafe: "¡Has pasado tu rango seguro!",
      targetReached: "¡Muy bien, repeticiones completadas! Puedes terminar la sesión.",
      modelError: "No se pudo cargar el modelo: ",
      saved: (good, total) => `Sesión guardada: ${good}/${total} repeticiones buenas`,
      tracking: "Siguiéndote",
      findingYou: "Colócate frente a la cámara",
      voiceOn: "Voz activada",
      voiceOff: "Voz desactivada",
      safeRange: "Rango seguro",
      leaveTitle: "¿Salir de este ejercicio?",
      leaveMessage: "Las repeticiones que has hecho no se guardarán.",
      leave: "Salir",
      stay: "Seguir",
    },
    exercises: {
      supine_heel_slide: "Deslizamiento del talón (flexión de rodilla, tumbado)",
      seated_knee_extension: "Extensión de rodilla sentado",
      standing_shoulder_forward_flexion: "Elevación frontal del hombro de pie",
      seated_elbow_flexion: "Flexión de codo",
      standing_bicep_curl: "Curl de bíceps",
      standing_hip_abduction: "Abducción de cadera de pie (elevación lateral de pierna)",
    },
  },

  de: {
    name: "Deutsch",
    speechLang: "de-DE",
    dir: "ltr",
    speech: {
      tooFar: "Etwas weniger, geh nicht über deine Grenze",
      notEnough: "Versuch, noch ein bisschen weiter zu gehen",
      good: "Ausgezeichnet",
      notVisible: "Geh einen Schritt zurück, ich muss dich ganz sehen",
      done: "Gut gemacht, du hast alle Wiederholungen geschafft",
    },
    ui: {
      language: "Sprache",
      angle: "Winkel",
      target: "Ziel",
      reps: "Wiederholungen",
      finish: "Sitzung beenden",
      back: "Zurück",
      left: "Links",
      right: "Rechts",
      loading: "Modell wird geladen…",
      moveIntoView: "Stell dich so hin, dass die ganze Gliedmaße sichtbar ist",
      pastSafe: "Du bist über deinem sicheren Bereich!",
      targetReached: "Gut gemacht, alle Wiederholungen geschafft! Du kannst die Sitzung beenden.",
      modelError: "Das Modell konnte nicht geladen werden: ",
      saved: (good, total) => `Sitzung gespeichert: ${good}/${total} gute Wiederholungen`,
      tracking: "Erkannt",
      findingYou: "Bitte vor die Kamera stellen",
      voiceOn: "Sprache an",
      voiceOff: "Sprache aus",
      safeRange: "Sicherer Bereich",
      leaveTitle: "Übung verlassen?",
      leaveMessage: "Die bisherigen Wiederholungen werden nicht gespeichert.",
      leave: "Verlassen",
      stay: "Weitermachen",
    },
    exercises: {
      supine_heel_slide: "Fersengleiten (Kniebeugung im Liegen)",
      seated_knee_extension: "Kniestreckung im Sitzen",
      standing_shoulder_forward_flexion: "Arm im Stehen nach vorne heben",
      seated_elbow_flexion: "Ellbogenbeugung",
      standing_bicep_curl: "Bizeps-Curl",
      standing_hip_abduction: "Hüftabduktion im Stehen (Bein seitlich heben)",
    },
  },

  it: {
    name: "Italiano",
    speechLang: "it-IT",
    dir: "ltr",
    speech: {
      tooFar: "Piano, non superare il tuo limite",
      notEnough: "Prova ad andare un po' più in là",
      good: "Ottimo",
      notVisible: "Fai un passo indietro, devo vederti tutto",
      done: "Bravo, hai completato tutte le ripetizioni",
    },
    ui: {
      language: "Lingua",
      angle: "Angolo",
      target: "Obiettivo",
      reps: "Ripetizioni",
      finish: "Termina sessione",
      back: "Indietro",
      left: "Sinistra",
      right: "Destra",
      loading: "Caricamento del modello…",
      moveIntoView: "Posizionati in modo che tutto l'arto sia visibile",
      pastSafe: "Hai superato il tuo limite di sicurezza!",
      targetReached: "Bravo, ripetizioni completate! Puoi terminare la sessione.",
      modelError: "Impossibile caricare il modello: ",
      saved: (good, total) => `Sessione salvata: ${good}/${total} ripetizioni corrette`,
      tracking: "Rilevamento attivo",
      findingYou: "Mettiti davanti alla fotocamera",
      voiceOn: "Voce attiva",
      voiceOff: "Voce disattivata",
      safeRange: "Intervallo sicuro",
      leaveTitle: "Uscire da questo esercizio?",
      leaveMessage: "Le ripetizioni fatte finora non verranno salvate.",
      leave: "Esci",
      stay: "Continua",
    },
    exercises: {
      supine_heel_slide: "Scivolamento del tallone (flessione del ginocchio, sdraiato)",
      seated_knee_extension: "Estensione del ginocchio da seduto",
      standing_shoulder_forward_flexion: "Sollevamento frontale del braccio in piedi",
      seated_elbow_flexion: "Flessione del gomito",
      standing_bicep_curl: "Curl per bicipiti",
      standing_hip_abduction: "Abduzione dell'anca in piedi (sollevamento laterale della gamba)",
    },
  },

  tr: {
    name: "Türkçe",
    speechLang: "tr-TR",
    dir: "ltr",
    speech: {
      tooFar: "Biraz azalt, sınırını aşma",
      notEnough: "Biraz daha ileri gitmeye çalış",
      good: "Mükemmel",
      notVisible: "Biraz geri çekil, seni tamamen görmem gerekiyor",
      done: "Aferin, tüm tekrarlarını bitirdin",
    },
    ui: {
      language: "Dil",
      angle: "Açı",
      target: "Hedef",
      reps: "Tekrar",
      finish: "Seansı bitir",
      back: "Geri",
      left: "Sol",
      right: "Sağ",
      loading: "Model yükleniyor…",
      moveIntoView: "Tüm uzvun görünecek şekilde konumlan",
      pastSafe: "Güvenli aralığını aştın!",
      targetReached: "Aferin, tüm tekrarlar bitti! Seansı bitirebilirsin.",
      modelError: "Model yüklenemedi: ",
      saved: (good, total) => `Seans kaydedildi: ${good}/${total} doğru tekrar`,
      tracking: "Takip ediliyor",
      findingYou: "Kameranın önüne geç",
      voiceOn: "Ses açık",
      voiceOff: "Ses kapalı",
      safeRange: "Güvenli aralık",
      leaveTitle: "Egzersizden çıkılsın mı?",
      leaveMessage: "Şimdiye kadar yaptığın tekrarlar kaydedilmeyecek.",
      leave: "Çık",
      stay: "Devam et",
    },
    exercises: {
      supine_heel_slide: "Topuk kaydırma (sırtüstü diz bükme)",
      seated_knee_extension: "Oturarak diz düzeltme",
      standing_shoulder_forward_flexion: "Ayakta kolu öne kaldırma",
      seated_elbow_flexion: "Dirsek bükme",
      standing_bicep_curl: "Biseps curl",
      standing_hip_abduction: "Ayakta kalça abdüksiyonu (bacağı yana kaldırma)",
    },
  },
};

export const DEFAULT_LANG = "ar";

// Returns the text for a language. Any string missing in that language
// falls back to English, so the app never shows a blank.
// howTo/safetyNote stay empty when untranslated: callers fall back to the catalog.
export function getStrings(lang) {
  const code = LANGUAGES[lang] ? lang : DEFAULT_LANG;
  const chosen = LANGUAGES[code];
  const en = LANGUAGES.en;
  const page = PATIENT_TEXT[code] ?? {};
  return {
    ...en,
    ...chosen,
    lang: code,
    speech: { ...en.speech, ...chosen.speech },
    ui: { ...en.ui, ...PATIENT_TEXT.en.ui, ...chosen.ui, ...page.ui },
    exercises: { ...en.exercises, ...chosen.exercises },
    howTo: page.howTo ?? {},
    safetyNote: page.safetyNote,
  };
}

// The chosen language is remembered on this device (browser storage).
// Storage can be blocked (e.g. private mode), so every access is wrapped in try/catch.
// Returns null when the patient never picked one: the coach then follows the app language.
const LANG_KEY = "coachLanguage";
export function loadLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && LANGUAGES[saved]) return saved;
  } catch { /* storage unavailable: use default */ }
  return null;
}
export function saveLang(lang) {
  try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
}
