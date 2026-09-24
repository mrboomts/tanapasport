import { useCallback, useEffect, useState } from "react";
import { projectDetails, projectSlug } from "../data/projectDetails";

/**
 * The five rooms, each paired with a Platonic solid by its classical
 * element. `solid` indexes SOLIDS in ../grand/platonic.
 */
export const ROOMS = [
  { key: "intro", num: "01", label: "Intro", solid: 3 },
  { key: "experience", num: "02", label: "Experience", solid: 1 },
  { key: "work", num: "03", label: "Work", solid: 0 },
  { key: "certifications", num: "04", label: "Certifications", solid: 2 },
  { key: "profile", num: "05", label: "Profile", solid: 4 },
] as const;

export type RoomKey = (typeof ROOMS)[number]["key"];

export const roomByKey = (key: RoomKey) => ROOMS.find((r) => r.key === key)!;

/**
 * Hash → room. A room's own key opens it; a project slug (the #choobini
 * link printed on the QR poster, and any other card link) opens Work, where
 * GrandProjects picks the same hash up and opens the card itself.
 */
function parse(hash: string): RoomKey | null {
  const h = decodeURIComponent(hash.replace(/^#/, ""));
  if (!h) return null;
  const room = ROOMS.find((r) => r.key === h);
  if (room) return room.key;
  if (Object.keys(projectDetails).some((t) => projectSlug(t) === h)) return "work";
  return null;
}

/**
 * Rooms live in the URL hash so they can be shared and so the browser (and
 * a phone's back gesture) steps back out to the hub. Entering pushes a
 * history entry tagged {hub: true}; leaving pops it when it is ours, so
 * back and "Menu" land in the same place without stacking duplicates.
 */
export function useRoom() {
  const [room, setRoom] = useState<RoomKey | null>(() => parse(location.hash));

  useEffect(() => {
    const sync = () => setRoom(parse(location.hash));
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const go = useCallback((key: RoomKey) => {
    const fromHub = parse(location.hash) === null;
    if (fromHub) history.pushState({ hub: true }, "", `#${key}`);
    else history.replaceState(history.state, "", `#${key}`);
    setRoom(key);
  }, []);

  const home = useCallback(() => {
    if (history.state?.hub) {
      history.back();
    } else {
      history.replaceState(null, "", location.pathname + location.search);
      setRoom(null);
    }
  }, []);

  return { room, go, home };
}
