// =============================================================================
// ExerciseCoach.jsx — the exercise screen for ONE assigned exercise.
//
// What it does, many times per second:
//   1. Shows the front camera (mirrored, like a mirror)
//   2. Asks the pose model where the patient's body points are
//   3. Draws the skeleton on top of the video
//   4. Measures the clinical angle for this exercise (see angles.js)
//   5. Warns (on screen + out loud, in the patient's chosen language) if they
//      go outside the physio's permitted range
//   6. Counts reps (leniently) and says whether each one reached the target
// When the patient presses "Finish session", it hands ONLY the numbers to
// onFinish — never the video. The parent page saves them.
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { DrawingUtils, PoseLandmarker } from "@mediapipe/tasks-vision";
import { usePoseLandmarker } from "./usePoseLandmarker";
import {
  landmarksFor, measureAngle, visibleEnough, makeSmoother, makeRepCounter, outsideSafeRange,
} from "./angles";
import { getStrings, DEFAULT_LANG } from "../i18n/messages";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import useConfirm from "../components/useConfirm";

// Spoken feedback using the browser's built-in text-to-speech
// (works for patients with eye injuries too, and they don't need to look at the screen).
// speechLang is e.g. "ar-LB" or "fr-FR". If the phone has no voice for that exact
// region, we pick any voice of the same language (e.g. any Arabic voice).
function speak(text, speechLang) {
  if (!("speechSynthesis" in window)) return; // browser doesn't support speech
  window.speechSynthesis.cancel();            // stop any message still playing
  const u = new SpeechSynthesisUtterance(text);
  u.lang = speechLang;
  const base = speechLang.split("-")[0];      // "ar-LB" -> "ar"
  const voices = window.speechSynthesis.getVoices();
  const voice =
    voices.find((v) => v.lang === speechLang) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(base));
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

/**
 * assignment = one exercise the physio prescribed, e.g.
 *   { exerciseId: "supine_heel_slide", side: "left", startAngle: 0, targetAngle: 90,
 *     permittedMin: 0, permittedMax: 100, reps: 10, stopCriteria: "..." }
 *   (angles in degrees, 0° = neutral, e.g. a straight knee)
 * lang = language code from i18n/messages.js ("ar", "en", "fr", ...)
 * onFinish(summary) = called with the results when "Finish session" is pressed
 * onCancel() = go back without saving
 */
