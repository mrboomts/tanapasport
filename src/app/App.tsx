import { Analytics } from "@vercel/analytics/react";
import { GrandHub } from "./hub/GrandHub";

/**
 * "Midnight Atelier", full-3D edition: a single-screen hub with a WebGL
 * scene and five rooms (see hub/GrandHub). The scrolling one-page layout
 * is still GrandLayout, which is what `main` ships.
 */
export default function App() {
  return (
    <>
      <GrandHub />
      <Analytics />
    </>
  );
}
