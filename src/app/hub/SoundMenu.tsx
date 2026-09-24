import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "./sound";

/**
 * The speaker button and its little menu: background music (the space
 * drone) and sound effects switch independently. Both start on; choices
 * are remembered by sound.ts.
 */
export function SoundMenu() {
  const [open, setOpen] = useState(false);
  const [bgm, setBgm] = useState(false);
  const [sfx, setSfx] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sound.init();
    setBgm(sound.bgm);
    setSfx(sound.sfx);
  }, []);

  // close on a click elsewhere or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const flip = (ch: "bgm" | "sfx") => {
    const next = ch === "bgm" ? !bgm : !sfx;
    sound.set(ch, next);
    if (ch === "bgm") setBgm(next);
    else setSfx(next);
  };

  const anyOn = bgm || sfx;

  return (
    <div className="h-sound-wrap" ref={wrapRef}>
      <button
        type="button"
        className="h-sound"
        data-on={anyOn}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Sound settings"
        title="Sound"
        onClick={() => setOpen((v) => !v)}
      >
        {anyOn ? <Volume2 className="w-4 h-4" aria-hidden /> : <VolumeX className="w-4 h-4" aria-hidden />}
      </button>

      {open ? (
        <div className="h-sound-menu" role="menu" aria-label="Sound">
          {(
            [
              ["bgm", "Background music", "Space ambience", bgm],
              ["sfx", "Sound effects", "Hover, open and close", sfx],
            ] as const
          ).map(([ch, label, hint, value]) => (
            <button
              key={ch}
              type="button"
              role="menuitemcheckbox"
              aria-checked={value}
              className="h-sound-item"
              onClick={() => flip(ch)}
            >
              <span className="h-sound-text">
                <span className="h-sound-label">{label}</span>
                <span className="h-sound-hint">{hint}</span>
              </span>
              <span className="h-switch" data-on={value} aria-hidden>
                <span className="h-switch-knob" />
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