export default function ExerciseCoach({ assignment, lang = DEFAULT_LANG, onFinish, onCancel }) {
  const videoRef = useRef(null);   // the <video> showing the camera
  const canvasRef = useRef(null);  // the <canvas> on top where the skeleton is drawn
  const { landmarkerRef, ready, error } = usePoseLandmarker(); // the pose model

  // All text (spoken + on screen) in the chosen language.
  // Kept in a ref too, so the detection loop always uses the current language
  // without having to restart (which would reset the rep count).
  const t = getStrings(lang);
  const tRef = useRef(t);
  tRef.current = t;

  // Values shown on screen (changing these re-renders the page)
  const [angle, setAngle] = useState(null);
  const [reps, setReps] = useState(0);
  const [warning, setWarning] = useState("");
  const [cameraError, setCameraError] = useState(null); // null | "blocked" | "failed"
  const [cameraTry, setCameraTry] = useState(0);        // bump to ask for the camera again
  const [tracking, setTracking] = useState(false);      // is the patient's limb in view right now?
  const [voiceOn, setVoiceOn] = useState(true);         // spoken feedback on/off
  const voiceOnRef = useRef(voiceOn);                   // read by the detection loop
  voiceOnRef.current = voiceOn;
  const [confirm, confirmDialog] = useConfirm();

  // Values kept between frames without re-rendering
  const repLogRef = useRef([]);     // details of every finished rep
  const lastSpokenRef = useRef(0);  // when we last spoke (to avoid talking non-stop)

  // Which body points this exercise needs on this side (null = unknown exercise)
  const points = landmarksFor(assignment.exerciseId, assignment.side);

  // 1. Start the camera
  useEffect(() => {
    let stream;
    let cancelled = false;
    // Wrapped in a promise so a missing navigator.mediaDevices (plain http on a
    // phone) lands in .catch instead of crashing the page
    Promise.resolve()
      // Ask permission for the front ("user") camera, no microphone
      .then(() => navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 640, height: 480 }, audio: false }))
      .then((s) => {
        if (cancelled) { s.getTracks().forEach((tr) => tr.stop()); return; }
        stream = s;
        videoRef.current.srcObject = s; // show the camera in the <video>
        return videoRef.current.play();
      })
      .catch((e) => {
        if (cancelled) return;
        const denied = e?.name === "NotAllowedError" || e?.name === "SecurityError";
        setCameraError(denied ? "blocked" : "failed");
      });
    // Cleanup: turn the camera off when leaving this screen
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((tr) => tr.stop());
    };
  }, [cameraTry]);

  const retryCamera = () => {
    setCameraError(null);
    setCameraTry((n) => n + 1);
  };

  // 2. Detection loop (starts once the pose model is ready)
  useEffect(() => {
    if (!ready || !points) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const draw = new DrawingUtils(ctx); // MediaPipe helper for drawing skeletons
    const smooth = makeSmoother(0.3);
    // Reps are measured from the physio's start angle towards their target
    const counter = makeRepCounter({ start: assignment.startAngle, target: assignment.targetAngle });

    let rafId;          // ID of the scheduled next frame (so we can cancel it)
    let lastTime = -1;  // video time of the last frame we processed

    // Say one of the coach's messages ("tooFar", "good", ...) in the current
    // language — at most once every 2.5 seconds, unless `force` is true
    const say = (key, force = false) => {
      const now = performance.now();
      if (!voiceOnRef.current) return;                    // patient turned the voice off
      if (force || now - lastSpokenRef.current > 2500) { // don't spam the patient
        speak(tRef.current.speech[key], tRef.current.speechLang);
        lastSpokenRef.current = now;
      }
    };

    // Runs on every screen refresh (~30–60 times per second)
    const loop = () => {
      rafId = requestAnimationFrame(loop); // schedule the next run
      // Skip if the video isn't ready yet, or there's no new frame since last time
      if (video.readyState < 2 || video.currentTime === lastTime) return;
      lastTime = video.currentTime;

      // Make the drawing area match the camera size
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Ask the model where the body points are in this frame
      const result = landmarkerRef.current.detectForVideo(video, performance.now());
      ctx.clearRect(0, 0, canvas.width, canvas.height); // erase last frame's drawing

      const lms = result.landmarks?.[0];        // normalized (for drawing + visibility)
      const world = result.worldLandmarks?.[0]; // meters (for angles)
      if (!lms || !world) { setTracking(false); return; } // no person found in this frame

      // Draw the skeleton: green lines between joints, orange dots on joints
      draw.drawConnectors(lms, PoseLandmarker.POSE_CONNECTIONS, { color: "#4ade80", lineWidth: 3 });
      draw.drawLandmarks(lms, { color: "#f97316", radius: 3 });

      // If part of the limb is off-camera, the angle can't be trusted
      if (!visibleEnough(lms, points)) {
        setTracking(false);
        setWarning(tRef.current.ui.moveIntoView);
        say("notVisible");
        return;
      }

      // Measure the clinical angle, smoothed to reduce jitter
      const ang = smooth(measureAngle(assignment.exerciseId, assignment.side, world));
      if (ang == null) return; // no angle yet
      setTracking(true);
      setAngle(Math.round(ang));

      // Safety check against the physio's permitted range
      if (outsideSafeRange(ang, assignment)) {
        setWarning(tRef.current.ui.pastSafe);
        say("tooFar");
      } else {
        setWarning("");
      }

      // Count reps. When one finishes, record it and give spoken feedback.
      const { reps: r, completed } = counter(ang);
      if (completed) {
        repLogRef.current.push({
          peakAngle: completed.peakAngle,
          reachedTarget: completed.reachedTarget,
          t: Date.now(),
        });
        setReps(r);
        if (r === assignment.reps) say("done", true); // prescription complete
        else say(completed.reachedTarget ? "good" : "notEnough");
      }
    };

    loop();
    // Cleanup: stop the loop when leaving this screen
    return () => cancelAnimationFrame(rafId);
  }, [ready, points, assignment, landmarkerRef]);

  // 3. Hand only numbers to the parent, never video (privacy)
  function finish() {
    window.speechSynthesis?.cancel();
    onFinish?.({
      exerciseId: assignment.exerciseId,
      side: assignment.side,
      plan: {
        startAngle: assignment.startAngle,
        targetAngle: assignment.targetAngle,
        permittedMin: assignment.permittedMin,
        permittedMax: assignment.permittedMax,
        reps: assignment.reps,
      },
      reps: repLogRef.current,
      performedAt: new Date().toISOString(),
    });
  }

  // Leaving loses the reps done so far, so ask first once there is something to lose
  async function leave() {
    if (reps > 0) {
      const ok = await confirm({
        title: t.ui.leaveTitle,
        message: t.ui.leaveMessage,
        confirmLabel: t.ui.leave,
        cancelLabel: t.ui.stay,
      });
      if (!ok) return;
    }
    window.speechSynthesis?.cancel();
    onCancel?.();
  }

  const toggleVoice = () => {
    if (voiceOn) window.speechSynthesis?.cancel();
    setVoiceOn(!voiceOn);
  };

  // Errors still offer a way back, so the patient is never stuck on this screen
  const backButton = <button className="btn-secondary btn-lg self-start" onClick={() => onCancel?.()}><ArrowLeft aria-hidden className="rtl:-scale-x-100" /> {t.ui.back}</button>;
  if (!points || error) {
    return (
      <div dir={t.dir} className="mx-auto flex max-w-[640px] flex-col gap-4">
        <p className="alert-error">{!points ? `Unknown exercise: ${assignment.exerciseId}` : t.ui.modelError + String(error)}</p>
        {backButton}
      </div>
    );
  }

  const done = reps >= assignment.reps;
  const status = !ready ? "loading" : tracking ? "tracking" : "finding";

  return (
    // dir="rtl" makes Arabic text read right-to-left
    <div dir={t.dir} className="stagger mx-auto flex max-w-[680px] flex-col gap-4">
      <div className="flex items-center gap-2">
        <button className="btn-ghost -ms-2 px-2.5" onClick={leave} aria-label={t.ui.back}>
          <ArrowLeft aria-hidden className="rtl:-scale-x-100" />
        </button>
        <h2 className="me-auto text-xl font-bold leading-snug sm:text-2xl">
          {t.exercises[assignment.exerciseId] ?? assignment.exerciseId}
          <span className="chip ms-2 bg-accent-tint align-middle text-accent">{t.ui[assignment.side]}</span>
        </h2>
        <button className="btn-secondary px-3" onClick={toggleVoice} aria-pressed={voiceOn}
          title={voiceOn ? t.ui.voiceOn : t.ui.voiceOff}>
          {voiceOn ? <Volume2 aria-hidden /> : <VolumeX aria-hidden />}
          <span className="hidden sm:inline">{voiceOn ? t.ui.voiceOn : t.ui.voiceOff}</span>
        </button>
      </div>

      {/* Video and canvas are stacked: the skeleton drawing sits on top of the camera */}
      <div className="hud-frame" style={{ position: "relative" }}>
        {/* mirrored so it feels like a mirror to the patient.
            Video AND canvas both use object-contain inside the same 4:3 box, so they
            scale and letterbox identically and the skeleton always lines up with the
            body — even when a phone camera gives a tall (portrait) image.
            (object-cover would crop only the video and misalign the skeleton.) */}
        <video ref={videoRef} playsInline muted className="block aspect-[4/3] bg-ink object-contain" style={{ width: "100%", transform: "scaleX(-1)" }} />
        <canvas ref={canvasRef} className="object-contain"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "scaleX(-1)" }} />
        {!cameraError && (
          <p className="hud-pill" role="status">
            <i aria-hidden className={status === "tracking" ? "bg-green-400" : status === "loading" ? "animate-pulse bg-white" : "animate-pulse bg-amber-400"} />
            {status === "loading" ? t.ui.loading : status === "tracking" ? t.ui.tracking : t.ui.findingYou}
          </p>
        )}
        {/* warnings sit on the video too, big enough to read from across the room */}
        {!cameraError && warning && <p role="alert" className="hud-alert">{warning}</p>}
      </div>

      {cameraError && (
        <div role="alert" className="alert-error flex-col items-stretch text-base">
          <p>{cameraError === "blocked" ? t.ui.cameraBlocked : t.ui.cameraFailed}</p>
          <button className="btn-secondary self-start" onClick={retryCamera}>{t.ui.tryAgain}</button>
        </div>
      )}

      {/* Big, easy-to-read live numbers */}
      <dl className="readout">
        <div><dt>{t.ui.angle}</dt><dd className="text-accent">{angle ?? "—"}°</dd></div>
        <div><dt>{t.ui.target}</dt><dd>{assignment.targetAngle}°</dd></div>
        {/* key={reps}: remounts on each new rep so the number pops once */}
        <div><dt>{t.ui.reps}</dt><dd><span key={reps} className="inline-block animate-tick">{reps}</span><span className="text-2xl text-muted sm:text-3xl">/{assignment.reps}</span></dd></div>
      </dl>

      <RangeBar angle={angle} plan={assignment} t={t} />

      <div className="progress" role="progressbar" aria-label={t.ui.reps}
        aria-valuemin={0} aria-valuemax={assignment.reps} aria-valuenow={Math.min(reps, assignment.reps)}>
        <span style={{ width: `${Math.min(100, (reps / assignment.reps) * 100)}%` }} className={done ? "bg-success" : ""} />
      </div>

      {done && <p className="alert-success text-lg">{t.ui.targetReached}</p>}

      <div className="flex gap-3">
        {/* nothing to save until at least one rep was measured */}
        <button className="btn-primary btn-lg flex-1" onClick={finish} disabled={reps === 0}>{t.ui.finish}</button>
        <button className="btn-secondary btn-lg" onClick={leave}>{t.ui.back}</button>
      </div>
      {confirmDialog}
    </div>
  );
}

