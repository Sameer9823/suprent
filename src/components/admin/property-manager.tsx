"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AREA_UNITS, PRICE_TYPES, PROPERTY_CATEGORIES, PROPERTY_STATUSES, type ImageAsset, type Property } from "@/types/property";
import { CATEGORY_LABELS } from "@/data/categories";
import { propertyStore, useProperties } from "@/lib/use-demo-data";
import { propertySchema } from "@/lib/validation";
import { formatArea, formatPrice, STATUS_LABELS } from "@/lib/property-service";
import { slugify, uid } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { StatusBadge } from "@/components/ui/badge";
import { ImagesEditor } from "./images-editor";

const field = "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25 aria-[invalid=true]:border-red-600";

const formSchema = z
  .object({
    title: z.string().trim().min(3, "Enter a title."),
    category: z.enum(PROPERTY_CATEGORIES),
    description: z.string().trim().min(10, "Add a short description."),
    area: z.string().trim().regex(/^\d+(\.\d+)?$/, "Enter the area as a number.").refine((v) => Number(v) > 0, "Area must be greater than zero."),
    areaUnit: z.enum(AREA_UNITS),
    areaIsIllustrative: z.boolean(),
    location: z.string().trim().min(2, "Enter a location."),
    priceType: z.enum(PRICE_TYPES),
    price: z.string().trim(),
    status: z.enum(PROPERTY_STATUSES),
    suitableText: z.string(),
    amenitiesText: z.string(),
    notes: z.string(),
    featured: z.boolean(),
    isSample: z.boolean(),
  })
  .superRefine((v, ctx) => {
    if (v.priceType === "fixed" && !(Number(v.price) > 0)) ctx.addIssue({ code: "custom", path: ["price"], message: "Enter the monthly rent in rupees." });
  });
type FormValues = z.infer<typeof formSchema>;

const lines = (t: string) => t.split("\n").map((l) => l.trim()).filter(Boolean);

function toFormValues(p: Property | null): FormValues {
  return {
    title: p?.title ?? "",
    category: p?.category ?? "retail-shop",
    description: p?.description ?? "",
    area: p ? String(p.area) : "",
    areaUnit: p?.areaUnit ?? "sq.ft.",
    areaIsIllustrative: p?.areaIsIllustrative ?? false,
    location: p?.location ?? "",
    priceType: p?.priceType ?? "on-request",
    price: p?.price != null ? String(p.price) : "",
    status: p?.status ?? "available",
    suitableText: p?.suitableFor.join("\n") ?? "",
    amenitiesText: p?.amenities.map((a) => (a.verified ? `[verified] ${a.label}` : a.label)).join("\n") ?? "",
    notes: p?.notes ?? "",
    featured: p?.featured ?? false,
    isSample: p?.isSample ?? false,
  };
}

function FieldMessage({ message }: { message?: string }) {
  return message ? <p role="alert" className="mt-1 text-sm font-medium text-red-700">{message}</p> : null;
}

