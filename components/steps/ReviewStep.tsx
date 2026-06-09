"use client";

import type { ListingPhoto, ListingDetails, ListingCopy } from "@/types/listing";

interface Props {
  draftId: string;
  photos: ListingPhoto[];
  details: ListingDetails;
  copy: ListingCopy | null;
}

export default function ReviewStep({ draftId, photos, details, copy }: Props) {
  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12 md:col-span-7">
        {/* Lead photo with editorial framing */}
        {photos[0] && (
          <div className="mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[0].framedUrl}
              alt="lead"
              className="w-full"
            />
          </div>
        )}

        {/* Edition mark + headline */}
        <p className="edition-mark mb-4">
          <span className="num">№ {String(Math.floor(Math.random() * 900) + 100)}</span>
          &nbsp;/&nbsp; {details.locality}
        </p>
        <h2 className="font-display text-5xl md:text-6xl tracking-editorial leading-[1] mb-8">
          {details.bhk} in {details.locality}
        </h2>

        {/* The copy */}
        {copy && (
          <p className="font-body text-xl leading-relaxed text-ink whitespace-pre-wrap mb-12">
            {copy.finalCopy}
          </p>
        )}

        {/* Remaining photos grid */}
        {photos.length > 1 && (
          <div className="grid grid-cols-2 gap-3">
            {photos.slice(1).map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.publicId}
                src={p.enhancedUrl}
                alt=""
                className="w-full aspect-[4/3] object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="col-span-12 md:col-span-5">
        <div className="sticky top-8 space-y-10">
          <div>
            <p className="edition-mark mb-3">Particulars</p>
            <dl className="space-y-3 font-body">
              <Row label="Configuration" value={details.bhk} />
              <Row label="Carpet area" value={`${details.area} sq ft`} />
              <Row label="Locality" value={`${details.locality}, ${details.city}`} />
              <Row label="Asking" value={`₹${details.priceCr} Cr`} />
              <Row label="Per sq ft" value={`₹${perSqFt(details.priceCr, details.area)}`} />
            </dl>
          </div>

          {details.features.length > 0 && (
            <div>
              <p className="edition-mark mb-3">Features</p>
              <div className="flex flex-wrap gap-2">
                {details.features.map((f) => (
                  <span
                    key={f}
                    className="font-ui text-xs uppercase tracking-eyebrow px-3 py-2 border border-hairline text-smoke"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-hairline pt-8">
            <p className="edition-mark mb-3">Next</p>
            <p className="font-body text-smoke leading-relaxed">
              Once you submit, our editor reviews the listing within 24 hours. If verification
              passes, your home appears in the next edition. You will be reachable on the
              number you signed up with.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-hairline pb-3">
      <dt className="font-ui text-xs uppercase tracking-eyebrow text-smoke">{label}</dt>
      <dd className="font-display text-lg text-ink">{value}</dd>
    </div>
  );
}

function perSqFt(priceCr: string, area: string): string {
  const p = parseFloat(priceCr);
  const a = parseFloat(area);
  if (!p || !a) return "—";
  const v = Math.round((p * 1_00_00_000) / a);
  return v.toLocaleString("en-IN");
}
