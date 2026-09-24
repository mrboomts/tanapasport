import * as THREE from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import { SOLIDS } from "../grand/platonic";

/**
 * The hub's WebGL scene. Loaded lazily (this module is the only importer of
 * three), so the first paint of the page never waits on it.
 *
 * One object sits on a "stage" — a DOM rect the page measures and hands
 * over — so layout stays in CSS and the scene just follows it. The object
 * is three layers in the same plane:
 *
 *   Flower of Life   19 circles + the bounding circle
 *   Metatron's Cube  the 13 circles of the Fruit of Life, every centre
 *                    joined to every other (78 lines)
 *   the five solids  edges, faint faces and glowing vertices
 *
 * Entering a room plays: the flower blooms outward from its centre → the
 * Metatron lines draw → the chosen solid brightens as a flat projection →
 * it unfolds into depth while spinning up → it bursts into gold dust and
 * glides off to rest behind the room. All of it is driven from one clock,
 * so a second enter() simply restarts the timeline from wherever the
 * object currently is — interrupting is free.
 */

export type Stage = { x: number; y: number; w: number; h: number };

export type HubScene = {
  setStage(which: "hub" | "room", rect: Stage): void;
  setPreview(solid: number | null): void;
  enter(solid: number, opts?: { instant?: boolean }): void;
  leave(): void;
  skip(): void;
  dispose(): void;
};

const GOLD = new THREE.Color("#e9c877");
const GOLD_LT = new THREE.Color("#f7e2a8");

/** Everything is built inside this radius, so a stage maps to a scale. */
const BOUND = 1.7;
const SOLID_R = 1.2;

/** Seconds from click to the object coming to rest behind the room. */
export const SEQ_END = 1.4;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3);
const easeInOut = (v: number) => {
  const t = clamp01(v);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
/** 0 → 1 over [a, b] seconds, eased. */
const ramp = (s: number, a: number, b: number) => easeOut((s - a) / (b - a));

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
  edges: THREE.LineSegments;
  edgeMat: THREE.LineBasicMaterial;
  faceMat: THREE.MeshBasicMaterial;
  dotMat: THREE.PointsMaterial;
  segments: [THREE.Vector3, THREE.Vector3][];
  alpha: number;
  k: number;
};