function PropertyForm({ property, all, onDone }: { property: Property | null; all: Property[]; onDone: () => void }) {
  const [images, setImages] = useState<ImageAsset[]>(property?.images ?? []);
  const [imageError, setImageError] = useState<string>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues: toFormValues(property) });
  const priceType = useWatch({ control, name: "priceType" });
  const title = useWatch({ control, name: "title" });

  const onSubmit = (v: FormValues) => {
    const now = new Date().toISOString();
    let slug = property?.slug;
    if (!slug) {
      const base = slugify(v.title) || "listing";
      slug = base;
      for (let n = 2; all.some((p) => p.slug === slug); n++) slug = `${base}-${n}`;
    }
    const candidate: Property = {
      id: property?.id ?? uid("prop"),
      slug,
      title: v.title,
      category: v.category,
      description: v.description,
      area: Number(v.area),
      areaUnit: v.areaUnit,
      areaIsIllustrative: v.areaIsIllustrative,
      location: v.location,
      priceType: v.priceType,
      price: v.priceType === "fixed" ? Number(v.price) : null,
      status: v.status,
      images,
      amenities: lines(v.amenitiesText).map((l) => (l.toLowerCase().startsWith("[verified]") ? { label: l.slice(10).trim(), verified: true } : { label: l, verified: false })),
      suitableFor: lines(v.suitableText),
      notes: v.notes.trim(),
      featured: v.featured,
      isSample: v.isSample,
      createdAt: property?.createdAt ?? now,
      updatedAt: now,
    };
    const parsed = propertySchema.safeParse(candidate);
    if (!parsed.success) {
      const imgIssue = parsed.error.issues.find((i) => i.path[0] === "images");
      if (imgIssue) setImageError(imgIssue.message);
      toast.error(imgIssue?.message ?? parsed.error.issues[0]?.message ?? "Check the form and try again.");
      return;
    }
    try {
      propertyStore.set(property ? all.map((p) => (p.id === property.id ? parsed.data : p)) : [parsed.data, ...all]);
      toast.success(property ? "Property updated." : "Property created.");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    }
  };

  const label = "mb-1 block text-sm font-semibold text-ink";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="p-title" className={label}>Title</label>
        <input id="p-title" className={field} aria-invalid={!!errors.title} {...register("title")} />
        <FieldMessage message={errors.title?.message} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="p-cat" className={label}>Category</label>
          <select id="p-cat" className={field} {...register("category")}>
            {PROPERTY_CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="p-status" className={label}>Availability</label>
          <select id="p-status" className={field} {...register("status")}>
            {PROPERTY_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="p-area" className={label}>Area</label>
          <div className="flex gap-2">
            <input id="p-area" inputMode="decimal" className={field} aria-invalid={!!errors.area} {...register("area")} />
            <select aria-label="Area unit" className={`${field} w-28`} {...register("areaUnit")}>
              {AREA_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <FieldMessage message={errors.area?.message} />
        </div>
        <div>
          <label htmlFor="p-loc" className={label}>Location</label>
          <input id="p-loc" className={field} aria-invalid={!!errors.location} {...register("location")} />
          <FieldMessage message={errors.location?.message} />
        </div>
        <div>
          <label htmlFor="p-ptype" className={label}>Rent</label>
          <select id="p-ptype" className={field} {...register("priceType")}>
            <option value="on-request">Price on Request</option>
            <option value="fixed">Fixed monthly rent</option>
          </select>
        </div>
        {priceType === "fixed" && (
          <div>
            <label htmlFor="p-price" className={label}>Monthly rent (₹)</label>
            <input id="p-price" inputMode="numeric" className={field} aria-invalid={!!errors.price} {...register("price")} />
            <FieldMessage message={errors.price?.message} />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="p-desc" className={label}>Description</label>
        <textarea id="p-desc" rows={4} className={field} aria-invalid={!!errors.description} {...register("description")} />
        <FieldMessage message={errors.description?.message} />
      </div>
      <ImagesEditor value={images} onChange={(v) => { setImages(v); setImageError(undefined); }} defaultAlt={title} error={imageError} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="p-uses" className={label}>Potential uses (one per line)</label>
          <textarea id="p-uses" rows={4} className={field} {...register("suitableText")} />
        </div>
        <div>
          <label htmlFor="p-amen" className={label}>Listing details (one per line)</label>
          <textarea id="p-amen" rows={4} className={field} {...register("amenitiesText")} />
          <p className="mt-1 text-xs text-body">Lines are shown as “to confirm on a site visit” unless they start with [verified].</p>
        </div>
      </div>
      <div>
        <label htmlFor="p-notes" className={label}>Additional notes</label>
        <textarea id="p-notes" rows={2} className={field} {...register("notes")} />
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
        <label className="flex items-center gap-2"><input type="checkbox" className="size-4 accent-forest" {...register("featured")} /> Feature on homepage</label>
        <label className="flex items-center gap-2"><input type="checkbox" className="size-4 accent-forest" {...register("areaIsIllustrative")} /> Area is illustrative</label>
        <label className="flex items-center gap-2"><input type="checkbox" className="size-4 accent-forest" {...register("isSample")} /> Sample / demo listing</label>
      </div>
      <div className="flex justify-end gap-3 border-t border-line pt-5">
        <Button variant="outline" onClick={onDone}>Cancel</Button>
        <Button type="submit">{property ? "Save changes" : "Create property"}</Button>
      </div>
    </form>
  );
}

export function PropertyManager() {
  const properties = useProperties();
  const [editing, setEditing] = useState<Property | "new" | null>(null);
  const [deleting, setDeleting] = useState<Property | null>(null);

  const setStatus = (p: Property, status: Property["status"]) => {
    try {
      propertyStore.set(properties.map((x) => (x.id === p.id ? { ...x, status, updatedAt: new Date().toISOString() } : x)));
      toast.success(`${p.title} marked ${STATUS_LABELS[status].toLowerCase()}.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    }
  };

  const confirmDelete = () => {
    if (!deleting) return;
    try {
      propertyStore.set(properties.filter((p) => p.id !== deleting.id));
      toast.success("Property deleted.");
      setDeleting(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not delete.");
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">{properties.length} {properties.length === 1 ? "property" : "properties"}</p>
        <Button onClick={() => setEditing("new")}>
          <Plus aria-hidden className="size-4" /> Add property
        </Button>
      </div>

      {properties.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line bg-white p-10 text-center">No properties yet. Add your first one.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <caption className="sr-only">Properties</caption>
            <thead className="border-b border-line bg-canvas text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Property</th>
                <th scope="col" className="px-4 py-3 font-semibold">Area</th>
                <th scope="col" className="px-4 py-3 font-semibold">Rent</th>
                <th scope="col" className="px-4 py-3 font-semibold">Availability</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {properties.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink">{p.title}</p>
                    <p className="text-xs">{CATEGORY_LABELS[p.category]} · {p.location}{p.isSample ? " · sample" : ""}</p>
                  </td>
                  <td className="px-4 py-3">{formatArea(p)}</td>
                  <td className="px-4 py-3">{formatPrice(p)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={p.status} />
                      <label className="sr-only" htmlFor={`st-${p.id}`}>Change availability for {p.title}</label>
                      <select id={`st-${p.id}`} value={p.status} onChange={(e) => setStatus(p, e.target.value as Property["status"])} className="rounded-md border border-line bg-white px-2 py-1 text-xs text-ink">
                        {PROPERTY_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost" onClick={() => setEditing(p)} aria-label={`Edit ${p.title}`}><Pencil aria-hidden className="size-4" /> Edit</Button>
                      <Button size="sm" variant="ghost" className="text-red-700 hover:bg-red-50" onClick={() => setDeleting(p)} aria-label={`Delete ${p.title}`}><Trash2 aria-hidden className="size-4" /> Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing === "new" ? "Add property" : "Edit property"} wide>
        {editing !== null && <PropertyForm key={editing === "new" ? "new" : editing.id} property={editing === "new" ? null : editing} all={properties} onDone={() => setEditing(null)} />}
      </Modal>

      <Modal open={deleting !== null} onClose={() => setDeleting(null)} title="Delete this property?">
        <p>
          <strong className="text-ink">{deleting?.title}</strong> will be removed from the site. In this demo, you can restore the sample data from the overview tab.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
          <Button className="bg-red-700 hover:bg-red-800" onClick={confirmDelete}>Delete property</Button>
        </div>
      </Modal>
    </div>
  );
}
