import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

/**
 * The Nyvasa enhancement chain — applied to every uploaded photo.
 * `e_improve` auto-corrects exposure and contrast,
 * `e_auto_color` corrects white balance,
 * `e_sharpen:80` adds gentle sharpening,
 * `q_auto:best` and `f_auto` deliver the best format at the best quality for the viewer's browser.
 */
export const enhanceTransforms = [
  "e_improve",
  "e_auto_color",
  "e_sharpen:80",
  "q_auto:best",
  "f_auto",
];

/**
 * Editorial framing — adds a thin bone-coloured border with a wider bottom margin
 * for caption space, matching the Nyvasa aesthetic.
 */
export const editorialFrame = [
  "c_pad,b_rgb:FAF7F0,w_1.04,h_1.10",
];

/**
 * Build a CDN URL for a Cloudinary public_id with the full Nyvasa treatment.
 */
export function nyvasaUrl(publicId: string, opts?: { framed?: boolean; width?: number }) {
  const ops: string[] = [...enhanceTransforms];
  if (opts?.framed) ops.unshift(...editorialFrame);
  if (opts?.width) ops.push(`w_${opts.width}`);
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloud}/image/upload/${ops.join(",")}/${publicId}`;
}