export function createHubScene(
  canvas: HTMLCanvasElement,
  opts: { reduced: boolean; lite: boolean },
): HubScene {
  const { reduced, lite } = opts;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2));
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

  /* ---------- the object ---------- */
  const object = new THREE.Group();
  const tilt = new THREE.Group(); // pointer parallax
  object.add(tilt);
  scene.add(object);

  const sacred = new THREE.Group();
  tilt.add(sacred);

  // Flower of Life
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

  // Metatron's Cube
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
  const metLines = new THREE.LineSegments(metGeo, metMat);
  sacred.add(metLines);

  // The five solids
  const solids: SolidObj[] = SOLIDS.map((s) => {
    const root = new THREE.Group();
    const spin = new THREE.Group();
    root.add(spin);
    tilt.add(root);

    const verts = s.vertices.map((v) => new THREE.Vector3(v[0], v[1], v[2]).multiplyScalar(SOLID_R));
    const pos: number[] = [];
    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    for (const [a, b] of s.edges) {
      pos.push(verts[a].x, verts[a].y, verts[a].z, verts[b].x, verts[b].y, verts[b].z);
      segments.push([verts[a], verts[b]]);
    }
    const edgeGeo = track(new THREE.BufferGeometry());
    edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    const edgeMat = track(additive(GOLD_LT, 0));
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    spin.add(edges);

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

    // a different resting attitude per solid, so each reads as itself
    spin.rotation.set(0.5 + Math.random() * 0.3, Math.random() * Math.PI, 0);
    return { root, spin, edges, edgeMat, faceMat, dotMat, segments, alpha: 0, k: 1 };
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
  const dustMat = track(
    new THREE.PointsMaterial({
      map: sprite,
      color: GOLD,
      size: lite ? 0.07 : 0.055,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  const dust = new THREE.Points(dustGeo, dustMat);
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
  tilt.add(burst);
  let burstAge = Infinity;

  function fireBurst(sol: SolidObj) {
    const q = sol.spin.quaternion;
    const tmp = new THREE.Vector3();
    for (let i = 0; i < BURST; i++) {
      const [a, b] = sol.segments[i % sol.segments.length];
      tmp.lerpVectors(a, b, Math.random()).applyQuaternion(q);
      burstPos[i * 3] = tmp.x;
      burstPos[i * 3 + 1] = tmp.y;
      burstPos[i * 3 + 2] = tmp.z;
      const speed = 0.5 + Math.random() * 1.6;
      const n = tmp.clone().normalize();
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
  let mode: "hub" | "room" = "hub";
  let preview: number | null = null;
  let target: number | null = null;
  let seqStart = -Infinity;
  let burstFired = true;
  let seqFrom = { x: 0, y: 0, s: 1 };

  const cur = {
    fol: 0,
    met: 0,
    metDraw: 1,
    bloom: petals.map(() => 1),
    x: 0,
    y: 0,
    s: 1,
  };

  let px = 0;
  let py = 0;
  let tpx = 0;
  let tpy = 0;

  /** A DOM rect → where the object's centre goes and how big it is. */
  function place(stage: Stage | null) {
    const halfW = halfH * (W / H);
    if (!stage || stage.w < 2) return { x: 0, y: 0, s: (halfH * 0.55) / BOUND };
    const cx = stage.x + stage.w / 2;
    const cy = stage.y + stage.h / 2;
    const r = (Math.min(stage.w, stage.h) / 2 / H) * 2 * halfH;
    return {
      x: (cx / W) * 2 * halfW - halfW,
      y: halfH - (cy / H) * 2 * halfH,
      s: r / BOUND,
    };
  }

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
    const s = (now - seqStart) / 1000;
    const inSeq = mode === "room" && s < SEQ_END && !reduced;
    const rate = reduced ? 1 : 1 - Math.exp(-dt * 5);
    const hubAt = place(stages.hub);
    const roomAt = place(stages.room);

    // pointer parallax
    px += (tpx - px) * (1 - Math.exp(-dt * 3));
    py += (tpy - py) * (1 - Math.exp(-dt * 3));
    if (!reduced) {
      tilt.rotation.y = px * 0.28;
      tilt.rotation.x = py * 0.2;
      dust.position.x = -px * 0.35;
      dust.position.y = py * 0.22;
    }

    if (inSeq) {
      // bloom: each circle grows from its own centre, centre first
      petals.forEach((p, i) => {
        cur.bloom[i] = easeOut((s - p.delay) / 0.26);
        p.loop.scale.setScalar(folR * Math.max(cur.bloom[i], 0.001));
      });
      rim.scale.setScalar(folR * 3 * Math.max(ramp(s, 0.16, 0.42), 0.001));
      cur.fol = 0.95 * ramp(s, 0, 0.12) * (1 - ramp(s, 0.45, 0.8));
      cur.metDraw = ramp(s, 0.2, 0.52);
      cur.met = 0.9 * ramp(s, 0.18, 0.3) * (1 - ramp(s, 0.66, 0.95));

      solids.forEach((sol, i) => {
        if (i === target) {
          const on = ramp(s, 0.4, 0.62);
          const rest = mode === "room" ? restAlpha() : 1;
          sol.alpha = on * (1 - ramp(s, 0.95, SEQ_END) * (1 - rest));
          sol.k = ramp(s, 0.6, 1.02);
        } else {
          sol.alpha += (0 - sol.alpha) * (1 - Math.exp(-dt * 14));
        }
      });

      // glide: to the focus stage, hold, then away to rest
      const toFocus = easeInOut(s / 0.25);
      const toRest = easeInOut((s - 0.9) / (SEQ_END - 0.9));
      const fx = seqFrom.x + (hubAt.x - seqFrom.x) * toFocus;
      const fy = seqFrom.y + (hubAt.y - seqFrom.y) * toFocus;
      const fs = seqFrom.s + (hubAt.s - seqFrom.s) * toFocus;
      cur.x = fx + (roomAt.x - fx) * toRest;
      cur.y = fy + (roomAt.y - fy) * toRest;
      cur.s = fs + (roomAt.s - fs) * toRest;

      if (!burstFired && s >= 0.96 && target !== null) {
        burstFired = true;
        fireBurst(solids[target]);
      }
    } else {
      const inHub = mode === "hub";
      const goalFol = inHub ? (preview === null ? 0.55 : 0.32) : 0;
      const goalMet = inHub ? (preview === null ? 0.26 : 0.1) : 0;
      cur.fol += (goalFol - cur.fol) * rate;
      cur.met += (goalMet - cur.met) * rate;
      cur.metDraw += (1 - cur.metDraw) * rate;
      petals.forEach((p, i) => {
        cur.bloom[i] += (1 - cur.bloom[i]) * rate;
        p.loop.scale.setScalar(folR * Math.max(cur.bloom[i], 0.001));
      });
      rim.scale.setScalar(folR * 3);

      const shown = inHub ? preview : target;
      solids.forEach((sol, i) => {
        const goal = i === shown ? (inHub ? 1 : restAlpha()) : 0;
        sol.alpha += (goal - sol.alpha) * rate;
        sol.k += (1 - sol.k) * rate;
      });

      const at = inHub ? hubAt : roomAt;
      cur.x += (at.x - cur.x) * rate;
      cur.y += (at.y - cur.y) * rate;
      cur.s += (at.s - cur.s) * rate;
    }

    // apply
    object.position.set(cur.x, cur.y, 0);
    object.scale.setScalar(Math.max(cur.s, 0.001));
    folMat.opacity = cur.fol;
    metCircleMat.opacity = cur.met * 0.55;
    metMat.opacity = cur.met;
    metGeo.setDrawRange(0, Math.round(cur.metDraw * metLineCount) * 2);
    metCircles.forEach((c) => (c.visible = cur.met > 0.002));
    if (!reduced) sacred.rotation.z += dt * 0.025;

    const boost = inSeq ? 2.6 * ramp(s, 0.58, 0.8) * (1 - ramp(s, 1.0, SEQ_END)) : 0;
    solids.forEach((sol) => {
      const visible = sol.alpha > 0.003;
      sol.root.visible = visible;
      if (!visible) return;
      sol.edgeMat.opacity = sol.alpha;
      sol.faceMat.opacity = sol.alpha * 0.07;
      sol.dotMat.opacity = sol.alpha * 0.95;
      // flattened into the picture plane → unfolds into depth
      sol.root.scale.set(1, 1, Math.max(sol.k, 0.002));
      if (!reduced) {
        sol.spin.rotation.y += dt * (0.22 + boost);
        sol.spin.rotation.x += dt * (0.07 + boost * 0.35);
      }
    });

    // ambient dust drifts upward and wraps
    if (!reduced) {
      for (let i = 0; i < DUST; i++) {
        const iy = i * 3 + 1;
        dustPos[iy] += dustVel[i] * dt;
        if (dustPos[iy] > 5.5) dustPos[iy] = -5.5;
      }
      dustGeo.attributes.position.needsUpdate = true;
    }

    // burst
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

  function restAlpha() {
    return lite ? 0.35 : 0.5;
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

  // start from a quiet bloom so the first paint isn't a pop
  cur.fol = 0;
  wake();

  return {
    setStage(which, rect) {
      stages[which] = rect;
      if (which === mode && !Number.isFinite(seqStart)) {
        const at = place(rect);
        if (cur.s === 1) Object.assign(cur, at);
      }
      wake();
    },
    setPreview(solid) {
      preview = solid;
      wake();
    },
    enter(solid, o) {
      const from = mode === "hub" ? place(stages.hub) : { x: cur.x, y: cur.y, s: cur.s };
      mode = "room";
      target = solid;
      seqFrom = from;
      if (o?.instant || reduced) {
        seqStart = performance.now() - SEQ_END * 1000 - 1;
        burstFired = true;
        const at = place(stages.room);
        Object.assign(cur, at);
        solids.forEach((sol, i) => {
          sol.alpha = i === solid ? restAlpha() : 0;
          sol.k = 1;
        });
        cur.fol = 0;
        cur.met = 0;
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
        seqStart = now - SEQ_END * 1000;
        if (!burstFired && target !== null) {
          burstFired = true;
          fireBurst(solids[target]);
        }
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
