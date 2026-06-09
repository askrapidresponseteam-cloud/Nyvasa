"use client";

import { useState } from "react";
import type { ListingPhoto, ListingDetails, ListingCopy } from "@/types/listing";

interface Props {
  details: ListingDetails;
  photos: ListingPhoto[];
  copy: ListingCopy | null;
  setCopy: (c: ListingCopy) => void;
}

const VARIANT_LABELS: Record<keyof ListingCopy["variants"], { name: string; for: string }> = {
  editorial: { name: "Editorial", for: "for the reader of magazine spreads" },
  warm: { name: "Warm", for: "for the family imagining themselves in it" },
  investor: { name: "Investor", for: "for the buyer focused on yield and build quality" },
};

export default function CopyStep({ details, photos, copy, setCopy }: Props) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          details,
          photoUrls: photos.slice(0, 6).map((p) => p.enhancedUrl),
        }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      setCopy({
        extractedFeatures: data.extractedFeatures || [],
        variants: data.variants,
        chosenVariant: "editorial",
        finalCopy: data.variants.editorial,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const pickVariant = (which: keyof ListingCopy["variants"]) => {
    if (!copy) return;
    setCopy({ ...copy, chosenVariant: which, finalCopy: copy.variants[which] });
  };

  const editFinal = (text: string) => {
    if (!copy) return;
    setCopy({ ...copy, finalCopy: text });
  };

  if (!copy) {
    return (
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-6">
          <p className="font-body text-xl text-smoke leading-relaxed mb-8">
            We will read your photographs alongside what you have entered, and draft three
            distinct ways to describe this home. You pick one and edit it as you see fit.
          </p>

          <button
            onClick={generate}
            disabled={generating}
            className="btn-editorial"
          >
            {generating ? "Reading the photographs…" : "Draft the copy →"}
          </button>

          {error && (
            <p className="mt-6 font-ui text-xs text-sienna">{error}</p>
          )}
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="border border-hairline p-8 bg-white/40">
            <p className="edition-mark mb-4">What we are sending</p>
            <ul className="font-body text-sm text-smoke space-y-2">
              <li>· {photos.length} corrected photographs</li>
              <li>· {details.bhk}, {details.area} sq ft</li>
              <li>· {details.locality}, {details.city}</li>
              <li>· ₹{details.priceCr} Cr</li>
              {details.features.length > 0 && (
                <li>· {details.features.length} owner-noted features</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-12">
      {/* Variant tabs */}
      <div className="col-span-12">
        <div className="flex gap-2 border-b border-hairline">
          {(Object.keys(copy.variants) as Array<keyof typeof copy.variants>).map((v) => {
            const active = copy.chosenVariant === v;
            return (
              <button
                key={v}
                onClick={() => pickVariant(v)}
                className={`px-6 py-4 font-ui text-xs uppercase tracking-eyebrow border-b-2 -mb-px transition-colors ${
                  active
                    ? "border-sienna text-ink"
                    : "border-transparent text-smoke hover:text-ink"
                }`}
              >
                {VARIANT_LABELS[v].name}
              </button>
            );
          })}
          <button
            onClick={() => { setCopy(null as any); generate(); }}
            className="ml-auto px-6 py-4 font-ui text-xs uppercase tracking-eyebrow text-smoke hover:text-ink"
          >
            ↻ Redraft
          </button>
        </div>
      </div>

      {/* Selected variant for editing */}
      <div className="col-span-12 md:col-span-8">
        <p className="edition-mark mb-3">
          {VARIANT_LABELS[copy.chosenVariant].name} &nbsp;/&nbsp;
          <span className="num">{VARIANT_LABELS[copy.chosenVariant].for}</span>
        </p>
        <textarea
          value={copy.finalCopy}
          onChange={(e) => editFinal(e.target.value)}
          className="w-full min-h-[280px] bg-transparent border border-hairline p-6 font-body text-lg leading-relaxed text-ink resize-none focus:border-ink focus:outline-none"
        />
        <p className="font-ui text-xs uppercase tracking-eyebrow text-smoke mt-3">
          {copy.finalCopy.split(/\s+/).filter(Boolean).length} words &nbsp;·&nbsp;
          edit freely; your changes are kept
        </p>
      </div>

      {/* Extracted features sidebar */}
      <div className="col-span-12 md:col-span-4">
        <p className="edition-mark mb-4">Features read from the photographs</p>
        {copy.extractedFeatures.length === 0 ? (
          <p className="font-body text-smoke italic">None extracted.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {copy.extractedFeatures.map((f) => (
              <span
                key={f}
                className="font-ui text-xs uppercase tracking-eyebrow px-3 py-2 border border-hairline text-smoke"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
