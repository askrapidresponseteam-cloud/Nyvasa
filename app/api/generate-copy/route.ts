import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const bodySchema = z.object({
  details: z.object({
    bhk: z.string(),
    area: z.string(),
    locality: z.string(),
    city: z.string(),
    priceCr: z.string(),
    features: z.array(z.string()),
  }),
  photoUrls: z.array(z.string().url()).min(1).max(8),
});

const SYSTEM_PROMPT = `You are the copy lead for Nyvasa, a curated edition of luxury Indian homes.
Voice: editorial, restrained, confident. Never gushing. Never property-agent. Closer to a magazine
spread caption than a marketing brochure.

Rules:
- No exclamation marks. No emojis. No em-dashes; use hyphens or commas.
- Indian English spellings.
- Never say "dream home", "your dream", "luxurious", "lavish", "opulent", "boasts", "nestled", "sprawling".
- Specific over decorative. "South-facing balcony off the kitchen" beats "stunning views".
- Read the photographs. If you see materials (terrazzo, teak, marble, IPS), light, scale, lean on them.
- Length: 90-140 words for each variant.

Return JSON with exactly this shape:
{
  "extractedFeatures": ["..."],   // up to 8 short tags read from the photos
  "variants": {
    "editorial": "...",            // for a buyer who reads AD or Vogue Living
    "warm":      "...",            // for a family imagining themselves in the home
    "investor":  "..."             // for a buyer focused on yield, build quality, neighbourhood trajectory
  }
}
Return ONLY the JSON. No prose, no fences.`;

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { details, photoUrls } = bodySchema.parse(json);

    const userContent: Anthropic.ContentBlockParam[] = [
      ...photoUrls.map((url) => ({
        type: "image" as const,
        source: { type: "url" as const, url },
      })),
      {
        type: "text" as const,
        text: `Home:
- ${details.bhk}, ${details.area} sq ft
- ${details.locality}, ${details.city}
- ₹${details.priceCr} Cr
- Owner-noted features: ${details.features.join(", ") || "(none)"}

Generate the three copy variants and the extracted-features list now.`,
      },
    ];

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim()
      .replace(/^```json\s*|\s*```$/g, "");

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[generate-copy]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "generation failed" },
      { status: 500 }
    );
  }
}
