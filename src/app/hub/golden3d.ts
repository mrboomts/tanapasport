import * as THREE from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";

/**
 * The Experience room's golden-ratio vignette, in real 3D: a white kitten,
 * sculpted from primitives after Boom's drawing (pink ears, big navy eyes,
 * a fluffy up-curled tail), runs about, hops, sits and bats at a golden
 * seashell — which unfurls into a golden spiral turning in space.
 *
 * The look follows the drawing rather than trying for realism: toon
 * shading in three flat tones with lavender shade (the drawing's shadow
 * colour), a thin ink outline, and a gold rim light to sit it on the
 * page's palette.
 *
 * The cat is a little puppet: nested groups for hips → torso → chest →
 * neck → head, legs hanging from hips and chest, and a seven-link tail.
 * Poses are a handful of numbers (torso pitch, world leg angles, head
 * turn…) blended along an 18-second timeline; after posing, the rig is
 * dropped onto the floor by its lowest paw, so no pose floats or sinks.
 *
 * The spiral is the true golden logarithmic spiral, r = a·e^(bθ),
 * b = ln φ / (π/2), laid on a shallow cone so it has depth as it turns.
 * The shell is the same growth law swept as a tube — a nautilus.
 */

export type GoldenScene = { dispose(): void };

const PHI = (1 + Math.sqrt(5)) / 2;
const B = Math.log(PHI) / (Math.PI / 2);
const T = 18; // seconds per loop

const FUR = new THREE.Color("#f8f3ea");
const PINK = new THREE.Color("#f2a7c0");
const NOSE = new THREE.Color("#e98aa6");
const EYE = new THREE.Color("#1f2750");
const INKLINE = new THREE.Color("#2b2740");
const GOLD = new THREE.Color("#e9c877");
const GOLD_LT = new THREE.Color("#f7e2a8");

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** 0→1 across [a, b] of the loop (fractions of T), smoothed. */
const span = (t: number, a: number, b: number) => smooth((t - a) / (b - a));

type Pose = {
  pitch: number; // torso lift, radians
  fl: [number, number]; // front legs, world angle from straight down (+ = forward)
  bl: [number, number]; // back legs
  flLen: number;
  blLen: number;
  headPitch: number;
  headYaw: number;
  headRoll: number;
  tail: number; // curl
  reach?: number; // extra length on the near front leg, for the swipe
};

const SIT: Pose = {
  pitch: 1.0,
  fl: [0.08, 0.08],
  bl: [1.35, 1.35],
  flLen: 1.12,
  blLen: 0.72,
  headPitch: 0.12,
  headYaw: 0.45,
  headRoll: 0.1,
  tail: 1,
};

const STAND: Pose = {
  pitch: 0.05,
  fl: [0, 0],
  bl: [0, 0],
  flLen: 1,
  blLen: 1,
  headPitch: 0.1,
  headYaw: 0,
  headRoll: 0,
  tail: 0.55,
};

function blend(a: Pose, b: Pose, t: number): Pose {
  return {
    pitch: mix(a.pitch, b.pitch, t),
    fl: [mix(a.fl[0], b.fl[0], t), mix(a.fl[1], b.fl[1], t)],
    bl: [mix(a.bl[0], b.bl[0], t), mix(a.bl[1], b.bl[1], t)],
    flLen: mix(a.flLen, b.flLen, t),
    blLen: mix(a.blLen, b.blLen, t),
    headPitch: mix(a.headPitch, b.headPitch, t),
    headYaw: mix(a.headYaw, b.headYaw, t),
    headRoll: mix(a.headRoll, b.headRoll, t),
    tail: mix(a.tail, b.tail, t),
  };
}

