"use client";

import { useInquiries, useProperties } from "@/lib/use-demo-data";
import { propertyStats } from "@/lib/property-service";
import { INQUIRY_TYPE_LABELS } from "@/types/inquiry";

function Stat({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <dt className="text-sm text-body">{label}</dt>
      <dd className="mt-1 font-display text-3xl font-extrabold text-ink">{value}</dd>
      {note && <p className="mt-1 text-xs text-body">{note}</p>}
    </div>
  );
}

export function DashboardStats({ onOpenInquiries }: { onOpenInquiries: () => void }) {
  const properties = useProperties();
  const inquiries = useInquiries();
  const s = propertyStats(properties);
  const recent = inquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <Stat label="Total properties" value={s.total} />
        <Stat label="Available" value={s.available} />
        <Stat label="Reserved" value={s.reserved} />
        <Stat label="Rented" value={s.rented} />
        <Stat label="Total inquiries" value={inquiries.length} note="Stored in this browser" />
        <Stat label="New inquiries" value={inquiries.filter((i) => i.status === "new").length} />
      </dl>

      <section aria-labelledby="recent-inq" className="rounded-lg border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="recent-inq" className="text-xl">Recent inquiries</h2>
          <button type="button" onClick={onOpenInquiries} className="rounded text-sm font-semibold text-forest underline-offset-4 hover:underline">
            View all
          </button>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm">No inquiries yet. Submit one from the contact page to see it here.</p>
        ) : (
          <ul className="divide-y divide-line">
            {recent.map((i) => (
              <li key={i.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
                <div>
                  <p className="font-semibold text-ink">{i.name}</p>
                  <p className="text-sm">{INQUIRY_TYPE_LABELS[i.inquiryType]}{i.referenceTitle ? ` · ${i.referenceTitle}` : ""}</p>
                </div>
                <p className="text-sm">{new Date(i.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
