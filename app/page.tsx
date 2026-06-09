import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-hairline">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-editorial">
            Nyvasa
          </Link>
          <nav className="font-ui text-xs uppercase tracking-eyebrow text-smoke flex gap-8">
            <Link href="/edition" className="hover:text-ink transition-colors">The Edition</Link>
            <Link href="/about" className="hover:text-ink transition-colors">About</Link>
            <Link href="/list" className="text-ink">List a Home →</Link>
          </nav>
        </div>
      </header>

      {/* Hero — the thesis */}
      <section className="max-w-[1400px] mx-auto px-8 pt-32 pb-24 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-2">
          <p className="edition-mark">
            <span className="num">№ 001</span> &nbsp;/&nbsp; Volume I
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-editorial">
            A curated edition <br />
            of <em className="text-loden italic">homes</em>, <br />
            not a marketplace.
          </h1>
          <p className="font-body text-xl md:text-2xl text-smoke mt-12 max-w-2xl leading-relaxed">
            We list fewer homes, photograph them properly, and verify what is claimed.
            Built for owners who want the listing to look as considered as the home itself.
          </p>
          <div className="mt-12 flex gap-4">
            <Link href="/list" className="btn-editorial">
              List your home
            </Link>
            <Link href="/edition" className="btn-ghost">
              Browse the edition
            </Link>
          </div>
        </div>
      </section>

      {/* The promise — three pillars, deliberately quiet */}
      <section className="border-t border-hairline">
        <div className="max-w-[1400px] mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <p className="edition-mark mb-6">
              <span className="num">01</span> &nbsp;Photography
            </p>
            <h3 className="font-display text-3xl tracking-editorial mb-4">
              Editorial, not estate-agent.
            </h3>
            <p className="font-body text-smoke leading-relaxed">
              Every image you upload is corrected for exposure, white balance, and perspective.
              You see the before and after. You decide what stays.
            </p>
          </div>
          <div>
            <p className="edition-mark mb-6">
              <span className="num">02</span> &nbsp;Copy
            </p>
            <h3 className="font-display text-3xl tracking-editorial mb-4">
              Written, not generated.
            </h3>
            <p className="font-body text-smoke leading-relaxed">
              Tell us five things about the home. We draft three versions — editorial, warm, or
              investor-grade — read from your photographs. You edit. Your voice stays in.
            </p>
          </div>
          <div>
            <p className="edition-mark mb-6">
              <span className="num">03</span> &nbsp;Verification
            </p>
            <h3 className="font-display text-3xl tracking-editorial mb-4">
              Real homes, real owners.
            </h3>
            <p className="font-body text-smoke leading-relaxed">
              Title trail, identity, and an optional in-person walkthrough. Listings that pass
              wear the mark. Listings that do not, do not appear.
            </p>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-loden text-bone">
        <div className="max-w-[1400px] mx-auto px-8 py-24 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="edition-mark text-bone/60 mb-6">For owners and developers</p>
            <h2 className="font-display text-5xl md:text-6xl tracking-editorial leading-[1]">
              Four minutes <br />from photograph to listing.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <Link
              href="/list"
              className="font-ui text-xs uppercase tracking-eyebrow bg-bone text-ink px-7 py-4 hover:bg-sienna hover:text-bone transition-colors"
            >
              Begin a listing →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hairline">
        <div className="max-w-[1400px] mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="font-display text-2xl tracking-editorial">Nyvasa</p>
          <p className="font-ui text-xs uppercase tracking-eyebrow text-smoke">
            Volume I &nbsp;/&nbsp; <span className="text-sienna">2026</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
