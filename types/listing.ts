export type ListingPhoto = {
  publicId: string;
  originalUrl: string;
  enhancedUrl: string;
  framedUrl: string;
  width: number;
  height: number;
  qualityScore?: number;
};

export type ListingDetails = {
  bhk: string;          // "2 BHK" | "3 BHK" | "4 BHK" | "5+ BHK" | "Villa"
  area: string;         // sq ft
  locality: string;
  city: string;
  priceCr: string;      // in Crores
  features: string[];
};

export type ListingCopy = {
  extractedFeatures: string[];
  variants: { editorial: string; warm: string; investor: string };
  chosenVariant: "editorial" | "warm" | "investor";
  finalCopy: string;
};

export type Listing = {
  id: string;
  ownerId: string;
  status: "draft" | "pending_review" | "published" | "rejected";
  edition: number;       // The signature № 142
  photos: ListingPhoto[];
  details: ListingDetails;
  copy: ListingCopy | null;
  verification: {
    titleDoc?: string;
    ownerIdDoc?: string;
    videoWalkthrough?: string;
    inPersonVerified: boolean;
  };
  createdAt: number;
  updatedAt: number;
};

export const WIZARD_STEPS = ["photos", "details", "copy", "review"] as const;
export type WizardStep = (typeof WIZARD_STEPS)[number];
