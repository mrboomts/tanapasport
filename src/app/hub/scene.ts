import * as THREE from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { SOLIDS } from "../grand/platonic";

/**
 * The hub's WebGL scene. Loaded lazily (this module is the only importer of
 * three), so the first paint of the page never waits on it.
 *
 * Everything is real geometry, lit: struts are metal tubes and nodes are
 * metal spheres, reflecting a generated studio environment, with a warm key
 * light and a violet rim to match the aurora. Glow is a second, wider,
 * additive tube around each strut (no post-processing, so the canvas stays
 * transparent over the CSS aurora and phones stay cool), and depth fog dims
 * whatever is further away so the eye reads the volume.
 *
 * The five Platonic solids *are* the menu: each floats on a "slot" — a DOM
 * rect inside its menu button. At the centre:
 *
 *   Flower of Life   a ring of 19 gold circles, tilted like a portal and
 *                    turning on its own axis, set back behind…
 *   Metatron's Cube  in three dimensions: 13 spheres packed as a
 *                    cuboctahedron (centre + 12), every pair joined — 78
 *                    struts. Seen down its 3-fold axis it becomes the
 *                    familiar flat figure.
 *
 * Choosing a room: that solid lifts off its slot and flies to the centre,
 * growing and spinning up, while the flower blooms, Metatron's spheres pop
 * in and its struts draw, and the cube swings round to its classic face-on
 * view → the solid bursts into gold dust and glides off to rest behind the
 * room. One clock drives it all, easing from wherever things are, so
 * interrupting is free.
 */

export type Stage = { x: number; y: number; w: number; h: number };

export type HubScene = {
  setStage(which: "hub" | "room", rect: Stage): void;
  setSlots(rects: (Stage | null)[]): void;
  setHover(solid: number | null): void;
  enter(solid: number, opts?: { instant?: boolean }): void;
  leave(): void;
  skip(): void;
  dispose(): void;
};

const GOLD = new THREE.Color("#e9c877");
const GOLD_LT = new THREE.Color("#f7e2a8");
const METAL = new THREE.Color("#ffd27a");
const INK = new THREE.Color("#0a0912");

/** The centre layer is built inside this radius. */
const BOUND = 1.7;

/** Seconds from click to the solid coming to rest behind the room. */
export const SEQ_END = 1.45;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3);
const easeInOut = (v: number) => {
  const t = clamp01(v);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
/** 0 → 1 over [a, b] seconds, eased. */
const ramp = (s: number, a: number, b: number) => easeOut((s - a) / (b - a));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** A soft round sprite, so points read as dust rather than squares. */
function dustTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,244,214,0.8)");
  grad.addColorStop(1, "rgba(255,244,214,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const polar = (r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [r * Math.cos(a), r * Math.sin(a)];
};

/** Flower of Life: centre, ring at R, then the 12 of the second ring. */
function flowerCenters(R: number) {
  const out: { c: [number, number]; ring: number }[] = [{ c: [0, 0], ring: 0 }];
  for (let k = 0; k < 6; k++) out.push({ c: polar(R, 90 + k * 60), ring: 1 });
  for (let k = 0; k < 6; k++) out.push({ c: polar(Math.sqrt(3) * R, 120 + k * 60), ring: 2 });
  for (let k = 0; k < 6; k++) out.push({ c: polar(2 * R, 90 + k * 60), ring: 2 });
  return out;
}

/** One strut: an open cylinder from a to b. */
function strut(a: THREE.Vector3, b: THREE.Vector3, r: number, radial: number) {
  const g = new THREE.CylinderGeometry(r, r, a.distanceTo(b), radial, 1, true);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  g.applyMatrix4(new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1)));
  return g;
}

