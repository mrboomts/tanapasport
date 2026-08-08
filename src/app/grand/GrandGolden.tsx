import catSit from "../../imports/GoldenPage/cat-sit.webp";
import catWalk from "../../imports/GoldenPage/cat-walk.webp";
import catLeap from "../../imports/GoldenPage/cat-leap.webp";
import catSwipe from "../../imports/GoldenPage/cat-swipe.webp";

/**
 * The tall empty column beside the Experience timeline on large screens.
 *
 * A kitten runs across, hops, then sits up and bats at a shell with a
 * raised paw — and the shell unfurls upward into a golden spiral before
 * packing itself away and starting over.
 *
 * It is a four-frame sprite cut from Boom's artwork: sit, walk, leap,
 * swipe. Walk and leap alternate at 6.6 Hz to make the run cycle (the leap
 * frame is drawn 12 units higher so the alternation reads as a bound), and
 * the whole sprite flips on scaleX at the turn. Depth is three cheap
 * tricks: the contact pool shrinks and fades as the cat rises, the body
 * squashes on take-off and landing, and the spiral is drawn *behind* the
 * cat so it is occluded.
 *
 * Every pose is anchored on the same head-centre x and the same ground
 * line, measured off the artwork, so frames swap without the cat jumping.
 *
 * Both curves are the true golden logarithmic spiral, r = a·e^(bθ) with
 * b = ln(φ)/(π/2) — sampled into cubic Béziers from the curve's own
 * tangents. That matters: the usual Fibonacci construction (a chain of
 * quarter circles) breaks curvature at every join and reads as a run of
 * corners rather than a curve. The shell is the same equation at 1/50 the
 * scale, so it really is a small copy of what it opens into, and it sits
 * exactly where the raised paw reaches. Truncating at θ = 17.5 puts the
 * bounding box at 1 : φ portrait, the shape of the space it has to fill.
 *
 * Decorative only — aria-hidden, hidden below 1280px, and frozen on its
 * finished frame for prefers-reduced-motion.
 */

/** Pole (where the shell sits) → outer end. pathLength="1" draws it in CSS. */
const SPIRAL =
  "M 215.6 392 C 215.6 392.2 215.7 392.5 215.6 392.8 C 215.6 393 215.5 393.3 215.3 393.6 C 215.1 " +
  "393.8 214.9 394.1 214.6 394.3 C 214.3 394.5 213.9 394.6 213.5 394.6 C 213.1 394.7 212.7 394.6 " +
  "212.2 394.5 C 211.8 394.4 211.3 394.1 211 393.7 C 210.6 393.4 210.2 392.9 210 392.3 C 209.8 " +
  "391.7 209.7 391.1 209.7 390.4 C 209.8 389.7 210 389 210.3 388.3 C 210.7 387.6 211.3 386.9 212 " +
  "386.4 C 212.8 385.8 213.7 385.4 214.7 385.2 C 215.7 385 216.8 385 218 385.3 C 219.2 385.6 " +
  "220.3 386.1 221.4 387 C 222.5 387.8 223.4 389 224.1 390.4 C 224.8 391.8 225.2 393.4 225.2 " +
  "395.2 C 225.3 397 224.9 398.9 224.1 400.8 C 223.2 402.6 221.9 404.5 220.2 406 C 218.4 407.5 " +
  "216.2 408.7 213.6 409.5 C 211.1 410.2 208.2 410.4 205.2 409.9 C 202.1 409.4 199 408.2 196.2 " +
  "406.3 C 193.3 404.3 190.6 401.6 188.6 398.1 C 186.6 394.7 185.2 390.6 184.7 386.1 C 184.3 " +
  "381.5 184.8 376.6 186.6 371.7 C 188.3 366.8 191.2 361.9 195.4 357.6 C 199.6 353.4 205 349.8 " +
  "211.4 347.4 C 217.8 345 225.2 343.9 232.9 344.6 C 240.7 345.2 248.8 347.6 256.6 352 C 264.3 " +
  "356.5 271.6 362.9 277.5 371.2 C 283.3 379.6 287.7 389.8 289.8 401.2 C 291.8 412.7 291.5 425.4 " +
  "288 438.3 C 284.6 451.1 278 464.1 268.3 475.8 C 258.5 487.4 245.4 497.7 229.6 505.1 C 213.8 " +
  "512.4 195.3 516.7 175.4 516.7 C 155.5 516.6 134.2 512.1 113.6 502.4 C 93 492.7 73.2 477.8 56.6 " +
  "457.7 C 39.9 437.7 26.6 412.6 19.1 383.8 C 11.6 355 9.9 322.5 16.1 289.1 C 22.3 255.6 36.3 " +
  "221.2 58.9 189.5 C 81.5 157.9 112.7 129 151.4 107.2 C 190.2 85.3 236.5 70.5 287.2 66.7";

