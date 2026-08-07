import { hobbies, profile, skillGroups } from "../data/portfolio";
import { images } from "../data/images";
import { GrandCopyMail } from "./GrandCopyMail";

export function GrandProfile() {
  const facts = [
    { k: "Name", v: profile.fullName },
    { k: "Nickname", v: profile.nickname },
    { k: "Born", v: profile.birthday },
    { k: "Based in", v: profile.address },
  ];

  return (
    <>
      <section id="g-profile" className="g-section">
        <header className="g-section-head">
          <span className="g-section-num" aria-hidden>
            05
          </span>
          <div>
            <h2 className="g-section-title">Profile</h2>
          </div>
        </header>

        <div className="g-profile">
          <div className="g-profile-figure">
            <img src={images.aboutPhoto} alt={profile.fullName} loading="lazy" decoding="async" />
          </div>

          <div className="g-profile-copy">
            <p className="g-profile-bio">{profile.about}</p>

            <dl className="g-facts">
              {facts.map((f) => (
                <div className="g-fact" key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
              <div className="g-fact">
                <dt>Languages</dt>
                <dd>
                  {profile.languages.map((l, i) => (
                    <span key={l.name}>
                      {l.name} <em>({l.level})</em>
                      {i < profile.languages.length - 1 ? <i className="g-sep">/</i> : null}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="g-contact" id="g-contact">
              <div className="g-contact-line g-contact-line--mail">
                <span>Mail</span>
                <span className="g-contact-mailrow">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  <GrandCopyMail email={profile.email} />
                </span>
              </div>
              <a href={`tel:${profile.phone}`} className="g-contact-line">
                <span>Phone</span>
                {profile.phone}
              </a>
              <a
                href={profile.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="g-contact-line"
              >
                <span>LinkedIn</span>
                {profile.linkedin.label}
              </a>
            </div>
          </div>
        </div>

        <div className="g-subsection">
          <h3 className="g-subsection-title">What I can do</h3>
          <p className="g-subsection-lede">Tools and methods I reach for, grouped so you can scan them.</p>
        </div>

        <div className="g-skills">
          {skillGroups.map((group) => (
            <div className="g-skillgroup" key={group.label}>
              <h4 className="g-skillgroup-label">{group.label}</h4>
              <ul className="g-skilllist">
                {group.items.map((s) => (
                  <li className="g-skill" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="g-subsection">
          <h3 className="g-subsection-title">Off-hours</h3>
          <p className="g-subsection-lede">What I read, watch, cook, play and wonder about.</p>
        </div>

        <ul className="g-hobbies">
          {hobbies.map((h) => {
            const img = images.hobbies[h.name];
            return (
              <li className="g-hobby" key={h.name}>
                <span className="g-hobby-dot">
                  {img ? (
                    <img src={img} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <i aria-hidden>{h.emoji}</i>
                  )}
                </span>
                {h.name}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