/** All struts of a frame merged into one geometry, in order (so draw range can "draw" them). */
function frame(pairs: [THREE.Vector3, THREE.Vector3][], r: number, radial: number) {
  const parts = pairs.map(([a, b]) => strut(a, b, r, radial));
  const merged = mergeGeometries(parts)!;
  parts.forEach((p) => p.dispose());
  return { geo: merged, perStrut: radial * 6 };
}

type SolidObj = {
  root: THREE.Group;
  spin: THREE.Group;
  metal: THREE.MeshStandardMaterial;
  halo: THREE.MeshBasicMaterial;
  face: THREE.MeshBasicMaterial;
  segments: [THREE.Vector3, THREE.Vector3][];
  x: number;
  y: number;
  s: number;
  alpha: number;
  glow: number;
  placed: boolean;
};

type Place = { x: number; y: number; s: number };

export function createHubScene(
  canvas: HTMLCanvasElement,
  opts: { reduced: boolean; lite: boolean },
): HubScene {
  const { reduced, lite } = opts;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.75 : 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 8);
  const halfH = Math.tan(THREE.MathUtils.degToRad(35 / 2)) * 8;
  // depth cue: whatever sits further back fades toward the ink
  scene.fog = new THREE.Fog(INK, 6.9, 10.6);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(d: T) => {
    disposables.push(d);
    return d;
  };
  const sprite = track(dustTexture());

  // reflections + light
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = track(pmrem.fromScene(new RoomEnvironment(), 0.04).texture);
  pmrem.dispose();
  scene.environment = env;
  const key = new THREE.DirectionalLight(0xfff0d6, 2.2);
  key.position.set(-3, 4, 5);
  const rim = new THREE.PointLight(0x7c5cff, 18, 14, 1.6);
  rim.position.set(4, -2, -2);
  scene.add(key, rim, new THREE.AmbientLight(0x2a2440, 0.6));

  const metalMat = (opacity = 0) =>
    track(
      new THREE.MeshStandardMaterial({
        color: METAL,
        metalness: 1,
        roughness: 0.26,
        envMapIntensity: 1.25,
        transparent: true,
        opacity,
      }),
    );
  const haloMat = (color = GOLD, opacity = 0) =>
    track(
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
  const radial = lite ? 5 : 8;

  /* ---------- centre ---------- */
  const sacredRoot = new THREE.Group();
  scene.add(sacredRoot);

  // Flower of Life — a tilted, turning portal set back behind the cube
  const folTilt = new THREE.Group();
  folTilt.position.z = -0.9;
  folTilt.rotation.set(-0.5, 0.38, 0);
  sacredRoot.add(folTilt);
  const fol = new THREE.Group();
  folTilt.add(fol);

  const folR = 0.55;
  const torusGeo = track(new THREE.TorusGeometry(1, 0.022, lite ? 5 : 8, lite ? 72 : 110));
  const torusHaloGeo = track(new THREE.TorusGeometry(1, 0.075, 4, lite ? 60 : 90));
  const folMetal = metalMat();
  const folHalo = haloMat();
  const ring = (r: number, glow = true) => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(torusGeo, folMetal));
    if (glow) g.add(new THREE.Mesh(torusHaloGeo, folHalo));
    g.scale.setScalar(r);
    return g;
  };
  const petals = flowerCenters(folR).map(({ c, ring: n }, i) => {
    const g = ring(folR);
    g.position.set(c[0], c[1], 0);
    fol.add(g);
    // centre first, then each ring, going round
    return { g, delay: n === 0 ? 0 : n === 1 ? 0.05 + (i - 1) * 0.018 : 0.14 + (i - 7) * 0.012 };
  });
  // the rim is scaled 3×, so its glow would be 3× as thick — leave it bare
  const folRim = ring(folR * 3, false);
  fol.add(folRim);

  // Metatron's Cube, in 3D: 13 spheres packed as a cuboctahedron
  const MET_D = 1.3;
  const metSpinG = new THREE.Group();
  sacredRoot.add(metSpinG);
  const met = new THREE.Group();
  // turn the 3-fold axis toward the viewer, so "spin 0" is the classic face
  met.quaternion.setFromUnitVectors(new THREE.Vector3(1, 1, 1).normalize(), new THREE.Vector3(0, 0, 1));
  metSpinG.add(met);

  const nodes: THREE.Vector3[] = [new THREE.Vector3()];
  for (const [a, b] of [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]) {
    nodes.push(new THREE.Vector3(a, b, 0), new THREE.Vector3(a, 0, b), new THREE.Vector3(0, a, b));
  }
  nodes.forEach((v) => v.multiplyScalar(v.length() ? MET_D / Math.SQRT2 : 0));

  const pairs: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) pairs.push([nodes[i], nodes[j]]);
  // outer struts first, so the drawing grows from the rim inward
  pairs.sort((p, q) => p[0].length() + p[1].length() < q[0].length() + q[1].length() ? 1 : -1);

  const metFrame = frame(pairs, 0.01, radial);
  const metHaloFrame = frame(pairs, 0.032, 4);
  track(metFrame.geo);
  track(metHaloFrame.geo);
  const metMetal = metalMat();
  const metHalo = haloMat(GOLD_LT);
  const metLines = new THREE.Mesh(metFrame.geo, metMetal);
  const metLinesHalo = new THREE.Mesh(metHaloFrame.geo, metHalo);
  met.add(metLines, metLinesHalo);

  const ballGeo = track(new THREE.SphereGeometry(1, lite ? 14 : 24, lite ? 10 : 16));
  const nodeMetal = metalMat();
  const nodeGlowMat = track(
    new THREE.SpriteMaterial({
      map: sprite,
      color: GOLD_LT,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  const balls = nodes.map((v, i) => {
    const g = new THREE.Group();
    g.position.copy(v);
    const ball = new THREE.Mesh(ballGeo, nodeMetal);
    ball.scale.setScalar(i === 0 ? 0.14 : 0.11);
    const glow = new THREE.Sprite(nodeGlowMat);
    glow.scale.setScalar(0.55);
    g.add(ball, glow);
    met.add(g);
    return { g, delay: 0.3 + (i === 0 ? 0 : 0.02 + (i - 1) * 0.014) };
  });

  /* ---------- the five solids — the menu itself ---------- */
  const solids: SolidObj[] = SOLIDS.map((s, n) => {
    const root = new THREE.Group();
    const spin = new THREE.Group();
    root.add(spin);
    scene.add(root);

    const verts = s.vertices.map((v) => new THREE.Vector3(v[0], v[1], v[2]));
    const segments = s.edges.map(([a, b]) => [verts[a], verts[b]] as [THREE.Vector3, THREE.Vector3]);

    const metal = metalMat();
    const halo = haloMat();
    const f = frame(segments, 0.034, radial);
    const h = frame(segments, 0.075, 4);
    track(f.geo);
    track(h.geo);
    spin.add(new THREE.Mesh(f.geo, metal), new THREE.Mesh(h.geo, halo));

    const joints = mergeGeometries(
      verts.map((v) => new THREE.SphereGeometry(0.075, 12, 8).translate(v.x, v.y, v.z)),
    )!;
    track(joints);
    spin.add(new THREE.Mesh(joints, metal));

    const face = track(
      new THREE.MeshBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    spin.add(new THREE.Mesh(track(new ConvexGeometry(verts)), face));

    spin.rotation.set(0.45 + n * 0.13, n * 1.1, 0);
    return { root, spin, metal, halo, face, segments, x: 0, y: 0, s: 0.001, alpha: 0, glow: 0, placed: false };
  });

  /* ---------- gold dust: ambient field ---------- */
  const DUST = lite ? 260 : 900;
  const dustPos = new Float32Array(DUST * 3);
  const dustVel = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 18;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 11;
    dustPos[i * 3 + 2] = -6 + Math.random() * 9;
    dustVel[i] = 0.04 + Math.random() * 0.12;
  }
  const dustGeo = track(new THREE.BufferGeometry());
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    track(
      new THREE.PointsMaterial({
        map: sprite,
        color: GOLD,
        size: lite ? 0.07 : 0.055,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      }),
    ),
  );
  scene.add(dust);

  /* ---------- gold dust: the burst when a solid dissolves ---------- */
  const BURST = lite ? 160 : 420;
  const burstPos = new Float32Array(BURST * 3);
  const burstVel = new Float32Array(BURST * 3);
  const burstGeo = track(new THREE.BufferGeometry());
  burstGeo.setAttribute("position", new THREE.BufferAttribute(burstPos, 3));
  const burstMat = track(
    new THREE.PointsMaterial({
      map: sprite,
      color: GOLD_LT,
      size: 0.09,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  const burst = new THREE.Points(burstGeo, burstMat);
  scene.add(burst);
  let burstAge = Infinity;

  function fireBurst(sol: SolidObj) {
    const q = sol.spin.quaternion;
    const tmp = new THREE.Vector3();
    for (let i = 0; i < BURST; i++) {
      const [a, b] = sol.segments[i % sol.segments.length];
      tmp.lerpVectors(a, b, Math.random()).applyQuaternion(q);
      const n = tmp.clone().normalize();
      tmp.multiplyScalar(sol.s);
      burstPos[i * 3] = sol.x + tmp.x;
      burstPos[i * 3 + 1] = sol.y + tmp.y;
      burstPos[i * 3 + 2] = tmp.z;
      const speed = (0.4 + Math.random() * 1.3) * Math.max(sol.s, 0.6);
      burstVel[i * 3] = n.x * speed + (Math.random() - 0.5) * 0.5;
      burstVel[i * 3 + 1] = n.y * speed + (Math.random() - 0.5) * 0.5 + 0.2;
      burstVel[i * 3 + 2] = n.z * speed + (Math.random() - 0.5) * 0.5;
    }
    burstGeo.attributes.position.needsUpdate = true;
    burstAge = 0;
  }

  /* ---------- state ---------- */
  let W = 1;
  let H = 1;
  const stages: Record<"hub" | "room", Stage | null> = { hub: null, room: null };
  let slots: (Stage | null)[] = [];
  let mode: "hub" | "room" = "hub";
  let hover: number | null = null;
  let target: number | null = null;
  let seqStart = -Infinity;
  let burstFired = true;
  let seqFrom: Place = { x: 0, y: 0, s: 1 };
  let clock = 0;
  let metSpin = 0.6;
  let metSpinFrom = 0;
  let metSpinTo = 0;

  const cur = {
    fol: 0,
    met: 0,
    metDraw: 1,
    bloom: petals.map(() => 1),
    pop: balls.map(() => 1),
    x: 0,
    y: 0,
    s: 0.001,
  };

  let px = 0;
  let py = 0;
  let tpx = 0;
  let tpy = 0;

  /**
   * A DOM rect → a centre in world units and a world radius. `reach` lets
   * a tall, narrow stage (the desktop centre column) use more of its
   * height than a plain inscribed circle would.
   */
  function place(stage: Stage | null | undefined, reach = 0): Place {
    const halfW = halfH * (W / H);
    if (!stage || stage.w < 2) return { x: 0, y: 0, s: halfH * 0.5 };
    const cx = stage.x + stage.w / 2;
    const cy = stage.y + stage.h / 2;
    const px =
      reach && stage.h > stage.w * 1.6
        ? Math.min((stage.w / 2) * (1 + reach), stage.h / 2)
        : (Math.min(stage.w, stage.h) / 2) * (reach ? 0.86 : 1);
    return {
      x: (cx / W) * 2 * halfW - halfW,
      y: halfH - (cy / H) * 2 * halfH,
      s: (px / H) * 2 * halfH,
    };
  }
  const hubPlace = () => place(stages.hub, 0.18);

  /** The big solid at the centre sits with its corners among Metatron's spheres. */
  const centreSolid = (): Place => {
    const c = hubPlace();
    return { x: c.x, y: c.y, s: (c.s * MET_D) / BOUND };
  };
  const restPlace = (): Place => {
    const r = place(stages.room);
    return { x: r.x, y: r.y, s: r.s * 0.8 };
  };
  const restAlpha = () => (lite ? 0.26 : 0.32);

  function resize() {
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  }
  resize();

  /* ---------- the clock ---------- */
  let running = false;
  let raf = 0;
  let last = performance.now();
  let restFrames = 0;

  function tick(now: number) {
    // The starfield keeps drifting behind every room. On light devices,
    // once a room has settled, it drops to ~30 fps to spare the battery.
    const settled = lite && mode === "room" && (now - seqStart) / 1000 > SEQ_END + 0.5;
    if (settled && ++restFrames % 2) {
      raf = requestAnimationFrame(tick);
      return;
    }
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt, now);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  function wake() {
    if (running) return;
    running = true;
    restFrames = 0;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function update(dt: number, now: number) {
    clock += dt;
    const s = (now - seqStart) / 1000;
    const inSeq = mode === "room" && s < SEQ_END && !reduced;
    const rate = reduced ? 1 : 1 - Math.exp(-dt * 6);
    const fast = reduced ? 1 : 1 - Math.exp(-dt * 14);
    const centre = hubPlace();

    // pointer parallax
    px += (tpx - px) * (1 - Math.exp(-dt * 3));
    py += (tpy - py) * (1 - Math.exp(-dt * 3));
    if (!reduced) {
      sacredRoot.rotation.y = px * 0.35;
      sacredRoot.rotation.x = py * 0.25;
      dust.position.x = -px * 0.35;
      dust.position.y = py * 0.22;
    }

    /* ----- centre layer ----- */
    if (inSeq) {
      petals.forEach((p, i) => {
        cur.bloom[i] = easeOut((s - 0.12 - p.delay) / 0.26);
      });
      balls.forEach((b, i) => {
        cur.pop[i] = easeOut((s - b.delay) / 0.2);
      });
      cur.fol = 0.85 * ramp(s, 0.12, 0.25) * (1 - ramp(s, 0.85, 1.12));
      cur.metDraw = ramp(s, 0.36, 0.7);
      cur.met = 0.75 * ramp(s, 0.3, 0.4) * (1 - ramp(s, 0.9, 1.15));
      // swing round to the classic face-on view as the lines finish
      metSpin = mix(metSpinFrom, metSpinTo, easeInOut((s - 0.2) / 0.55));
    } else {
      const inHub = mode === "hub";
      const goalFol = inHub ? (hover === null ? 0.6 : 0.85) : 0;
      const goalMet = inHub ? (hover === null ? 0.55 : 0.8) : 0;
      cur.fol += (goalFol - cur.fol) * rate;
      cur.met += (goalMet - cur.met) * rate;
      cur.metDraw += (1 - cur.metDraw) * rate;
      cur.bloom.forEach((b, i) => (cur.bloom[i] += (1 - b) * rate));
      cur.pop.forEach((b, i) => (cur.pop[i] += (1 - b) * rate));
      if (!reduced) metSpin += dt * (hover === null ? 0.14 : 0.3);
    }
    cur.x += (centre.x - cur.x) * rate;
    cur.y += (centre.y - cur.y) * rate;
    cur.s += (centre.s / BOUND - cur.s) * rate;
    sacredRoot.position.set(cur.x, cur.y, 0);
    sacredRoot.scale.setScalar(Math.max(cur.s, 0.001));

    petals.forEach((p, i) => p.g.scale.setScalar(folR * Math.max(cur.bloom[i], 0.001)));
    folRim.scale.setScalar(folR * 3 * Math.max(inSeq ? ramp(s, 0.28, 0.55) : 1, 0.001));
    fol.visible = cur.fol > 0.003;
    folMetal.opacity = cur.fol;
    folMetal.depthWrite = cur.fol > 0.97;
    folHalo.opacity = cur.fol * 0.16;
    if (!reduced) fol.rotation.z += dt * 0.08;

    met.visible = cur.met > 0.003;
    metMetal.opacity = cur.met;
    metMetal.depthWrite = cur.met > 0.97;
    metHalo.opacity = cur.met * 0.1;
    nodeMetal.opacity = cur.met;
    nodeGlowMat.opacity = cur.met * 0.5;
    const drawn = Math.round(cur.metDraw * pairs.length);
    metFrame.geo.setDrawRange(0, drawn * metFrame.perStrut);
    metHaloFrame.geo.setDrawRange(0, drawn * metHaloFrame.perStrut);
    balls.forEach((b, i) => b.g.scale.setScalar(Math.max(cur.pop[i], 0.001)));
    metSpinG.rotation.y = metSpin;
    metSpinG.rotation.x = reduced ? 0.2 : Math.sin(clock * 0.21) * 0.25;
    if (inSeq) metSpinG.rotation.x *= 1 - ramp(s, 0.2, 0.75);

    /* ----- the solids ----- */
    const boost = inSeq ? 3.2 * ramp(s, 0.05, 0.35) * (1 - ramp(s, 0.95, SEQ_END)) : 0;
    solids.forEach((sol, i) => {
      const slot = place(slots[i]);
      let goal: Place;
      let goalAlpha: number;
      let goalGlow = 0;

      if (mode === "hub") {
        const on = hover === i;
        const bob = reduced ? 0 : Math.sin(clock * 1.3 + i * 1.7) * slot.s * 0.06;
        goal = { x: slot.x, y: slot.y + bob, s: slot.s * (on ? 1.12 : 0.92) };
        goalAlpha = hover === null || on ? 1 : 0.55;
        goalGlow = on ? 1 : 0;
      } else if (i === target) {
        goal = restPlace();
        goalAlpha = restAlpha();
      } else {
        goal = { x: slot.x, y: slot.y, s: slot.s * 0.4 };
        goalAlpha = 0;
      }

      if (!sol.placed && slots[i]) Object.assign(sol, goal, { placed: true });

      if (inSeq && i === target) {
        // lift off → centre, growing; hold; then off to rest
        const toCentre = easeInOut(s / 0.6);
        const toRest = easeInOut((s - 0.98) / (SEQ_END - 0.98));
        const c = centreSolid();
        const r = restPlace();
        const fx = mix(seqFrom.x, c.x, toCentre);
        const fy = mix(seqFrom.y, c.y, toCentre) + Math.sin(Math.PI * toCentre) * c.s * 0.12;
        const fs = mix(seqFrom.s, c.s, toCentre);
        sol.x = mix(fx, r.x, toRest);
        sol.y = mix(fy, r.y, toRest);
        sol.s = mix(fs, r.s, toRest);
        sol.alpha = mix(1, restAlpha(), ramp(s, 0.98, SEQ_END));
        sol.glow = ramp(s, 0.1, 0.5) * (1 - ramp(s, 0.95, 1.2));
      } else {
        const k = i === target || mode === "hub" ? rate : fast;
        sol.x += (goal.x - sol.x) * k;
        sol.y += (goal.y - sol.y) * k;
        sol.s += (goal.s - sol.s) * k;
        sol.alpha += (goalAlpha - sol.alpha) * k;
        sol.glow += (goalGlow - sol.glow) * k;
      }

      const visible = sol.alpha > 0.003 && sol.s > 0.002;
      sol.root.visible = visible;
      if (!visible) return;
      sol.root.position.set(sol.x, sol.y, 0);
      sol.root.scale.setScalar(sol.s);
      sol.root.rotation.y = reduced ? 0 : px * 0.3;
      sol.root.rotation.x = reduced ? 0 : py * 0.22;
      sol.metal.opacity = sol.alpha;
      sol.metal.depthWrite = sol.alpha > 0.97;
      sol.metal.emissive.copy(GOLD).multiplyScalar(0.1 + sol.glow * 0.12);
      sol.halo.opacity = sol.alpha * (0.12 + sol.glow * 0.06);
      sol.face.opacity = sol.alpha * (0.04 + sol.glow * 0.02);
      if (!reduced) {
        const b = i === target ? boost : 0;
        sol.spin.rotation.y += dt * (0.3 + sol.glow * 0.6 + b);
        sol.spin.rotation.x += dt * (0.09 + b * 0.35);
      }
    });

    if (!burstFired && inSeq && s >= 0.98 && target !== null) {
      burstFired = true;
      fireBurst(solids[target]);
    }

    // ambient dust drifts upward and wraps
    if (!reduced) {
      for (let i = 0; i < DUST; i++) {
        const iy = i * 3 + 1;
        dustPos[iy] += dustVel[i] * dt;
        if (dustPos[iy] > 5.5) dustPos[iy] = -5.5;
      }
      dustGeo.attributes.position.needsUpdate = true;
    }

    if (burstAge < 1.2) {
      burstAge += dt;
      const drag = Math.exp(-dt * 1.6);
      for (let i = 0; i < BURST * 3; i++) {
        burstPos[i] += burstVel[i] * dt;
        burstVel[i] *= drag;
      }
      burstGeo.attributes.position.needsUpdate = true;
      burstMat.opacity = 0.95 * (1 - clamp01(burstAge / 1.2));
      burst.visible = true;
    } else {
      burst.visible = false;
    }
  }

  /* ---------- inputs ---------- */
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    tpx = (e.clientX / W) * 2 - 1;
    tpy = (e.clientY / H) * 2 - 1;
  };
  const onResize = () => {
    resize();
    wake();
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("resize", onResize);
  wake();

  function snapToRest(solid: number) {
    const r = restPlace();
    solids.forEach((sol, i) => {
      if (i === solid) Object.assign(sol, r, { alpha: restAlpha(), glow: 0 });
      else sol.alpha = 0;
    });
    cur.fol = 0;
    cur.met = 0;
  }

  return {
    setStage(which, rect) {
      stages[which] = rect;
      if (which === "hub" && cur.s < 0.01) {
        stages.hub = rect;
        const c = hubPlace();
        Object.assign(cur, { x: c.x, y: c.y, s: c.s / BOUND });
      }
      wake();
    },
    setSlots(rects) {
      slots = rects;
      wake();
    },
    setHover(solid) {
      hover = solid;
      wake();
    },
    enter(solid, o) {
      const sol = solids[solid];
      seqFrom = { x: sol.x, y: sol.y, s: sol.s };
      mode = "room";
      target = solid;
      // the spin is about the vertical, and the cuboctahedron is centrally
      // symmetric, so its classic face comes back every half turn
      metSpinFrom = metSpin;
      metSpinTo = Math.ceil(metSpin / Math.PI) * Math.PI;
      if (o?.instant || reduced) {
        seqStart = performance.now() - SEQ_END * 1000 - 1;
        burstFired = true;
        snapToRest(solid);
      } else {
        seqStart = performance.now();
        burstFired = false;
      }
      wake();
    },
    leave() {
      mode = "hub";
      seqStart = -Infinity;
      wake();
    },
    skip() {
      if (mode !== "room") return;
      const now = performance.now();
      if ((now - seqStart) / 1000 < SEQ_END) {
        if (!burstFired && target !== null) {
          burstFired = true;
          fireBurst(solids[target]);
        }
        seqStart = now - SEQ_END * 1000;
      }
      wake();
    },
    dispose() {
      cancelAnimationFrame(raf);
      running = false;
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
