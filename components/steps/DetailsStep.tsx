"use client";

import type { ListingDetails } from "@/types/listing";

interface Props {
  details: ListingDetails;
  setDetails: (d: ListingDetails) => void;
}

const BHK_OPTIONS = ["2 BHK", "3 BHK", "4 BHK", "5+ BHK", "Villa", "Penthouse"];
const FEATURE_SUGGESTIONS = [
  "Sea view", "Park view", "Corner unit", "Double-height ceiling",
  "Private terrace", "Servant quarters", "Two-car covered parking",
  "Marble flooring", "Wooden flooring", "Modular kitchen",
  "Power backup", "Club access", "Swimming pool", "Gym",
  "Pet-friendly", "Vaastu-compliant",
];

export default function DetailsStep({ details, setDetails }: Props) {
  const update = (k: keyof ListingDetails, v: string | string[]) => {
    setDetails({ ...details, [k]: v } as ListingDetails);
  };

  const toggleFeature = (f: string) => {
    const next = details.features.includes(f)
      ? details.features.filter((x) => x !== f)
      : [...details.features, f];
    update("features", next);
  };

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12 md:col-span-5">
        <p className="font-body text-xl text-smoke leading-relaxed">
          The particulars only. The writing comes next, and we will read your photographs
          to add what you forget.
        </p>
      </div>

      <div className="col-span-12 md:col-span-7 space-y-12">
        {/* Configuration */}
        <div>
          <label className="edition-mark block mb-4">Configuration</label>
          <div className="flex flex-wrap gap-2">
            {BHK_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => update("bhk", opt)}
                className={`font-ui text-xs uppercase tracking-eyebrow px-5 py-3 border transition-colors ${
                  details.bhk === opt
                    ? "bg-ink text-bone border-ink"
                    : "border-hairline text-smoke hover:border-ink hover:text-ink"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Area + price row */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="edition-mark block mb-3">Carpet area</label>
            <div className="flex items-baseline gap-3">
              <input
                type="number"
                value={details.area}
                onChange={(e) => update("area", e.target.value)}
                placeholder="1,850"
                className="input-editorial"
              />
              <span className="font-ui text-xs uppercase tracking-eyebrow text-smoke whitespace-nowrap">
                sq ft
              </span>
            </div>
          </div>
          <div>
            <label className="edition-mark block mb-3">Asking price</label>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-xl text-smoke">₹</span>
              <input
                type="number"
                step="0.01"
                value={details.priceCr}
                onChange={(e) => update("priceCr", e.target.value)}
                placeholder="4.25"
                className="input-editorial"
              />
              <span className="font-ui text-xs uppercase tracking-eyebrow text-smoke whitespace-nowrap">
                Cr
              </span>
            </div>
          </div>
        </div>

        {/* Locality + city */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="edition-mark block mb-3">Locality</label>
            <input
              type="text"
              value={details.locality}
              onChange={(e) => update("locality", e.target.value)}
              placeholder="Bandra West"
              className="input-editorial"
            />
          </div>
          <div>
            <label className="edition-mark block mb-3">City</label>
            <input
              type="text"
              value={details.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="Mumbai"
              className="input-editorial"
            />
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="edition-mark block mb-4">
            Features <span className="text-smoke normal-case tracking-normal">— select any that apply</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {FEATURE_SUGGESTIONS.map((f) => (
              <button
                key={f}
                onClick={() => toggleFeature(f)}
                className={`font-ui text-xs uppercase tracking-eyebrow px-4 py-2.5 border transition-colors ${
                  details.features.includes(f)
                    ? "bg-loden text-bone border-loden"
                    : "border-hairline text-smoke hover:border-loden hover:text-loden"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