// A horizontal bar showing the live angle against the physio's plan:
// green = permitted (safe) range, red = outside it, a line at the target,
// a faint line at the start, and a round thumb at the patient's angle.
// Always drawn left-to-right (small angle -> large angle), even in Arabic.
function RangeBar({ angle, plan, t }) {
  const lo = Math.max(0, Math.min(plan.permittedMin, plan.startAngle, plan.targetAngle) - 20);
  const hi = Math.min(180, Math.max(plan.permittedMax, plan.startAngle, plan.targetAngle) + 20);
  const pos = (v) => `${Math.max(0, Math.min(100, ((v - lo) / (hi - lo || 1)) * 100))}%`;
  return (
    <div className="card px-4 pb-3 pt-4 sm:px-5">
      <div dir="ltr" className="range-track" aria-hidden>
        <span className="range-safe" style={{ left: pos(plan.permittedMin), right: `calc(100% - ${pos(plan.permittedMax)})` }} />
        <span className="range-mark bg-muted/40" style={{ left: pos(plan.startAngle) }} />
        <span className="range-mark bg-accent" style={{ left: pos(plan.targetAngle) }} />
        {angle != null && <span className="range-thumb" style={{ left: pos(angle) }} />}
      </div>
      <div className="mt-2.5 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs font-semibold text-muted sm:text-sm">
        <span className="flex items-center gap-1.5"><i aria-hidden className="h-2.5 w-2.5 rounded-full bg-success-tint ring-1 ring-success/40" />{t.ui.safeRange} {plan.permittedMin}°–{plan.permittedMax}°</span>
        <span className="flex items-center gap-1.5"><i aria-hidden className="h-2.5 w-1 rounded-full bg-accent" />{t.ui.target} {plan.targetAngle}°</span>
      </div>
    </div>
  );
}
