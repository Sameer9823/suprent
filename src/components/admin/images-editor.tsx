"use client";

import { useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import type { ImageAsset } from "@/types/property";
import { Button } from "@/components/ui/button";

const MAX_UPLOAD_BYTES = 500 * 1024;
const field = "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25";

export function ImagesEditor({ value, onChange, defaultAlt, error }: { value: ImageAsset[]; onChange: (v: ImageAsset[]) => void; defaultAlt: string; error?: string }) {
  const [url, setUrl] = useState("");

  const add = (src: string) => onChange([...value, { src, alt: `${defaultAlt || "Photo"} ${value.length + 1}` }]);

  const addUrl = () => {
    const v = url.trim();
    if (!/^https:\/\/\S+$/i.test(v) && !/^\/\S+$/.test(v)) {
      toast.error("Enter an https:// image URL or a /path to an image.");
      return;
    }
    add(v);
    setUrl("");
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!/^image\/(png|jpe?g|webp|gif)$/.test(file.type)) return void toast.error("Choose a PNG, JPEG, WebP or GIF image.");
    if (file.size > MAX_UPLOAD_BYTES) return void toast.error("Image is over 500 KB. Use a smaller image or paste a URL instead.");
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" && add(reader.result);
    reader.onerror = () => toast.error("The image could not be read.");
    reader.readAsDataURL(file);
  };

  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-semibold text-ink">Images</legend>
      {value.length > 0 && (
        <ul className="mb-3 space-y-2">
          {value.map((img, i) => (
            <li key={i} className="flex items-center gap-2 rounded-md border border-line p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt="" className="size-12 shrink-0 rounded object-cover bg-sage" />
              <div className="min-w-0 flex-1 space-y-1">
                <p className="truncate text-xs text-body" title={img.src.startsWith("data:") ? "Uploaded image" : img.src}>
                  {img.src.startsWith("data:") ? "Uploaded image (stored in this browser)" : img.src}
                </p>
                <label className="sr-only" htmlFor={`alt-${i}`}>Alt text for image {i + 1}</label>
                <input id={`alt-${i}`} value={img.alt} onChange={(e) => onChange(value.map((v, j) => (j === i ? { ...v, alt: e.target.value } : v)))} className={field} placeholder="Describe the image" />
              </div>
              <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label={`Remove image ${i + 1}`} className="grid size-9 shrink-0 place-items-center rounded-md text-red-700 hover:bg-red-50">
                <Trash2 aria-hidden className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="img-url" className="sr-only">Image URL</label>
          <input id="img-url" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())} placeholder="https://images.unsplash.com/…" className={field} />
        </div>
        <Button variant="outline" size="sm" className="h-auto" onClick={addUrl}>
          <ImagePlus aria-hidden className="size-4" /> Add URL
        </Button>
        <label className="inline-flex h-auto cursor-pointer items-center justify-center gap-2 rounded-md border border-ink/20 bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-forest hover:bg-sage/40 focus-within:outline-2 focus-within:outline-forest">
          <Upload aria-hidden className="size-4" /> Upload
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={onFile} className="sr-only" />
        </label>
      </div>
      <p className="mt-1.5 text-xs text-body">Uploads (max 500 KB) are stored in this browser only, so prefer URLs for anything you want to keep.</p>
      {error && <p role="alert" className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </fieldset>
  );
}