function toonRamp() {
  const t = new THREE.DataTexture(new Uint8Array([110, 185, 255]), 3, 1, THREE.RedFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  return t;
}

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.3, "rgba(255,240,205,0.55)");
  grad.addColorStop(1, "rgba(255,240,205,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createGoldenScene(canvas: HTMLCanvasElement, opts: { reduced: boolean }): GoldenScene {
  const { reduced } = opts;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 320 / 620, 0.1, 60);
  camera.position.set(0, 3.4, 13.6);
  camera.lookAt(0, 2.75, 0);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(d: T) => {
    disposables.push(d);
    return d;
  };

  scene.add(new THREE.AmbientLight(new THREE.Color("#a79fd6"), 1.1));
  const key = new THREE.DirectionalLight(0xfff4e0, 2.1);
  key.position.set(-3, 5, 6);
  const rim = new THREE.DirectionalLight(GOLD, 2.4);
  rim.position.set(3, 2, -5);
  scene.add(key, rim);

  const ramp = track(toonRamp());
  const glow = track(glowTexture());
  const toon = (color: THREE.Color) => track(new THREE.MeshToonMaterial({ color, gradientMap: ramp }));
  const flat = (color: THREE.Color) => track(new THREE.MeshBasicMaterial({ color }));

  // ink outline: the back faces, pushed out along their normals
  const outline = track(new THREE.MeshBasicMaterial({ color: INKLINE, side: THREE.BackSide }));
  outline.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\ntransformed += normal * 0.022;",
    );
  };

  const sphere = track(new THREE.SphereGeometry(1, 28, 20));
  const furMat = toon(FUR);

  /** An ellipsoid of fur (or anything), with its outline. */
  function blob(
    parent: THREE.Object3D,
    s: [number, number, number],
    p: [number, number, number],
    mat: THREE.Material = furMat,
    lined = false,
  ) {
    const m = new THREE.Mesh(sphere, mat);
    m.scale.set(...s);
    m.position.set(...p);
    parent.add(m);
    if (lined) {
      const o = new THREE.Mesh(sphere, outline);
      o.scale.set(s[0] + 0.012, s[1] + 0.012, s[2] + 0.012);
      o.position.set(...p);
      parent.add(o);
    }
    return m;
  }

  /* ================= the cat ================= */
  const cat = new THREE.Group(); // travel + facing
  const lift = new THREE.Group(); // grounding + hop
  cat.add(lift);
  cat.scale.setScalar(1.8);
  scene.add(cat);

  const hips = new THREE.Group();
  lift.add(hips);

  // torso: a soft bean from the hips toward the chest
  blob(hips, [0.37, 0.3, 0.3], [0.2, 0.03, 0]);
  blob(hips, [0.28, 0.27, 0.31], [0.03, 0.01, 0]); // haunches
  blob(hips, [0.3, 0.3, 0.29], [0.38, 0.05, 0]); // chest mass

  function leg(parent: THREE.Object3D, at: [number, number, number], thick: number) {
    const g = new THREE.Group();
    g.position.set(...at);
    parent.add(g);
    const inner = new THREE.Group(); // scaled for leg length
    g.add(inner);
    blob(inner, [thick, 0.2, thick], [0, -0.16, 0]);
    const paw = blob(inner, [thick * 1.25, thick * 0.8, thick * 1.2], [0.03, -0.34, 0]);
    return { g, inner, paw };
  }

  const backL = leg(hips, [0.0, -0.08, -0.13], 0.095);
  const backR = leg(hips, [0.0, -0.08, 0.13], 0.095);

  // the fluffy tail: seven links, thickest in the middle, curled up
  const tailLinks: THREE.Group[] = [];
  {
    let parent: THREE.Object3D = hips;
    const at: [number, number, number] = [-0.18, 0.04, 0];
    for (let i = 0; i < 11; i++) {
      const g = new THREE.Group();
      g.position.set(...(i === 0 ? at : ([-0.062, 0, 0] as [number, number, number])));
      parent.add(g);
      const r = 0.07 + Math.sin((i / 10) * Math.PI * 0.85) * 0.035;
      blob(g, [0.09, r, r], [-0.03, 0, 0]);
      tailLinks.push(g);
      parent = g;
    }
  }

  const chest = new THREE.Group();
  chest.position.set(0.44, 0.02, 0);
  hips.add(chest);
  const frontL = leg(chest, [0.02, -0.12, -0.11], 0.084);
  const frontR = leg(chest, [0.02, -0.12, 0.11], 0.084);

  const neck = new THREE.Group();
  neck.position.set(0.06, 0.12, 0);
  chest.add(neck);
  blob(neck, [0.21, 0.2, 0.23], [0.03, 0.0, 0]); // ruff

  const head = new THREE.Group();
  head.position.set(0.1, 0.24, 0);
  head.scale.setScalar(1.18);
  neck.add(head);
  // one smooth, slightly wide head — only it (and the ears) carry an
  // outline; on the body, overlapping outlines drew creases at every join
  blob(head, [0.29, 0.265, 0.31], [0, 0, 0], furMat, true);
  blob(head, [0.1, 0.07, 0.12], [0.225, -0.085, 0]); // muzzle
  blob(head, [0.028, 0.022, 0.034], [0.325, -0.035, 0], flat(NOSE), false);

  const eyeMat = flat(EYE);
  const irisMat = flat(new THREE.Color("#4d67b0"));
  const shineMat = flat(new THREE.Color("#ffffff"));
  for (const side of [-1, 1]) {
    const e = new THREE.Group();
    e.position.set(0.2, 0.03, side * 0.13);
    e.rotation.y = -side * 0.55;
    head.add(e);
    blob(e, [0.05, 0.078, 0.07], [0.045, 0, 0], eyeMat, false);
    blob(e, [0.03, 0.05, 0.045], [0.07, -0.015, 0], irisMat, false);
    blob(e, [0.016, 0.02, 0.02], [0.09, 0.03, side * -0.018], shineMat, false);
    blob(e, [0.008, 0.009, 0.009], [0.092, -0.028, side * 0.014], shineMat, false);
  }

  // ears: outer cone of fur, inner cone of pink
  const coneGeo = track(new THREE.ConeGeometry(1, 1, 18));
  const pinkMat = toon(PINK);
  for (const side of [-1, 1]) {
    const ear = new THREE.Group();
    ear.position.set(-0.02, 0.2, side * 0.15);
    ear.rotation.set(side * 0.42, 0, -0.12);
    head.add(ear);
    const outer = new THREE.Mesh(coneGeo, furMat);
    outer.scale.set(0.12, 0.25, 0.1);
    outer.position.y = 0.1;
    const outerLine = new THREE.Mesh(coneGeo, outline);
    outerLine.scale.set(0.132, 0.264, 0.112);
    outerLine.position.y = 0.1;
    const inner = new THREE.Mesh(coneGeo, pinkMat);
    inner.scale.set(0.08, 0.19, 0.05);
    inner.position.set(0.05, 0.085, 0);
    ear.add(outer, outerLine, inner);
  }

  // whiskers — pale, so they read on the dark ground
  {
    const pts: number[] = [];
    for (const side of [-1, 1]) {
      for (const [dy, fan] of [
        [0.02, 0.12],
        [-0.01, 0],
        [-0.04, -0.12],
      ]) {
        pts.push(0.27, -0.06 + dy, side * 0.07, 0.36, -0.05 + dy + fan * 0.6, side * 0.33);
      }
    }
    const g = track(new THREE.BufferGeometry());
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const m = track(new THREE.LineBasicMaterial({ color: 0xe8e2f4, transparent: true, opacity: 0.7 }));
    head.add(new THREE.LineSegments(g, m));
  }

  // the warm pool of light under the cat (a dark shadow would vanish here)
  const poolMat = track(
    new THREE.SpriteMaterial({ map: glow, color: GOLD, transparent: true, opacity: 0.35, depthWrite: false }),
  );
  const pool = new THREE.Sprite(poolMat);
  pool.center.set(0.5, 0.5);
  scene.add(pool);

  /* ================= the shell and the spiral ================= */
  const shellRoot = new THREE.Group();
  scene.add(shellRoot);
  const shellSpin = new THREE.Group();
  shellRoot.add(shellSpin);
  {
    // A nautilus: a tube swept round the same golden spiral, each whorl
    // just wrapping the one before, with ribs across it — face-on, it
    // reads as a shell at a glance.
    const turns = 2.6;
    const TH = turns * 2 * Math.PI;
    const a = 0.24 / Math.exp(B * TH);
    const K = 0.42; // tube radius as a fraction of the spiral radius
    const shellGeo = track(
      new ParametricGeometry(
        (u, v, target) => {
          const th = u * TH;
          const R = a * Math.exp(B * th);
          const ph = v * 2 * Math.PI;
          const r = R + K * R * Math.cos(ph);
          target.set(r * Math.cos(th), r * Math.sin(th), K * R * Math.sin(ph) * 0.8);
        },
        140,
        20,
      ),
    );
    const shellMat = track(
      new THREE.MeshToonMaterial({
        color: GOLD,
        gradientMap: ramp,
        side: THREE.DoubleSide,
        emissive: new THREE.Color("#4a3514"),
      }),
    );
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shellSpin.add(shell);

    // ribs: a ring across the tube every so often, and the suture line
    const ribPts: number[] = [];
    for (let th = 0.6; th < TH; th += 0.42) {
      const R = a * Math.exp(B * th);
      for (let j = 0; j < 16; j++) {
        const p0 = (j / 16) * Math.PI * 2;
        const p1 = ((j + 1) / 16) * Math.PI * 2;
        for (const ph of [p0, p1]) {
          const r = R + K * R * 1.03 * Math.cos(ph);
          ribPts.push(r * Math.cos(th), r * Math.sin(th), K * R * 1.03 * Math.sin(ph) * 0.8);
        }
      }
    }
    const ribGeo = track(new THREE.BufferGeometry());
    ribGeo.setAttribute("position", new THREE.Float32BufferAttribute(ribPts, 3));
    const ribMat = track(new THREE.LineBasicMaterial({ color: new THREE.Color("#8a6424"), transparent: true }));
    shellSpin.add(new THREE.LineSegments(ribGeo, ribMat));
    shellSpin.scale.setScalar(1.75);
  }
  const shellGlowMat = track(
    new THREE.SpriteMaterial({ map: glow, color: GOLD, transparent: true, opacity: 0.4, depthWrite: false }),
  );
  const shellGlow = new THREE.Sprite(shellGlowMat);
  shellGlow.scale.setScalar(0.9);
  shellRoot.add(shellGlow);

  // the unfurled spiral: pole at the shell, 17.5 rad of growth, on a shallow cone
  const spiralRoot = new THREE.Group();
  scene.add(spiralRoot);
  const spiralTilt = new THREE.Group();
  spiralRoot.add(spiralTilt);
  const SPIRAL_PTS = 700;
  const TH_END = 17.5;
  // Turn the curve so its bounding box is a 1 : φ portrait with the outer
  // end at the top (the shape of the column), then fit that box to it.
  const raw: [number, number][] = [];
  for (let i = 0; i < SPIRAL_PTS; i++) {
    const th = (i / (SPIRAL_PTS - 1)) * TH_END;
    const r = Math.exp(B * th);
    raw.push([r * Math.cos(th), r * Math.sin(th)]);
  }
  let fit = { off: 0, score: Infinity, x0: 0, x1: 0, y0: 0, y1: 0 };
  for (let off = 0; off < Math.PI * 2; off += 0.005) {
    const c = Math.cos(off);
    const sn = Math.sin(off);
    let x0 = Infinity;
    let x1 = -Infinity;
    let y0 = Infinity;
    let y1 = -Infinity;
    let endY = 0;
    raw.forEach(([x, y], i) => {
      const X = x * c - y * sn;
      const Y = x * sn + y * c;
      x0 = Math.min(x0, X);
      x1 = Math.max(x1, X);
      y0 = Math.min(y0, Y);
      y1 = Math.max(y1, Y);
      if (i === raw.length - 1) endY = Y;
    });
    const score = Math.abs((x1 - x0) / (y1 - y0) - 1 / PHI) + (y1 - endY) / (y1 - y0);
    if (score < fit.score) fit = { off, score, x0, x1, y0, y1 };
  }
  const BOX = { cx: -0.1, cy: 2.55, w: 2.45, h: 4.4 };
  const k = Math.min(BOX.w / (fit.x1 - fit.x0), BOX.h / (fit.y1 - fit.y0));
  // Mirrored (x → −x) so the pole — where the shell sits — falls on the
  // right, with room for the cat to its left. The box's centre goes to BOX.
  const POLE = new THREE.Vector3(
    BOX.cx + k * ((fit.x0 + fit.x1) / 2),
    BOX.cy - k * ((fit.y0 + fit.y1) / 2),
    0.35,
  );
  const spiralPos = new Float32Array(SPIRAL_PTS * 3);
  {
    const c = Math.cos(fit.off);
    const sn = Math.sin(fit.off);
    raw.forEach(([x, y], i) => {
      spiralPos[i * 3] = -k * (x * c - y * sn);
      spiralPos[i * 3 + 1] = k * (x * sn + y * c);
      spiralPos[i * 3 + 2] = -k * Math.hypot(x, y) * 0.75; // the cone
    });
  }
  shellRoot.position.copy(POLE);
  spiralRoot.position.copy(POLE);
  // The unfurled spiral is a gold tube, hairline at the pole and swelling
  // toward the outer end — it grows out of the shell rather than being
  // drawn beside it. TubeGeometry is constant-width, so each ring is
  // scaled about its centre afterwards to taper it.
  const curve = new THREE.CatmullRomCurve3(
    Array.from({ length: 260 }, (_, i) => {
      const j = Math.round((i / 259) * (SPIRAL_PTS - 1));
      return new THREE.Vector3(spiralPos[j * 3], spiralPos[j * 3 + 1], spiralPos[j * 3 + 2]);
    }),
  );
  const TUBE_SEGS = 420;
  const TUBE_RADIAL = 10;
  const taper = (f: number) => mix(0.006, 0.055, Math.pow(f, 0.8));
  function taperedTube(scale: number) {
    const g = new THREE.TubeGeometry(curve, TUBE_SEGS, 1, TUBE_RADIAL, false);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const c = new THREE.Vector3();
    const v = new THREE.Vector3();
    for (let i = 0; i <= TUBE_SEGS; i++) {
      const f = i / TUBE_SEGS;
      curve.getPointAt(f, c);
      for (let j = 0; j <= TUBE_RADIAL; j++) {
        const idx = i * (TUBE_RADIAL + 1) + j;
        v.fromBufferAttribute(pos, idx).sub(c).multiplyScalar(taper(f) * scale).add(c);
        pos.setXYZ(idx, v.x, v.y, v.z);
      }
    }
    g.computeVertexNormals();
    return g;
  }
  const spiralGeo = track(taperedTube(1));
  const spiralMat = track(
    new THREE.MeshToonMaterial({
      color: GOLD,
      gradientMap: ramp,
      emissive: new THREE.Color("#5a4316"),
      transparent: true,
      opacity: 0,
    }),
  );
  spiralTilt.add(new THREE.Mesh(spiralGeo, spiralMat));
  // the bright tip that does the drawing
  const tipMat = track(
    new THREE.SpriteMaterial({ map: glow, color: GOLD_LT, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  const tip = new THREE.Sprite(tipMat);
  tip.scale.setScalar(0.45);
  spiralTilt.add(tip);

  /* ================= animation ================= */
  let clock = 0;
  const tmp = new THREE.Vector3();
  const paws = [frontL.paw, frontR.paw, backL.paw, backR.paw];

  function applyPose(p: Pose, gait: number, gaitAmp: number) {
    hips.rotation.z = p.pitch;
    const swing = Math.sin(gait) * gaitAmp;
    frontL.g.rotation.z = p.fl[0] + swing - p.pitch;
    frontR.g.rotation.z = p.fl[1] - swing - p.pitch;
    backL.g.rotation.z = p.bl[0] - swing - p.pitch;
    backR.g.rotation.z = p.bl[1] + swing - p.pitch;
    frontL.inner.scale.y = frontR.inner.scale.y = p.flLen;
    backL.inner.scale.y = backR.inner.scale.y = p.blLen;
    frontR.inner.scale.y *= p.reach ?? 1;
    // the neck undoes most of the torso pitch so the head stays level
    neck.rotation.z = -p.pitch * 0.85 + p.headPitch;
    head.rotation.set(p.headRoll, p.headYaw, 0);
    tailLinks.forEach((l, i) => {
      l.rotation.z = -p.tail * (0.1 + i * 0.03) - (i === 0 ? p.pitch * 0.7 : 0);
      l.rotation.y = Math.sin(clock * 1.6 - i * 0.45) * 0.07;
    });
  }

  /** Drop the rig onto the floor by its lowest paw. */
  function ground(extra: number) {
    lift.position.y = 0;
    cat.updateMatrixWorld(true);
    let low = Infinity;
    for (const p of paws) low = Math.min(low, p.getWorldPosition(tmp).y);
    // a paw's centre sits about its own half-height above the floor
    lift.position.y = (0.05 - low) / cat.scale.y + extra;
    cat.updateMatrixWorld(true);
  }

  /*
   * Calibrate the swipe to the shell: pose the rig at the top of the swipe
   * for a range of arm angles, keep the one whose paw reaches the shell's
   * height, and seat the cat so that paw lands on it.
   */
  const SWIPE_FACE = -0.55;
  let SWIPE_ARM = 2.4;
  let SIT_X = -0.05;
  let SIT_Z = 0;
  {
    let best = Infinity;
    let reach = new THREE.Vector3();
    for (let arm = 1.4; arm <= 2.9; arm += 0.05) {
      applyPose({ ...SIT, pitch: 1.2, fl: [SIT.fl[0], arm], headPitch: 0.45, reach: 1.35 }, 0, 0);
      cat.position.set(0, 0, 0);
      cat.rotation.y = SWIPE_FACE;
      ground(0);
      const paw = frontR.paw.getWorldPosition(new THREE.Vector3());
      const miss = Math.abs(paw.y - (POLE.y - 0.1));
      if (miss < best) {
        best = miss;
        SWIPE_ARM = arm;
        reach = paw;
      }
    }
    SIT_X = POLE.x - reach.x - 0.08;
    SIT_Z = POLE.z - reach.z;
  }

  /** Where the cat is and what it's doing at loop time t ∈ [0,1). */
  function perform(t: number) {
    let x = SIT_X;
    let z = SIT_Z;
    let face = -1.05; // yaw: 0 faces right, −π/2 faces us, −π faces left
    let pose = SIT;
    let gaitAmp = 0;
    let hop = 0;
    let squash = 1;

    const RUN = [0.04, 0.25];
    if (t >= RUN[0] - 0.012 && t < RUN[1] + 0.03) {
      // stand, then run a loop out into the scene and back: away to the
      // back, round, and home — so it reads in depth, not just side to side
      const up = span(t, RUN[0] - 0.012, RUN[0] + 0.008) * (1 - span(t, RUN[1], RUN[1] + 0.03));
      pose = blend(SIT, STAND, up);
      gaitAmp = 0.55 * up;
      const u = clamp01((t - RUN[0]) / (RUN[1] - RUN[0]));
      const al = u * Math.PI * 2;
      const rx = 0.55;
      const rz = 1.1;
      x = SIT_X + rx * Math.sin(al);
      z = SIT_Z - rz + rz * Math.cos(al);
      const heading = Math.atan2(rz * Math.sin(al), rx * Math.cos(al)); // along the path
      if (t < RUN[0] + 0.012) face = mix(-1.05, 0, span(t, RUN[0] - 0.012, RUN[0] + 0.012));
      else if (t > RUN[1] - 0.004) face = mix(heading, -1.05 - Math.PI * 2, span(t, RUN[1] - 0.004, RUN[1] + 0.025));
      else face = heading;
    } else if (t >= 0.28 && t < 0.37) {
      // the play hop
      const k = (t - 0.28) / 0.09;
      const crouch = Math.sin(clamp01(k / 0.2) * Math.PI);
      const air = clamp01((k - 0.2) / 0.6);
      const land = Math.sin(clamp01((k - 0.8) / 0.2) * Math.PI);
      hop = Math.sin(air * Math.PI) * 0.5 * (k > 0.2 && k < 0.8 ? 1 : 0);
      const inAir = k > 0.2 && k < 0.8 ? Math.sin(air * Math.PI) : 0;
      pose = blend(SIT, { ...STAND, pitch: 0.55, fl: [0.9, 0.7], bl: [-0.6, -0.5], headPitch: 0.35, tail: 1.2 }, inAir);
      squash = 1 - 0.1 * crouch - 0.1 * land + 0.06 * inAir;
      face = -1.05 + inAir * 0.35;
    } else if (t >= 0.38 && t < 0.53) {
      // turn to the shell, then two swipes at it with the near paw
      const turn = span(t, 0.38, 0.41);
      const s1 = Math.sin(span(t, 0.425, 0.465) * Math.PI);
      const s2 = Math.sin(span(t, 0.475, 0.515) * Math.PI);
      const s = Math.max(s1, s2);
      pose = {
        ...SIT,
        pitch: mix(SIT.pitch, 1.2, turn),
        fl: [SIT.fl[0], mix(SIT.fl[1], SWIPE_ARM, s)],
        reach: mix(1, 1.35, s),
        headPitch: mix(SIT.headPitch, 0.45, turn),
        headYaw: mix(SIT.headYaw, 0.15, turn),
        headRoll: 0.18 + 0.12 * s,
      };
      face = mix(-1.05, SWIPE_FACE, turn) * (1 - span(t, 0.515, 0.53)) + -1.05 * span(t, 0.515, 0.53);
    } else if (t >= 0.53) {
      // watch the spiral open: the head follows it up
      const look = span(t, 0.53, 0.7) * (1 - span(t, 0.92, 0.99));
      pose = { ...SIT, headPitch: mix(0.12, 0.75, look), headYaw: mix(0.45, 0.1, look), headRoll: mix(0.1, 0.22, look) };
    }

    return { x, z, face, pose, gaitAmp, hop, squash };
  }

  // dev only: freeze the loop at a fraction, to look at one pose
  let seek: number | null = null;
  if (import.meta.env.DEV) {
    (window as unknown as { __goldenSeek: (t: number | null) => void }).__goldenSeek = (t) => (seek = t);
  }
  let loop = 0; // seconds into the current loop
  let W = 320;
  let H = 620;

  function resize() {
    W = canvas.clientWidth || 320;
    H = canvas.clientHeight || 620;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    // the canvas is taller than the column by this much (see the CSS), so
    // it sees that much more of the world at the same scale
    camera.zoom = 1 / 1.16;
    camera.updateProjectionMatrix();
  }
  resize();

  function update(dt: number) {
    clock += dt;
    loop = reduced ? T * 0.86 : seek !== null ? seek * T : (loop + dt) % T;
    const t = loop / T;

    const act = perform(t);
    const gait = clock * 2 * Math.PI * 3.3;
    applyPose(act.pose, gait, act.gaitAmp);

    cat.position.set(act.x, 0, act.z);
    cat.rotation.y = act.face;
    lift.scale.set(1 / Math.sqrt(act.squash), act.squash, 1 / Math.sqrt(act.squash));
    ground(act.hop + (act.gaitAmp ? Math.abs(Math.sin(gait)) * 0.035 : 0));

    // the pool of light reads the height
    const air = act.hop / 0.5;
    pool.position.set(act.x + Math.cos(act.face) * 0.3, 0.02, act.z - Math.sin(act.face) * 0.3);
    pool.scale.set(1.6 * (1 - air * 0.45), 0.34 * (1 - air * 0.45), 1);
    poolMat.opacity = 0.34 * (1 - air * 0.6);

    // shell: bob, wobble under the swipes, then open out and vanish
    const hit = Math.max(
      Math.sin(span(t, 0.44, 0.5) * Math.PI * 2) * (t > 0.44 && t < 0.5 ? 1 : 0),
      Math.sin(span(t, 0.49, 0.54) * Math.PI * 2) * (t > 0.49 && t < 0.54 ? 1 : 0),
    );
    const open = span(t, 0.53, 0.62);
    const back = span(t, 0.94, 0.99);
    const shellShown = reduced ? 0 : (1 - open) + back * open;
    shellRoot.visible = shellShown > 0.01;
    shellRoot.scale.setScalar(Math.max(0.001, (1 + open * (1 - back) * 1.4) * (shellShown > 0 ? 1 : 0)));
    shellSpin.rotation.set(Math.sin(clock * 0.7) * 0.25, Math.sin(clock * 0.5) * 0.45, hit * 0.4 + clock * 0.15);
    shellRoot.position.y = POLE.y + Math.sin(clock * 1.4) * 0.04;
    shellGlowMat.opacity = 0.4 * shellShown;
    shellRoot.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined;
      if (m && "opacity" in m && o !== shellGlow) {
        m.transparent = shellShown < 0.99;
        m.opacity = shellShown;
      }
    });

    // spiral: draw out from the pole, hold, fade
    const draw = reduced ? 1 : span(t, 0.535, 0.8);
    const fade = reduced ? 1 : 1 - span(t, 0.92, 0.97);
    const segs = Math.max(1, Math.round(draw * TUBE_SEGS));
    spiralGeo.setDrawRange(0, segs * TUBE_RADIAL * 6);
    spiralMat.opacity = (draw > 0 ? 1 : 0) * fade;
    spiralMat.transparent = spiralMat.opacity < 0.99;
    curve.getPointAt(segs / TUBE_SEGS, tip.position);
    tipMat.opacity = draw > 0 && draw < 1 ? 0.95 : 0;
    // it turns in space, so the cone reads as depth
    spiralTilt.rotation.y = reduced ? 0.25 : Math.sin(clock * 0.35) * 0.38;
    spiralTilt.rotation.x = reduced ? 0.12 : 0.12 + Math.sin(clock * 0.23) * 0.1;
  }

  let raf = 0;
  let last = performance.now();
  let visible = true;
  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (visible) {
      update(dt);
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  // only animate while it is on screen
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    last = performance.now();
  });
  io.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
