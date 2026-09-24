/**
 * The hub's sound, aiming for "sorcerer's portal" rather than "UI blip":
 * a dark choir-like drone in a large hall, and for choosing a shape the
 * crackle of a sparking ring spinning up, a sub-bass drop, a choir swell,
 * a great gong as Metatron's Cube draws, and a shower of embers.
 *
 * Everything is synthesised with the Web Audio API — no audio files. The
 * "hall" is a generated impulse response (decaying stereo noise) fed by a
 * send from every voice, which is most of what makes it sound big.
 *
 * Off by default (browsers block sound before a gesture anyway, and a
 * portfolio opened at work should not start humming). The visitor's choice
 * is remembered; if it was "on", the context resumes on their first tap.
 */

const KEY = "tanapas-sound";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let dry: GainNode | null = null;
let hall: GainNode | null = null;
let drone: GainNode | null = null;
let noise: AudioBuffer | null = null;
let enabled = false;

// In development a code reload re-runs this module; close the old context
// so its drone can't carry on playing out of reach of the mute button.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    void ctx?.close();
  });
}

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

function whiteNoise(c: AudioContext, seconds = 3) {
  const buf = c.createBuffer(1, c.sampleRate * seconds, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

/** A cathedral-ish tail: stereo noise with an exponential decay. */
function hallImpulse(c: AudioContext, seconds = 4.5, decay = 2.6) {
  const len = c.sampleRate * seconds;
  const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();

  master = ctx.createGain();
  master.gain.value = 0;
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -10;
  limiter.ratio.value = 8;
  master.connect(limiter).connect(ctx.destination);

  dry = ctx.createGain();
  dry.gain.value = 0.8;
  dry.connect(master);

  const verb = ctx.createConvolver();
  verb.buffer = hallImpulse(ctx);
  hall = ctx.createGain();
  hall.gain.value = 1;
  const wet = ctx.createGain();
  wet.gain.value = 0.75;
  hall.connect(verb).connect(wet).connect(master);

  noise = whiteNoise(ctx);
  buildDrone(ctx);

  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) void ctx.suspend();
    else if (enabled) void ctx.resume();
  });
  return ctx;
}

/** Route a node to both the dry bus and the hall. */
function out(node: AudioNode, send = 0.6) {
  node.connect(dry!);
  const s = ctx!.createGain();
  s.gain.value = send;
  node.connect(s).connect(hall!);
}

/**
 * The drone: a D-minor choir (detuned saws through "ah" formants, with a
 * slow vibrato), a sub an octave under, and low wind — all breathing on
 * a very slow filter sweep.
 */
function buildDrone(c: AudioContext) {
  drone = c.createGain();
  drone.gain.value = 0.5;
  out(drone, 0.9);

  const breathe = c.createBiquadFilter();
  breathe.type = "lowpass";
  breathe.frequency.value = 900;
  breathe.Q.value = 0.5;
  breathe.connect(drone);
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.04;
  const lfoAmt = c.createGain();
  lfoAmt.gain.value = 450;
  lfo.connect(lfoAmt).connect(breathe.frequency);
  lfo.start();

  // "ah" — the first two formants of an open vowel
  const formants = [700, 1150].map((f, i) => {
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = f;
    bp.Q.value = 6;
    const g = c.createGain();
    g.gain.value = i === 0 ? 1 : 0.6;
    bp.connect(g).connect(breathe);
    return bp;
  });

  const vibrato = c.createOscillator();
  vibrato.frequency.value = 4.6;
  const vibAmt = c.createGain();
  vibAmt.gain.value = 5;
  vibrato.connect(vibAmt);
  vibrato.start();

  // D3, F3, A3, D4 — each doubled and detuned for a chorus of voices
  for (const f of [146.83, 174.61, 220, 293.66]) {
    for (const det of [-9, 8]) {
      const o = c.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f;
      o.detune.value = det;
      vibAmt.connect(o.detune);
      const g = c.createGain();
      g.gain.value = 0.05;
      o.connect(g);
      formants.forEach((bp) => g.connect(bp));
      o.start();
    }
  }

  const sub = c.createOscillator();
  sub.frequency.value = 36.71; // D1
  const subG = c.createGain();
  subG.gain.value = 0.28;
  sub.connect(subG).connect(breathe);
  sub.start();

  const wind = c.createBufferSource();
  wind.buffer = noise;
  wind.loop = true;
  const wf = c.createBiquadFilter();
  wf.type = "lowpass";
  wf.frequency.value = 260;
  const wg = c.createGain();
  wg.gain.value = 0.12;
  wind.connect(wf).connect(wg).connect(breathe);
  wind.start();
}

function fadeMaster(to: number, seconds: number) {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(to, t + seconds);
}

function env(g: GainNode, at: number, attack: number, peak: number, release: number) {
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(peak, at + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, at + attack + release);
}

/** A struck metal bowl / gong: inharmonic partials, long ring. */
function gong(root: number, at: number, gain: number, length = 4) {
  const c = ctx!;
  const bus = c.createGain();
  bus.gain.value = 1;
  out(bus, 1.1);
  [
    [1, 1],
    [2.01, 0.55],
    [2.76, 0.5],
    [3.93, 0.3],
    [5.4, 0.22],
    [6.79, 0.12],
  ].forEach(([ratio, amp], i) => {
    const o = c.createOscillator();
    o.frequency.value = root * ratio;
    const g = c.createGain();
    env(g, at, 0.006, gain * amp, length / (1 + i * 0.35));
    o.connect(g).connect(bus);
    o.start(at);
    o.stop(at + length + 0.1);
  });
}

