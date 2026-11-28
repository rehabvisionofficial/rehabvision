// =============================================================================
// usePoseLandmarker.js — a React hook that loads Google's MediaPipe pose model
// in the browser. The model is what looks at a camera frame and finds the 33
// body points (shoulders, knees, ankles...).
//
// Usage: const { landmarkerRef, ready, error } = usePoseLandmarker();
//   landmarkerRef.current -> the loaded model (null until ready)
//   ready                 -> true once it can be used
//   error                 -> set if loading failed
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";

// These files are served from frontend/public/, so the app works without
// relying on Google's servers (useful during power/internet cuts):
//   public/wasm/    -> MediaPipe's engine (copied from node_modules)
//   public/models/  -> the trained pose model (pose_landmarker_full.task)
const WASM_PATH = "/wasm";
const MODEL_PATH = "/models/pose_landmarker_full.task";

export function usePoseLandmarker() {
  // useRef (not state) for the model: changing it shouldn't re-render the page
  const landmarkerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  // Runs once when the component appears on screen ([] = no dependencies)
  useEffect(() => {
    // If the component disappears while the model is still loading, don't keep it
    let cancelled = false;

    (async () => {
      try {
        // Load MediaPipe's engine
        const vision = await FilesetResolver.forVisionTasks(WASM_PATH);

        // Build the pose detector. `delegate` = run on "GPU" or "CPU".
        const create = (delegate) =>
          PoseLandmarker.createFromOptions(vision, {
            baseOptions: { modelAssetPath: MODEL_PATH, delegate },
            runningMode: "VIDEO",          // optimised for a continuous camera feed
            numPoses: 1,                   // track one person only
            minPoseDetectionConfidence: 0.5, // how sure it must be to find a person
            minTrackingConfidence: 0.5,      // how sure to keep tracking between frames
          });

        // GPU is faster; fall back to CPU on old phones.
        let lm;
        try { lm = await create("GPU"); } catch { lm = await create("CPU"); }

        if (cancelled) { lm.close(); return; }
        landmarkerRef.current = lm;
        setReady(true);
      } catch (e) {
        if (!cancelled) setError(e);
      }
    })();

    // Cleanup when the component disappears: free the model's memory
    return () => {
      cancelled = true;
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
    };
  }, []);

  return { landmarkerRef, ready, error };
}
