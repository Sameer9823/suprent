"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import type { Facility } from "@/types/facility";
import type { ImageAsset } from "@/types/property";
import { facilityStore, useFacilities } from "@/lib/use-demo-data";
import { facilitySchema } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ImagesEditor } from "./images-editor";

const field = "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25";
const label = "mb-1 block text-sm font-semibold text-ink";
const lines = (t: string) => t.split("\n").map((l) => l.trim()).filter(Boolean);

interface Values {
  tagline: string;
  description: string;
  servicesText: string;
  hoursText: string;
  isPublished: boolean;
}

function FacilityForm({ facility, all, onDone }: { facility: Facility; all: Facility[]; onDone: () => void }) {
  const [images, setImages] = useState<ImageAsset[]>(facility.images);
  const [imageError, setImageError] = useState<string>();
  const { register, handleSubmit } = useForm<Values>({
    defaultValues: {
      tagline: facility.tagline,
      description: facility.description,
      servicesText: facility.services.join("\n"),
      hoursText: facility.operatingHours.map((h) => `${h.label} | ${h.hours ?? ""}`).join("\n"),
      isPublished: facility.isPublished,
    },
  });

  const onSubmit = (v: Values) => {
    const candidate: Facility = {
      ...facility,
      tagline: v.tagline.trim(),
      description: v.description.trim(),
      services: lines(v.servicesText),
      operatingHours: lines(v.hoursText).map((l) => {
        const [lab, ...rest] = l.split("|");
        const hours = rest.join("|").trim();
        return { label: lab.trim(), hours: hours || null };
      }),
      images,
      isPublished: v.isPublished,
    };
    const parsed = facilitySchema.safeParse(candidate);
    if (!parsed.success) {
      const imgIssue = parsed.error.issues.find((i) => i.path[0] === "images");
      if (imgIssue) setImageError(imgIssue.message);
      toast.error(parsed.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }
    try {
      facilityStore.set(all.map((f) => (f.id === facility.id ? parsed.data : f)));
      toast.success("Facility updated.");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="f-tag" className={label}>Tagline</label>
        <input id="f-tag" className={field} {...register("tagline")} />
      </div>
      <div>
        <label htmlFor="f-desc" className={label}>Description</label>
        <textarea id="f-desc" rows={4} className={field} {...register("description")} />
      </div>
      <div>
        <label htmlFor="f-serv" className={label}>Services and features (one per line)</label>
        <textarea id="f-serv" rows={4} className={field} {...register("servicesText")} />
      </div>
      <div>
        <label htmlFor="f-hours" className={label}>Operating hours (one per line: Label | hours)</label>
        <textarea id="f-hours" rows={3} className={field} {...register("hoursText")} />
        <p className="mt-1 text-xs text-body">Leave the part after “|” empty to show “To be confirmed”.</p>
      </div>
      <ImagesEditor value={images} onChange={(v) => { setImages(v); setImageError(undefined); }} defaultAlt={facility.name} error={imageError} />
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" className="size-4 accent-forest" {...register("isPublished")} /> Published (visible on the public site)
      </label>
      <div className="flex justify-end gap-3 border-t border-line pt-5">
        <Button variant="outline" onClick={onDone}>Cancel</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

export function FacilityManager() {
  const facilities = useFacilities();
  const [editing, setEditing] = useState<Facility | null>(null);

  const togglePublished = (f: Facility) => {
    try {
      facilityStore.set(facilities.map((x) => (x.id === f.id ? { ...x, isPublished: !x.isPublished } : x)));
      toast.success(`${f.name} is now ${f.isPublished ? "hidden" : "visible"}.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    }
  };

  return (
    <div>
      <ul className="space-y-3">
        {facilities.map((f) => (
          <li key={f.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-4">
            <div>
              <p className="font-display text-lg font-bold text-ink">{f.name}</p>
              <p className="text-sm">{f.services.length} services · {f.images.length} images</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={f.isPublished}
                aria-label={`${f.name} visible on site`}
                onClick={() => togglePublished(f)}
                className={cn("relative h-6 w-11 rounded-full transition-colors", f.isPublished ? "bg-forest" : "bg-body/40")}
              >
                <span aria-hidden className={cn("absolute top-0.5 size-5 rounded-full bg-white transition-all", f.isPublished ? "left-[22px]" : "left-0.5")} />
              </button>
              <span className="w-20 text-sm">{f.isPublished ? "Published" : "Hidden"}</span>
              <Button size="sm" variant="outline" onClick={() => setEditing(f)}>
                <Pencil aria-hidden className="size-4" /> Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing ? `Edit ${editing.name}` : "Edit facility"} wide>
        {editing && <FacilityForm key={editing.id} facility={editing} all={facilities} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  );
}