/** A sweep of filtered noise — the rush of air around a portal. */
function rush(at: number, dur: number, from: number, to: number, gain: number, spin = 0) {
  const c = ctx!;
  const src = c.createBufferSource();
  src.buffer = noise;
  src.loop = true;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 2.2;
  f.frequency.setValueAtTime(from, at);
  f.frequency.exponentialRampToValueAtTime(to, at + dur);
  if (spin) {
    // a fast wobble on the band reads as something circling
    const l = c.createOscillator();
    l.frequency.setValueAtTime(spin * 0.4, at);
    l.frequency.exponentialRampToValueAtTime(spin, at + dur);
    const la = c.createGain();
    la.gain.value = from * 0.5;
    l.connect(la).connect(f.frequency);
    l.start(at);
    l.stop(at + dur + 0.1);
  }
  const g = c.createGain();
  env(g, at, dur * 0.6, gain, dur * 0.5);
  src.connect(f).connect(g);
  out(g, 0.7);
  src.start(at, Math.random() * 2);
  src.stop(at + dur * 1.2 + 0.1);
}

/** Sparks: many tiny bright clicks, denser toward the end of the span. */
function sparks(at: number, dur: number, count: number, gain: number) {
  const c = ctx!;
  for (let i = 0; i < count; i++) {
    const t = at + dur * Math.sqrt(Math.random());
    const src = c.createBufferSource();
    src.buffer = noise;
    const hp = c.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2500 + Math.random() * 4000;
    const g = c.createGain();
    env(g, t, 0.001, gain * (0.4 + Math.random() * 0.6), 0.012 + Math.random() * 0.03);
    src.connect(hp).connect(g);
    out(g, 0.35);
    src.start(t, Math.random() * 2);
    src.stop(t + 0.06);
  }
}

/** A deep impact: a sine falling into the sub range, plus a thud. */
function boom(at: number, gain: number) {
  const c = ctx!;
  const o = c.createOscillator();
  o.frequency.setValueAtTime(90, at);
  o.frequency.exponentialRampToValueAtTime(32, at + 0.9);
  const g = c.createGain();
  env(g, at, 0.01, gain, 1.4);
  o.connect(g);
  out(g, 0.5);
  o.start(at);
  o.stop(at + 1.6);
}

/** A choir swell on a chord, through the same "ah" formants as the drone. */
function choir(at: number, freqs: number[], gain: number, hold: number) {
  const c = ctx!;
  const bus = c.createGain();
  env(bus, at, 0.35, gain, hold);
  out(bus, 1.2);
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 800;
  bp.Q.value = 1.2;
  bp.connect(bus);
  for (const f of freqs) {
    for (const det of [-7, 7]) {
      const o = c.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f;
      o.detune.value = det;
      const g = c.createGain();
      g.gain.value = 0.12;
      o.connect(g).connect(bp);
      o.start(at);
      o.stop(at + 0.4 + hold + 0.2);
    }
  }
}

/** Each shape rings on its own step of D minor. */
const ROOTS = [146.83, 164.81, 174.61, 196, 220];

const live = () => enabled && ctx && ctx.state === "running";

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
      fadeMaster(0.55, 3);
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
      fadeMaster(0.55, 2);
    } else {
      fadeMaster(0, 0.4);
      // then stop the audio clock outright, so nothing can keep humming
      const c = ctx;
      window.setTimeout(() => {
        if (!enabled && c && c.state === "running") void c.suspend();
      }, 450);
    }
  },

  /** Hover: a soft struck bowl with a breath of air — quiet, low, resonant. */
  hover(solid: number) {
    if (!live()) return;
    const t = ctx!.currentTime;
    gong(ROOTS[solid % ROOTS.length], t, 0.035, 2.2);
    rush(t, 0.35, 600, 1400, 0.025);
  },

  /** Choosing a shape: the ring sparks and spins up, drops, sings, tolls, scatters. */
  enter(solid: number) {
    if (!live()) return;
    const t = ctx!.currentTime;
    const root = ROOTS[solid % ROOTS.length];
    // the ring ignites and spins up as the shape flies in
    sparks(t, 0.75, 70, 0.22);
    rush(t, 0.75, 250, 3200, 0.2, 14);
    boom(t + 0.05, 0.5);
    // the flower blooms — the choir swells
    choir(t + 0.2, [root / 2, (root / 2) * 1.5, root, root * 1.2], 0.09, 1.6);
    // Metatron's lines draw — the great bell
    gong(root / 2, t + 0.42, 0.14, 5);
    gong(root, t + 0.44, 0.06, 3.5);
    // gold dust — embers and a falling rush
    sparks(t + 0.95, 0.5, 40, 0.14);
    rush(t + 0.95, 0.7, 4200, 700, 0.1);
    // the drone leans in under the moment
    if (drone) {
      drone.gain.cancelScheduledValues(t);
      drone.gain.setValueAtTime(drone.gain.value, t);
      drone.gain.linearRampToValueAtTime(0.85, t + 0.6);
      drone.gain.linearRampToValueAtTime(0.5, t + 3);
    }
  },

  /** Back to the menu: the portal closes. */
  leave() {
    if (!live()) return;
    const t = ctx!.currentTime;
    rush(t, 0.6, 2800, 220, 0.14, 9);
    sparks(t, 0.4, 25, 0.1);
    boom(t + 0.45, 0.25);
  },
};
