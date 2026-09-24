import { SOLIDS, project, rotate } from "../grand/platonic";

/** A still line drawing of one solid — the menu's stand-in when there is no WebGL. */
export function SolidIcon({ solid }: { solid: number }) {
  const s = SOLIDS[solid];
  const size = 100;
  const pts = s.vertices.map((v) => project(rotate(v, 0.5 + solid * 0.13, solid * 1.1), size));

  return (
    <svg className="h-orb-svg" viewBox={`0 0 ${size} ${size}`} fill="none">
      {s.edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={pts[a].x}
          y1={pts[a].y}
          x2={pts[b].x}
          y2={pts[b].y}
          stroke="#f7e2a8"
          strokeOpacity={0.35 + 0.6 * ((pts[a].depth + pts[b].depth) / 2)}
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}
