import { useEffect, useRef, useState } from "react";
import { GrandGolden } from "../grand/GrandGolden";
import type { GoldenScene } from "./golden3d";

/**
 * The Experience column's golden-ratio vignette. The 3D kitten and spiral
 * load lazily (they share the three chunk with the hub), only where the
 * column is shown at all (≥1280px); without WebGL the drawn SVG version
 * stands in.
 */
export function GoldenStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1280px)").matches) return;
    let disposed = false;
    let scene: GoldenScene | null = null;
    const c = document.createElement("canvas");
    if (!(c.getContext("webgl2") || c.getContext("webgl"))) {
      setFailed(true);
      return;
    }
    import("./golden3d")
      .then(({ createGoldenScene }) => {
        if (disposed || !canvasRef.current) return;
        scene = createGoldenScene(canvasRef.current, {
          reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        });
      })
      .catch(() => setFailed(true));
    return () => {
      disposed = true;
      scene?.dispose();
    };
  }, []);

  if (failed) return <GrandGolden />;

  return (
    <aside className="g-golden g-golden--3d" aria-hidden>
      <span className="g-golden3d-cap">The golden ratio</span>
      <canvas ref={canvasRef} className="g-golden3d-canvas" />
      <span className="g-golden3d-phi">φ = 1.618…</span>
    </aside>
  );
}
