import * as THREE from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import { SOLIDS } from "../grand/platonic";

/**
 * The hub's WebGL scene. Loaded lazily (this module is the only importer of
 * three), so the first paint of the page never waits on it.
 *
 * The five Platonic solids *are* the menu: each one floats on a "slot" — a
 * DOM rect inside its menu button — so layout stays in CSS and the scene
 * follows it. At the centre sits the Flower of Life with Metatron's Cube
 * drawn over it.
 *
 * Choosing a room plays: that solid lifts off its slot and flies to the
 * centre, growing and spinning up, while the flower blooms behind it and
 * Metatron's lines draw → it bursts into gold dust and glides off to rest
 * behind the room. Everything is driven from one clock and eases from
 * wherever it currently is, so interrupting is free.
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

/** The flower/cube layer is built inside this radius. */
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

function additive(color: THREE.Color, opacity = 0) {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

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

function unitCircle(segments = 96) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
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

/** Fruit of Life — the 13 centres Metatron's Cube joins up. */
function fruitCenters(r: number) {
  const out: [number, number][] = [[0, 0]];
  for (let k = 0; k < 6; k++) out.push(polar(2 * r, 90 + k * 60));
  for (let k = 0; k < 6; k++) out.push(polar(4 * r, 90 + k * 60));
  return out;
}

type SolidObj = {
  root: THREE.Group;
  spin: THREE.Group;
  edgeMat: THREE.LineBasicMaterial;
  faceMat: THREE.MeshBasicMaterial;
  dotMat: THREE.PointsMaterial;
  segments: [THREE.Vector3, THREE.Vector3][];
  /** current placement, in world units (s = world radius) */
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

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 8);
  const halfH = Math.tan(THREE.MathUtils.degToRad(35 / 2)) * 8;

  const sprite = dustTexture();
  const disposables: { dispose(): void }[] = [sprite];
  const track = <T extends { dispose(): void }>(d: T) => {
    disposables.push(d);
    return d;
  };

  /* ---------- centre: Flower of Life + Metatron's Cube ---------- */
  const sacredRoot = new THREE.Group();
  const sacred = new THREE.Group();
  sacredRoot.add(sacred);
  scene.add(sacredRoot);

  const circleGeo = track(unitCircle());
  const folMat = track(additive(GOLD, 0));
  const folR = 0.55;
  const petals = flowerCenters(folR).map(({ c, ring }, i) => {
    const loop = new THREE.LineLoop(circleGeo, folMat);
    loop.position.set(c[0], c[1], 0);
    loop.scale.setScalar(folR);
    sacred.add(loop);
    // centre first, then each ring, going round
    return { loop, delay: ring === 0 ? 0 : ring === 1 ? 0.05 + (i - 1) * 0.018 : 0.14 + (i - 7) * 0.012 };
  });
  const rim = new THREE.LineLoop(circleGeo, folMat);
  rim.scale.setScalar(folR * 3);
  sacred.add(rim);

  const metR = 0.34;
  const fruit = fruitCenters(metR);
  const metCircleMat = track(additive(GOLD, 0));
  const metCircles = fruit.map(([x, y]) => {
    const loop = new THREE.LineLoop(circleGeo, metCircleMat);
    loop.position.set(x, y, 0.001);
    loop.scale.setScalar(metR);
    sacred.add(loop);
    return loop;
  });
  const metPos: number[] = [];
  for (let i = 0; i < fruit.length; i++) {
    for (let j = i + 1; j < fruit.length; j++) {
      metPos.push(fruit[i][0], fruit[i][1], 0, fruit[j][0], fruit[j][1], 0);
    }
  }
  const metGeo = track(new THREE.BufferGeometry());
  metGeo.setAttribute("position", new THREE.Float32BufferAttribute(metPos, 3));
  const metLineCount = metPos.length / 6;
  const metMat = track(additive(GOLD_LT, 0));
  sacred.add(new THREE.LineSegments(metGeo, metMat));

  /* ---------- the five solids — the menu itself ---------- */
  const solids: SolidObj[] = SOLIDS.map((s, n) => {
    const root = new THREE.Group();
    const spin = new THREE.Group();
    root.add(spin);
    scene.add(root);

    // unit radius; root.scale carries the world size
    const verts = s.vertices.map((v) => new THREE.Vector3(v[0], v[1], v[2]));
    const pos: number[] = [];
    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    for (const [a, b] of s.edges) {
      pos.push(verts[a].x, verts[a].y, verts[a].z, verts[b].x, verts[b].y, verts[b].z);
      segments.push([verts[a], verts[b]]);
    }
    const edgeGeo = track(new THREE.BufferGeometry());
    edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    const edgeMat = track(additive(GOLD_LT, 0));
    spin.add(new THREE.LineSegments(edgeGeo, edgeMat));

    const faceGeo = track(new ConvexGeometry(verts));
    const faceMat = track(
      new THREE.MeshBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    spin.add(new THREE.Mesh(faceGeo, faceMat));

    const dotGeo = track(new THREE.BufferGeometry().setFromPoints(verts));
    const dotMat = track(
      new THREE.PointsMaterial({
        map: sprite,
        color: GOLD_LT,
        size: 0.16,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    spin.add(new THREE.Points(dotGeo, dotMat));

    spin.rotation.set(0.45 + n * 0.13, n * 1.1, 0);
    return { root, spin, edgeMat, faceMat, dotMat, segments, x: 0, y: 0, s: 0.001, alpha: 0, glow: 0, placed: false };
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
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
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
      size: 0.08,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
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

  const cur = { fol: 0, met: 0, metDraw: 1, bloom: petals.map(() => 1), x: 0, y: 0, s: 0.001 };

  let px = 0;
  let py = 0;
  let tpx = 0;
  let tpy = 0;

  /** A DOM rect → a centre in world units and the world radius of its inscribed circle. */
  function place(stage: Stage | null | undefined): Place {
    const halfW = halfH * (W / H);
    if (!stage || stage.w < 2) return { x: 0, y: 0, s: halfH * 0.5 };
    const cx = stage.x + stage.w / 2;
    const cy = stage.y + stage.h / 2;
    return {
      x: (cx / W) * 2 * halfW - halfW,
      y: halfH - (cy / H) * 2 * halfH,
      s: (Math.min(stage.w, stage.h) / 2 / H) * 2 * halfH,
    };
  }

  /** The big solid at the centre fills most of the flower behind it. */
  const centreSolid = (): Place => {
    const c = place(stages.hub);
    return { x: c.x, y: c.y, s: c.s * 0.9 };
  };
  const restPlace = (): Place => {
    const r = place(stages.room);
    return { x: r.x, y: r.y, s: r.s * 0.8 };
  };
  const restAlpha = () => (lite ? 0.35 : 0.5);

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

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt, now);
    renderer.render(scene, camera);

    // On light devices there is no need to keep drawing a still picture
    // behind a room someone is reading. It wakes on any state change.
    const settled = lite && mode === "room" && (now - seqStart) / 1000 > SEQ_END + 1.2;
    restFrames = settled ? restFrames + 1 : 0;
    if (restFrames > 2) {
      running = false;
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function wake() {
    if (running) return;
    running = true;
    restFrames = 0;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function update(dt: number, now: number) {
    clock += dt;
    const s = (now - seqStart) / 1000;
    const inSeq = mode === "room" && s < SEQ_END && !reduced;
    const rate = reduced ? 1 : 1 - Math.exp(-dt * 6);
    const fast = reduced ? 1 : 1 - Math.exp(-dt * 14);
    const centre = place(stages.hub);

    // pointer parallax
    px += (tpx - px) * (1 - Math.exp(-dt * 3));
    py += (tpy - py) * (1 - Math.exp(-dt * 3));
    if (!reduced) {
      sacredRoot.rotation.y = px * 0.28;
      sacredRoot.rotation.x = py * 0.2;
      dust.position.x = -px * 0.35;
      dust.position.y = py * 0.22;
    }

    /* ----- centre layer ----- */
    if (inSeq) {
      // the flower blooms behind the arriving solid, centre first
      petals.forEach((p, i) => {
        cur.bloom[i] = easeOut((s - 0.12 - p.delay) / 0.26);
        p.loop.scale.setScalar(folR * Math.max(cur.bloom[i], 0.001));
      });
      rim.scale.setScalar(folR * 3 * Math.max(ramp(s, 0.28, 0.55), 0.001));
      cur.fol = 0.95 * ramp(s, 0.12, 0.25) * (1 - ramp(s, 0.75, 1.05));
      cur.metDraw = ramp(s, 0.3, 0.64);
      cur.met = 0.9 * ramp(s, 0.3, 0.42) * (1 - ramp(s, 0.85, 1.1));
    } else {
      const inHub = mode === "hub";
      const goalFol = inHub ? (hover === null ? 0.42 : 0.6) : 0;
      const goalMet = inHub ? (hover === null ? 0.18 : 0.3) : 0;
      cur.fol += (goalFol - cur.fol) * rate;
      cur.met += (goalMet - cur.met) * rate;
      cur.metDraw += (1 - cur.metDraw) * rate;
      petals.forEach((p, i) => {
        cur.bloom[i] += (1 - cur.bloom[i]) * rate;
        p.loop.scale.setScalar(folR * Math.max(cur.bloom[i], 0.001));
      });
      rim.scale.setScalar(folR * 3);
    }
    cur.x += (centre.x - cur.x) * rate;
    cur.y += (centre.y - cur.y) * rate;
    cur.s += (centre.s / BOUND - cur.s) * rate;
    sacredRoot.position.set(cur.x, cur.y, 0);
    sacredRoot.scale.setScalar(Math.max(cur.s, 0.001));
    folMat.opacity = cur.fol;
    metCircleMat.opacity = cur.met * 0.55;
    metMat.opacity = cur.met;
    metGeo.setDrawRange(0, Math.round(cur.metDraw * metLineCount) * 2);
    metCircles.forEach((c) => (c.visible = cur.met > 0.002));
    if (!reduced) sacred.rotation.z += dt * 0.025;

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
        goalAlpha = hover === null || on ? 1 : 0.6;
        goalGlow = on ? 1 : 0;
      } else if (i === target) {
        goal = restPlace();
        goalAlpha = restAlpha();
      } else {
        goal = { x: slot.x, y: slot.y, s: slot.s * 0.4 };
        goalAlpha = 0;
      }

      if (!sol.placed && slots[i]) {
        Object.assign(sol, goal, { placed: true });
      }

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
      sol.root.rotation.y = reduced ? 0 : px * 0.25;
      sol.root.rotation.x = reduced ? 0 : py * 0.18;
      sol.edgeMat.opacity = sol.alpha;
      sol.faceMat.opacity = sol.alpha * (0.07 + sol.glow * 0.1);
      sol.dotMat.opacity = sol.alpha * 0.95;
      sol.dotMat.size = 0.12 + Math.min(sol.s, 1.2) * 0.06;
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
        const c = place(rect);
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
