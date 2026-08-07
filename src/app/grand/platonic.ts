export type Vec3 = [number, number, number];
export type Solid = { name: string; vertices: Vec3[]; edges: [number, number][] };

const PHI = (1 + Math.sqrt(5)) / 2;
const INV_PHI = 1 / PHI;

/** All sign combinations of the given magnitudes, skipping duplicate zeros. */
function signs(x: number, y: number, z: number): Vec3[] {
  const out: Vec3[] = [];
  for (const sx of x === 0 ? [0] : [1, -1]) {
    for (const sy of y === 0 ? [0] : [1, -1]) {
      for (const sz of z === 0 ? [0] : [1, -1]) {
        out.push([x * sx, y * sy, z * sz]);
      }
    }
  }
  return out;
}

/** Even cyclic permutations of a coordinate triple. */
function cyclic(x: number, y: number, z: number): Vec3[] {
  return [...signs(x, y, z), ...signs(y, z, x), ...signs(z, x, y)];
}

function dist(a: Vec3, b: Vec3) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

/**
 * Edges of a Platonic solid are exactly the vertex pairs at the minimum
 * pairwise distance, so one routine derives them for every solid.
 */
function edgesFromVertices(vertices: Vec3[]): [number, number][] {
  let min = Infinity;
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const d = dist(vertices[i], vertices[j]);
      if (d < min) min = d;
    }
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      if (Math.abs(dist(vertices[i], vertices[j]) - min) < 1e-6) edges.push([i, j]);
    }
  }
  return edges;
}

/** Scale so every solid reads at a similar size on screen. */
function normalise(vertices: Vec3[]): Vec3[] {
  const max = Math.max(...vertices.map((v) => Math.hypot(...v)));
  return vertices.map(([x, y, z]) => [x / max, y / max, z / max] as Vec3);
}

function build(name: string, raw: Vec3[]): Solid {
  const vertices = normalise(raw);
  return { name, vertices, edges: edgesFromVertices(vertices) };
}

export const SOLIDS: Solid[] = [
  build("Tetrahedron", [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ]),
  build("Cube", signs(1, 1, 1)),
  build("Octahedron", [...signs(1, 0, 0), ...signs(0, 1, 0), ...signs(0, 0, 1)]),
  build("Dodecahedron", [...signs(1, 1, 1), ...cyclic(0, INV_PHI, PHI)]),
  build("Icosahedron", cyclic(0, 1, PHI)),
];

/** Rotate a point around Y then X. */
export function rotate([x, y, z]: Vec3, rx: number, ry: number): Vec3 {
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;

  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const y1 = y * cx - z1 * sx;
  const z2 = y * sx + z1 * cx;

  return [x1, y1, z2];
}

/** Weak perspective projection; returns screen coords plus a depth in 0..1. */
export function project(v: Vec3, size: number) {
  const d = 3.2;
  const scale = (size * 0.36 * d) / (d - v[2]);
  return {
    x: size / 2 + v[0] * scale,
    y: size / 2 - v[1] * scale,
    depth: (v[2] + 1) / 2,
  };
}
