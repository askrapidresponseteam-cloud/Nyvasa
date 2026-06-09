import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

/**
 * Returns a signature the client uses to upload directly to Cloudinary,
 * without exposing the API secret. Each upload is bound to a folder
 * keyed by the listing draft id.
 */
export async function POST(req: NextRequest) {
  try {
    const { listingId } = await req.json();
    if (!listingId) {
      return NextResponse.json({ error: "listingId required" }, { status: 400 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = `nyvasa/listings/${listingId}`;

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (err) {
    console.error("[cloudinary-sign]", err);
    return NextResponse.json({ error: "signing failed" }, { status: 500 });
  }
}
