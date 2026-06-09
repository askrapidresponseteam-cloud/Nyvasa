"use client";

import { useState, useCallback, useEffect } from "react";
import { WIZARD_STEPS, type WizardStep, type Listing, type ListingPhoto, type ListingDetails, type ListingCopy } from "@/types/listing";
import PhotosStep from "./steps/PhotosStep";
import DetailsStep from "./steps/DetailsStep";
import CopyStep from "./steps/CopyStep";
import ReviewStep from "./steps/ReviewStep";
import Link from "next/link";

const STEP_LABELS: Record<WizardStep, string> = {
  photos: "Photographs",
  details: "Particulars",
  copy: "The writing",
  review: "Review",
};

const STEP_PROMPTS: Record<WizardStep, string> = {
  photos: "Bring us your photographs.",
  details: "Tell us about the home.",
  copy: "Now, how shall we describe it?",
  review: "One last look.",
};

export default function ListingWizard() {
  const [step, setStep] = useState<WizardStep>("photos");
  const [draftId] = useState(() => `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const [photos, setPhotos] = useState<ListingPhoto[]>([]);
  const [details, setDetails] = useState<ListingDetails>({
    bhk: "",
    area: "",
    locality: "",
    city: "",
    priceCr: "",
    features: [],
  });
  const [copy, setCopy] = useState<ListingCopy | null>(null);

  // Persist draft to localStorage so the vendor can come back
  useEffect(() => {
    const saved = localStorage.getItem(`nyvasa-${draftId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.photos) setPhotos(data.photos);
        if (data.details) setDetails(data.details);
        if (data.copy) setCopy(data.copy);
        if (data.step) setStep(data.step);
      } catch {}
    }
  }, [draftId]);

  useEffect(() => {
    localStorage.setItem(`nyvasa-${draftId}`, JSON.stringify({ photos, details, copy, step }));
  }, [photos, details, copy, step, draftId]);

  const goNext = useCallback(() => {
    const i = WIZARD_STEPS.indexOf(step);
    if (i < WIZARD_STEPS.length - 1) setStep(WIZARD_STEPS[i + 1]);
  }, [step]);

  const goBack = useCallback(() => {
    const i = WIZARD_STEPS.indexOf(step);
    if (i > 0) setStep(WIZARD_STEPS[i - 1]);
  }, [step]);

  const stepIndex = WIZARD_STEPS.indexOf(step);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b border-hairline">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-editorial">
            Nyvasa
          </Link>
          <p className="edition-mark">
            New listing &nbsp;/&nbsp; <span className="num">Draft {draftId.slice(-6)}</span>
          </p>
        </div>
      </header>

      {/* Step strip */}
      <nav className="border-b border-hairline">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center gap-12">
          {WIZARD_STEPS.map((s, i) => {
            const active = s === step;
            const done = i < stepIndex;
            return (
              <button
                key={s}
                onClick={() => done && setStep(s)}
                className={`font-ui text-xs uppercase tracking-eyebrow flex items-center gap-3 ${
                  active ? "text-ink" : done ? "text-smoke hover:text-ink" : "text-hairline"
                } ${done ? "cursor-pointer" : "cursor-default"}`}
                disabled={!done && !active}
              >
                <span className={active ? "text-sienna" : ""}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {STEP_LABELS[s]}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Step heading */}
      <section className="max-w-[1400px] mx-auto px-8 pt-20 pb-12 w-full">
        <p className="edition-mark mb-4">
          Step <span className="num">{String(stepIndex + 1).padStart(2, "0")}</span> of {WIZARD_STEPS.length}
        </p>
        <h1 className="font-display text-5xl md:text-6xl tracking-editorial leading-[1]">
          {STEP_PROMPTS[step]}
        </h1>
      </section>

      {/* Step body */}
      <section className="max-w-[1400px] mx-auto px-8 pb-24 flex-1 w-full">
        {step === "photos" && (
          <PhotosStep
            draftId={draftId}
            photos={photos}
            setPhotos={setPhotos}
          />
        )}
        {step === "details" && (
          <DetailsStep details={details} setDetails={setDetails} />
        )}
        {step === "copy" && (
          <CopyStep
            details={details}
            photos={photos}
            copy={copy}
            setCopy={setCopy}
          />
        )}
        {step === "review" && (
          <ReviewStep
            draftId={draftId}
            photos={photos}
            details={details}
            copy={copy}
          />
        )}
      </section>

      {/* Footer nav */}
      <footer className="border-t border-hairline mt-auto">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={stepIndex === 0}
            className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          {step !== "review" ? (
            <button
              onClick={goNext}
              disabled={!canAdvance(step, photos, details, copy)}
              className="btn-editorial"
            >
              Continue →
            </button>
          ) : (
            <button className="btn-editorial">Submit for review →</button>
          )}
        </div>
      </footer>
    </div>
  );
}

function canAdvance(
  step: WizardStep,
  photos: ListingPhoto[],
  details: ListingDetails,
  copy: ListingCopy | null
): boolean {
  if (step === "photos") return photos.length >= 3;
  if (step === "details") {
    return Boolean(
      details.bhk && details.area && details.locality && details.city && details.priceCr
    );
  }
  if (step === "copy") return Boolean(copy && copy.finalCopy);
  return true;
}
