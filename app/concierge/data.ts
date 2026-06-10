// Mock data for the Elite Concierge experience (Modules 12 + 13).
// Swap with Firestore data in the backend phase - shapes are designed for it.

export interface Advisor {
  name: string;
  role: string;
  initials: string;
  phone: string;
  languages: string[];
  specialties: string[];
}

export interface BriefingItem {
  icon: "estate" | "visit" | "finance";
  text: string;
  strong: string;
}

export interface JourneyStage {
  n: number;
  title: string;
  status: "done" | "active" | "next" | "upcoming";
  detail: string;
  ai: string;
  action: string;
  docs?: string[];
}

export const CLIENT = {
  firstName: "Raj",
  searchLabel: "Coastal villa search",
  memberSince: "2026",
  tier: "Nyvasa Private",
};

export const ADVISOR: Advisor = {
  name: "Aarav Menon",
  role: "Senior Property Advisor",
  initials: "AM",
  phone: "+91 98450 00000",
  languages: ["English", "Hindi", "Kannada"],
  specialties: [
    "Property shortlisting",
    "Site visits",
    "Negotiations",
    "Documentation",
    "Financing",
    "Interior planning",
    "Move-in support",
  ],
};

export const BRIEFING: BriefingItem[] = [
  { icon: "estate", strong: "3 new estates", text: "match your lifestyle profile" },
  { icon: "visit", strong: "Casa Aranya", text: "private viewing confirmed for Saturday" },
  { icon: "finance", strong: "Loan pre-approved", text: "up to \u20B94.2 Cr at preferred terms" },
];

export const JOURNEY: JourneyStage[] = [
  {
    n: 1,
    title: "Understanding your lifestyle",
    status: "done",
    detail: "Family profile, design taste and location preferences captured across two conversations.",
    ai: "Lifestyle DNA built - coastal, nature-connected, modern minimalist.",
    action: "Review your profile",
  },
  {
    n: 2,
    title: "Curating properties",
    status: "active",
    detail: "AI is analysing 1,240 verified homes against your profile. Aarav reviews every shortlist before it reaches you.",
    ai: "5 estates shortlisted - 3 new this week. Confidence rising as you react to homes.",
    action: "See this week's shortlist",
  },
  {
    n: 3,
    title: "Private viewing",
    status: "next",
    detail: "Door-to-door visit plan - chauffeured pickup, advisor briefing over coffee, private walkthroughs.",
    ai: "Casa Aranya scheduled Saturday. A second estate can be added to the same plan.",
    action: "View Saturday's plan",
  },
  {
    n: 4,
    title: "Financial planning",
    status: "upcoming",
    detail: "The Private Finance Desk structures the purchase - personal, investment or family office.",
    ai: "Pre-approval in place. Bank comparison ready when you choose the estate.",
    action: "Open Finance Desk",
    docs: ["PAN", "Income proof", "Bank statements - 6 months"],
  },
  {
    n: 5,
    title: "Negotiation",
    status: "upcoming",
    detail: "Nyvasa Intelligence benchmarks fair value from nearby transactions. Aarav handles every conversation.",
    ai: "Fair-value analysis unlocks after your viewing.",
    action: "How negotiation works",
  },
  {
    n: 6,
    title: "Legal verification",
    status: "upcoming",
    detail: "Title, encumbrance, approvals and tax records - verified and stored in your Property Vault.",
    ai: "Casa Aranya: ownership chain already verified for 18 years. No disputes detected.",
    action: "Preview the Vault",
    docs: ["Sale deed", "Encumbrance certificate", "Khata", "Tax receipts"],
  },
  {
    n: 7,
    title: "Interior experience",
    status: "upcoming",
    detail: "Designers, architects, automation and landscaping - curated to your taste, managed for you.",
    ai: "Three design studios matched to modern-minimalist coastal homes.",
    action: "Meet the studios",
  },
  {
    n: 8,
    title: "Move-in concierge",
    status: "upcoming",
    detail: "Premium relocation, staffing, security and a single point of contact until you are settled.",
    ai: "Activates at registration - nothing for you to plan.",
    action: "What's included",
  },
];
