"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import { toast } from "sonner";
import { INQUIRY_STATUSES, INQUIRY_TYPES, INQUIRY_TYPE_LABELS, type Inquiry, type InquiryStatus, type InquiryType } from "@/types/inquiry";
import { inquiryStore, useInquiries } from "@/lib/use-demo-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

const statusLabel: Record<InquiryStatus, string> = { new: "New", contacted: "Contacted", resolved: "Resolved" };
const statusStyle: Record<InquiryStatus, string> = {
  new: "bg-amber-wash text-amber-ink",
  contacted: "bg-sage text-forest",
  resolved: "bg-charcoal text-white",
};
const fmt = (iso: string) => new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

export function InquiryManager() {
  const inquiries = useInquiries();
  const [type, setType] = useState<InquiryType | "all">("all");
  const [status, setStatus] = useState<InquiryStatus | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const shown = inquiries.filter((i) => (type === "all" || i.inquiryType === type) && (status === "all" || i.status === status));
  const open: Inquiry | undefined = inquiries.find((i) => i.id === openId);

  const update = (id: string, next: InquiryStatus) => {
    try {
      inquiryStore.set(inquiries.map((i) => (i.id === id ? { ...i, status: next } : i)));
      toast.success(`Marked ${statusLabel[next].toLowerCase()}.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    }
  };

  const select = "rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25";

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="iq-type" className="mb-1 block text-xs font-semibold text-ink">Inquiry type</label>
          <select id="iq-type" className={select} value={type} onChange={(e) => setType(e.target.value as InquiryType | "all")}>
            <option value="all">All types</option>
            {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{INQUIRY_TYPE_LABELS[t]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="iq-status" className="mb-1 block text-xs font-semibold text-ink">Status</label>
          <select id="iq-status" className={select} value={status} onChange={(e) => setStatus(e.target.value as InquiryStatus | "all")}>
            <option value="all">Any status</option>
            {INQUIRY_STATUSES.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
          </select>
        </div>
        <p className="pb-2 text-sm" role="status">{shown.length} of {inquiries.length} shown</p>
      </div>

      {shown.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line bg-white px-6 py-14 text-center">
          <Inbox aria-hidden className="mx-auto size-9 text-forest/70" />
          <p className="mt-3 font-semibold text-ink">{inquiries.length === 0 ? "No inquiries yet" : "No inquiries match these filters"}</p>
          <p className="mt-1 text-sm">{inquiries.length === 0 ? "Inquiries submitted from the contact form in this browser appear here." : "Change the filters to see more."}</p>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
          {shown.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
              <div className="min-w-0">
                <p className="font-semibold text-ink">{i.name}</p>
                <p className="truncate text-sm">{INQUIRY_TYPE_LABELS[i.inquiryType]}{i.referenceTitle ? ` · ${i.referenceTitle}` : ""} · {fmt(i.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("rounded px-2 py-1 text-xs font-semibold", statusStyle[i.status])}>{statusLabel[i.status]}</span>
                <Button size="sm" variant="outline" onClick={() => setOpenId(i.id)}>View</Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={!!open} onClose={() => setOpenId(null)} title={open ? `Inquiry from ${open.name}` : "Inquiry"}>
        {open && (
          <div>
            <dl className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-2.5 text-sm">
              {[
                ["Type", INQUIRY_TYPE_LABELS[open.inquiryType]],
                ["Phone", open.phone],
                ["Email", open.email || "Not given"],
                ["About", open.referenceTitle || "General"],
                ["Property type", open.propertyType || "Not given"],
                ["Area needed", open.requiredArea ? `${open.requiredArea} sq. ft.` : "Not given"],
                ["Budget", open.budget || "Not given"],
                ["Visit date", open.preferredVisitDate || "Not given"],
                ["Received", fmt(open.createdAt)],
                ["Delivery", open.delivery === "delivered" ? "Delivered to backend" : "Saved in this browser only"],
              ].map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-semibold text-ink">{k}</dt>
                  <dd className="break-words">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 whitespace-pre-wrap rounded-md bg-canvas p-3 text-sm text-ink">{open.message}</p>
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Update status">
              {INQUIRY_STATUSES.map((s) => (
                <Button key={s} size="sm" variant={open.status === s ? "primary" : "outline"} aria-pressed={open.status === s} onClick={() => update(open.id, s)}>
                  {s === "new" ? "Mark new" : s === "contacted" ? "Mark contacted" : "Mark resolved"}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
