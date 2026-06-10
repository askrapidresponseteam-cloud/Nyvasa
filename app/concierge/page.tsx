import type { Metadata } from "next";
import ConciergeActions from "@/components/ConciergeActions";
import { ADVISOR, BRIEFING, CLIENT, JOURNEY } from "./data";

export const metadata: Metadata = {
  title: "Your Concierge - Nyvasa",
  description: "Your Nyvasa relationship concierge and guided ownership journey.",
};

const STATUS_LABEL: Record<string, string> = {
  done: "Completed",
  active: "In progress",
  next: "Up next",
  upcoming: "Ahead",
};

function Icon({ kind }: { kind: "estate" | "visit" | "finance" }) {
  if (kind === "estate")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" />
      </svg>
    );
  if (kind === "visit")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 9h18M8 3v4M16 3v4" />
      </svg>
    );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 2v20M7 7h7a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8" />
    </svg>
  );
}

function greeting() {
  return "Good evening";
}

export default function ConciergePage() {
  return (
    <main className="cz-page">
      <div className="cz-wrap">
        <div className="cz-top">
          <a className="cz-brand" href="/">
            <span className="bm">N</span>
            <span className="bn">NYVASA</span>
          </a>
          <span className="cz-tier">{CLIENT.tier}</span>
        </div>

        <section className="cz-hero">
          <span className="cz-eyebrow">Your relationship concierge</span>
          <h1>
            {greeting()}, {CLIENT.firstName}.
          </h1>
          <p className="sub">
            Your {CLIENT.searchLabel.toLowerCase()} is progressing beautifully. Here is where
            things stand this evening.
          </p>

          <div className="cz-brief">
            <div className="bt">This evening's briefing</div>
            {BRIEFING.map((b, i) => (
              <div className="cz-bitem" key={i}>
                <span className="cz-bic"><Icon kind={b.icon} /></span>
                <p><b>{b.strong}</b> {b.text}</p>
              </div>
            ))}
            <ConciergeActions />
          </div>

          <div className="cz-adv">
            <div className="av">{ADVISOR.initials}</div>
            <div>
              <h3>{ADVISOR.name}</h3>
              <div className="role">{ADVISOR.role}</div>
              <div className="langs">{ADVISOR.languages.join(" \u00B7 ")}</div>
              <div className="cz-chips">
                {ADVISOR.specialties.map((s) => (
                  <span className="cz-chip" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cz-journey">
          <div className="cz-jhead">
            <span className="cz-eyebrow">Your ownership journey</span>
            <h2>Eight stages. One standard of care.</h2>
            <p>
              Not transaction steps - a managed journey. AI works ahead of you, Aarav stays
              beside you, and every stage tells you the next best action.
            </p>
          </div>

          {JOURNEY.map((s) => (
            <div className={"cz-stage " + s.status} key={s.n}>
              <div className="cz-dot">
                {s.status === "done" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M4 12l5 5L20 7" />
                  </svg>
                ) : (
                  s.n
                )}
              </div>
              <div className="cz-scard">
                <div className="cz-srow">
                  <h3>{s.title}</h3>
                  <span className="cz-status">{STATUS_LABEL[s.status]}</span>
                </div>
                <p className="detail">{s.detail}</p>
                <div className="cz-ai">
                  <span className="tag">Nyvasa AI</span>
                  <p>{s.ai}</p>
                </div>
                {s.docs && (
                  <div className="cz-docs">
                    {s.docs.map((d) => (
                      <span className="cz-doc" key={d}>{d}</span>
                    ))}
                  </div>
                )}
                <button className="cz-act">
                  {s.action}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
