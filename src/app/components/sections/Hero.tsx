import { profile } from "../../data/portfolio";
import { Section } from "../ds/Section";
import { images } from "../../data/images";

export function Hero() {
  return (
    <Section id="home" className="!pt-12 md:!pt-16">
      <div className="flex flex-col-reverse md:grid md:grid-cols-[1fr_auto] gap-8 md:gap-10 items-center">
        <div>
          <p className="font-display mb-3" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>
            {profile.greeting}
          </p>
          <h1
            className="font-display tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.1, fontWeight: 700 }}
          >
            {profile.fullName}
          </h1>
          <p className="font-display mt-3 mb-6" style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "var(--on-surface-muted)" }}>
            ({profile.nickname})
          </p>
          <p className="whitespace-pre-line" style={{ color: "var(--foreground)", lineHeight: 1.7, maxWidth: "36rem", fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}>
            {profile.intro}
          </p>
        </div>
        <div
          className="rounded-full overflow-hidden aspect-square w-52 sm:w-64 md:w-[320px] lg:w-[360px] justify-self-center md:justify-self-end mx-auto md:mx-0"
        >
          <img
            src={images.profilePhoto}
            alt={profile.fullName}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%", transform: "scale(1.25)" }}
          />
        </div>
      </div>
    </Section>
  );
}
