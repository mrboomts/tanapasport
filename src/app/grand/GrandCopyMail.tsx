import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

async function writeClipboard(text: string) {
  // navigator.clipboard needs a secure context; fall back for the rest
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through */
    }
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * Copy-to-clipboard for the email address. Worth having on its own:
 * mailto: silently does nothing when no mail client is registered, which
 * is the common case on desktop.
 */
export function GrandCopyMail({ email, className = "" }: { email: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await writeClipboard(email);
    setState(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`g-copy ${className}`}
      data-state={state}
      aria-label={state === "copied" ? "Email address copied" : `Copy ${email} to clipboard`}
    >
      {state === "copied" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      <span className="g-copy-text">
        {state === "copied" ? "Copied" : state === "failed" ? "Press ⌘C" : "Copy"}
      </span>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
