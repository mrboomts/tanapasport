/**
 * The hub's sound: a slow "space" drone plus small cues for hovering and
 * choosing a shape. Everything is synthesised with the Web Audio API — no
 * audio files, nothing to download.
 *
 * Off by default (browsers block sound before a gesture anyway, and a
 * portfolio opened at work should not start humming). The visitor's choice
 * is remembered; if it was "on", the context resumes on their first tap.
 */

const KEY = "tanapas-sound";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let drone: GainNode | null = null;
let enabled = false;

function readPref() {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

function writePref(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* private mode — just don't remember */
  }
}

/** A few seconds of brown noise, looped for the drone and reused for whooshes. */
function noiseBuffer(c: AudioContext, seconds = 4) {
  const buf = c.createBuffer(1, c.sampleRate * seconds, c.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    d[i] = last * 3.5;
  }
  return buf;
}

let noise: AudioBuffer | null = null;

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  noise = noiseBuffer(ctx);
  buildDrone(ctx, master);

  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) void ctx.suspend();
    else if (enabled) void ctx.resume();
  });
  return ctx;
}

/** Low detuned fifths through a slowly breathing low-pass, over faint wind. */
function buildDrone(c: AudioContext, out: GainNode) {
  drone = c.createGain();
  drone.gain.value = 0.55;
  drone.connect(out);

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 420;
  filter.Q.value = 0.7;
  filter.connect(drone);

  const lfo = c.createOscillator();
  const lfoGain = c.createGain();
  lfo.frequency.value = 0.05;
  lfoGain.gain.value = 220;
  lfo.connect(lfoGain).connect(filter.frequency);
  lfo.start();

  for (const [f, type, g] of [
    [55, "sine", 0.22],
    [82.6, "sine", 0.14],
    [110.4, "triangle", 0.06],
    [164.3, "sine", 0.035],
  ] as const) {
    const o = c.createOscillator();
    o.type = type;
    o.frequency.value = f;
    o.detune.value = (Math.random() - 0.5) * 12;
    const gain = c.createGain();
    gain.gain.value = g;
    o.connect(gain).connect(filter);
    o.start();
  }

  const wind = c.createBufferSource();
  wind.buffer = noise;
  wind.loop = true;
  const windFilter = c.createBiquadFilter();
  windFilter.type = "bandpass";
  windFilter.frequency.value = 500;
  windFilter.Q.value = 0.6;
  const windGain = c.createGain();
  windGain.gain.value = 0.05;
  wind.connect(windFilter).connect(windGain).connect(drone);
  wind.start();
}

function fadeMaster(to: number, seconds: number) {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(to, t + seconds);
}

/** One enveloped tone. */
function tone(freq: number, at: number, dur: number, gain: number, type: OscillatorType = "sine", glideTo?: number) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, at);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, at + dur * 0.8);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + Math.min(0.02, dur * 0.2));
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g).connect(master);
  o.start(at);
  o.stop(at + dur + 0.05);
}

/** Filtered noise swept between two frequencies. */
function whoosh(at: number, dur: number, from: number, to: number, gain: number) {
  if (!ctx || !master || !noise) return;
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const f = ctx.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 1.4;
  f.frequency.setValueAtTime(from, at);
  f.frequency.exponentialRampToValueAtTime(to, at + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + dur * 0.55);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  src.connect(f).connect(g).connect(master);
  src.start(at, Math.random() * 2);
  src.stop(at + dur + 0.05);
}

/** A pentatonic step per shape, so each one has its own note. */
const NOTES = [523.25, 587.33, 659.25, 783.99, 880];

export const sound = {
  get enabled() {
    return enabled;
  },

  /** Read the saved choice; if it was on, start on the first gesture. */
  init() {
    if (!readPref()) return;
    enabled = true;
    const start = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      if (!enabled || !ensure()) return;
      void ctx!.resume();
      fadeMaster(0.5, 2.5);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
  },

  setEnabled(on: boolean) {
    enabled = on;
    writePref(on);
    if (on) {
      if (!ensure()) return;
      void ctx!.resume();
      fadeMaster(0.5, 1.5);
    } else {
      fadeMaster(0, 0.4);
    }
  },

  hover(solid: number) {
    if (!enabled || !ctx || ctx.state !== "running") return;
    const t = ctx.currentTime;
    tone(NOTES[solid % NOTES.length] * 2, t, 0.35, 0.035);
  },

  /** Choosing a shape: lift-off, the chime as Metatron draws, the burst. */
  enter(solid: number) {
    if (!enabled || !ctx || ctx.state !== "running") return;
    const t = ctx.currentTime;
    const root = NOTES[solid % NOTES.length] / 2;
    // the shape lifts and flies in
    whoosh(t, 0.7, 260, 2600, 0.16);
    tone(root, t, 0.8, 0.07, "triangle", root * 2);
    // the flower blooms and Metatron's lines draw
    [1, 1.5, 2, 3].forEach((m, i) => tone(root * 2 * m, t + 0.32 + i * 0.07, 1.8, 0.05 / (i + 1)));
    // gold dust
    whoosh(t + 0.95, 0.6, 3000, 900, 0.1);
    for (let i = 0; i < 7; i++) {
      tone(2000 + Math.random() * 2600, t + 0.97 + Math.random() * 0.35, 0.18, 0.018);
    }
    // the drone swells a little under the moment
    if (drone) {
      drone.gain.cancelScheduledValues(t);
      drone.gain.setValueAtTime(drone.gain.value, t);
      drone.gain.linearRampToValueAtTime(0.85, t + 0.5);
      drone.gain.linearRampToValueAtTime(0.55, t + 2.2);
    }
  },

  leave() {
    if (!enabled || !ctx || ctx.state !== "running") return;
    const t = ctx.currentTime;
    whoosh(t, 0.55, 1800, 300, 0.1);
  },
};