/** The same curve, ~2.6 turns, outer radius 23. */
const SHELL =
  "M 214.2 392 C 214.2 392.1 214.1 392.2 214 392.2 C 213.9 392.3 213.7 392.2 213.6 392.1 C 213.5 " +
  "391.9 213.6 391.6 213.8 391.4 C 214.1 391.3 214.6 391.3 214.9 391.7 C 215.2 392.1 215.2 392.8 " +
  "214.6 393.4 C 214 393.9 212.8 394 211.9 393.2 C 211.1 392.3 210.7 390.4 211.9 388.9 C 213.1 " +
  "387.4 216 386.6 218.5 388.3 C 221.1 390 222.8 394.4 220.5 398.6 C 218.1 402.8 211.4 406.1 " +
  "204.4 403 C 197.5 400 191.5 389.7 195.4 378.5";

const SHELL_DETAIL =
  "M 195.4 378.5 Q 198.3 389.3 211.3 390 M 194.6 390.5 Q 200.4 393.6 211.2 391.8";

/** Pose boxes, aligned on head-centre x = 152.4 and ground y = 585. */
const POSE = {
  sit: { x: 90, y: 403.1, width: 173.8, height: 181.9 },
  walk: { x: 85.6, y: 403.1, width: 166.1, height: 181.9 },
  /** lifted 12 so alternating with walk reads as a bound, not a slide */
  run: { x: 84.3, y: 384.9, width: 163.1, height: 176.1 },
  /** same artwork, on the ground — the hop's arc does the lifting */
  leap: { x: 84.3, y: 408.9, width: 163.1, height: 176.1 },
  swipe: { x: 77.8, y: 399.2, width: 165.2, height: 185.8 },
};

export function GrandGolden() {
  return (
    <aside className="g-golden" aria-hidden>
      <svg viewBox="0 0 320 620" className="g-golden-svg">
        <text className="g-golden-cap" x="18" y="24">
          THE GOLDEN RATIO
        </text>

        {/* the spiral — behind the cat, so the cat occludes its lower turns */}
        <path className="g-golden-spiral" d={SPIRAL} pathLength={1} />

        {/* the shell, curled on the spiral's pole, within a paw's reach */}
        <g className="g-golden-shell">
          <circle className="g-golden-shell-glow" cx="208" cy="391" r="22" />
          <path className="g-golden-shell-body" d={SHELL} />
          <path className="g-golden-shell-ribs" d={SHELL_DETAIL} />
        </g>

        {/* Three nested groups: travel, facing, hop. The contact pool needs
            the travel without the hop, and the flip must not mirror it. */}
        <g className="g-golden-catmove">
          <ellipse className="g-golden-cat-shadow" cx="176.9" cy="586" rx="61" ry="8.5" />

          <g className="g-golden-catface">
            <g className="g-golden-cathop">
              <image className="g-cat-sit" href={catSit} {...POSE.sit} />
              <g className="g-cat-run">
                <image className="g-cat-frame-a" href={catWalk} {...POSE.walk} />
                <image className="g-cat-frame-b" href={catLeap} {...POSE.run} />
              </g>
              <image className="g-cat-hoppose" href={catLeap} {...POSE.leap} />
              <image className="g-cat-swipe" href={catSwipe} {...POSE.swipe} />
            </g>
          </g>
        </g>

        <text className="g-golden-phi" x="18" y="610">
          φ = 1.618…
        </text>
      </svg>
    </aside>
  );
}
