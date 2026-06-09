"use client";

import { useState, useCallback, useRef } from "react";
import type { ListingPhoto } from "@/types/listing";
import Image from "next/image";

interface Props {
  draftId: string;
  photos: ListingPhoto[];
  setPhotos: (p: ListingPhoto[] | ((prev: ListingPhoto[]) => ListingPhoto[])) => void;
}

export default function PhotosStep({ draftId, photos, setPhotos }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (files: FileList | File[]) => {
      setUploading(true);
      try {
        const signRes = await fetch("/api/cloudinary-sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listingId: draftId }),
        });
        const { signature, timestamp, folder, apiKey, cloudName } = await signRes.json();

        const fileArray = Array.from(files);
        const uploaded: ListingPhoto[] = [];

        for (const file of fileArray) {
          const form = new FormData();
          form.append("file", file);
          form.append("api_key", apiKey);
          form.append("timestamp", String(timestamp));
          form.append("signature", signature);
          form.append("folder", folder);

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: "POST", body: form }
          );
          if (!res.ok) {
            console.error("upload failed", await res.text());
            continue;
          }
          const data = await res.json();

          const base = `https://res.cloudinary.com/${cloudName}/image/upload`;
          uploaded.push({
            publicId: data.public_id,
            originalUrl: data.secure_url,
            enhancedUrl: `${base}/e_improve,e_auto_color,e_sharpen:80,q_auto:best,f_auto/${data.public_id}`,
            framedUrl: `${base}/c_pad,b_rgb:FAF7F0,w_1.04,h_1.10/e_improve,e_auto_color,e_sharpen:80,q_auto:best,f_auto/${data.public_id}`,
            width: data.width,
            height: data.height,
          });
        }
        setPhotos((prev) => [...prev, ...uploaded]);
      } catch (err) {
        console.error("upload error", err);
      } finally {
        setUploading(false);
      }
    },
    [draftId, setPhotos]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
  };

  const removePhoto = (publicId: string) => {
    setPhotos((prev) => prev.filter((p) => p.publicId !== publicId));
  };

  return (
    <div className="grid grid-cols-12 gap-12">
      {/* Left: instructions + drop zone */}
      <div className="col-span-12 md:col-span-5">
        <p className="font-body text-xl text-smoke leading-relaxed mb-8">
          Upload between three and twenty photographs. Phone shots are welcome.
          Each will be corrected for exposure, white balance, and perspective.
          You will see the before and after.
        </p>

        <div
          className={`dropzone ${dragging ? "dragging" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && upload(e.target.files)}
          />
          {uploading ? (
            <p className="font-ui text-xs uppercase tracking-eyebrow text-smoke">
              Uploading and correcting…
            </p>
          ) : (
            <>
              <p className="font-display text-2xl tracking-editorial mb-3">
                Drop photographs here
              </p>
              <p className="font-ui text-xs uppercase tracking-eyebrow text-smoke">
                or click to select &nbsp;·&nbsp; JPG, PNG, HEIC
              </p>
            </>
          )}
        </div>

        <div className="mt-8 font-ui text-xs uppercase tracking-eyebrow text-smoke">
          {photos.length} of 3 minimum {photos.length >= 3 && <span className="text-loden ml-2">✓ ready to continue</span>}
        </div>
      </div>

      {/* Right: before/after gallery */}
      <div className="col-span-12 md:col-span-7">
        {photos.length === 0 ? (
          <div className="border border-dashed border-hairline h-96 flex items-center justify-center">
            <p className="font-ui text-xs uppercase tracking-eyebrow text-smoke">
              The corrected photographs will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {photos.map((p) => (
              <BeforeAfter key={p.publicId} photo={p} onRemove={() => removePhoto(p.publicId)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BeforeAfter({ photo, onRemove }: { photo: ListingPhoto; onRemove: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="edition-mark">
          Original &nbsp;/&nbsp; <span className="num">Nyvasa corrected</span>
        </p>
        <button
          onClick={onRemove}
          className="font-ui text-xs uppercase tracking-eyebrow text-smoke hover:text-sienna"
        >
          Remove
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="aspect-[4/3] relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.originalUrl} alt="original" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="aspect-[4/3] relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.enhancedUrl} alt="enhanced" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
