"use client";

import { useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { resetAllDemoData } from "@/lib/use-demo-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Modal } from "@/components/ui/modal";
import { DashboardStats } from "./dashboard-stats";
import { PropertyManager } from "./property-manager";
import { FacilityManager } from "./facility-manager";
import { InquiryManager } from "./inquiry-manager";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "properties", label: "Properties" },
  { id: "facilities", label: "Facilities" },
  { id: "inquiries", label: "Inquiries" },
] as const;
type TabId = (typeof tabs)[number]["id"];

export function AdminDashboard() {
  const [tab, setTab] = useState<TabId>("overview");
  const [confirmReset, setConfirmReset] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = tabs[(i + dir + tabs.length) % tabs.length];
    setTab(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <Container className="py-10 sm:py-14">
      <div role="note" className="mb-8 flex items-start gap-3 rounded-lg border border-amber-ink/30 bg-amber-wash p-4 text-sm text-amber-ink">
        <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0" />
        <p>
          <strong>Demo admin, not secure.</strong> There is no login, and everything you change is stored in this browser only (localStorage). Visitors on other devices do not see these changes. Do not use this for real administration.
        </p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl">Admin dashboard</h1>
        <Button variant="outline" size="sm" onClick={() => setConfirmReset(true)}>Reset demo data</Button>
      </div>

      <div role="tablist" aria-label="Admin sections" className="mt-8 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { tabRefs.current[t.id] = el; }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn("-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-[0.95rem] font-semibold transition-colors", tab === t.id ? "border-forest text-forest" : "border-transparent text-body hover:text-ink")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="mt-8">
        {tab === "overview" && <DashboardStats onOpenInquiries={() => setTab("inquiries")} />}
        {tab === "properties" && <PropertyManager />}
        {tab === "facilities" && <FacilityManager />}
        {tab === "inquiries" && <InquiryManager />}
      </div>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset demo data?">
        <p>This removes your edits, new properties and saved demo inquiries from this browser and restores the original sample data.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setConfirmReset(false)}>Cancel</Button>
          <Button
            className="bg-red-700 hover:bg-red-800"
            onClick={() => {
              resetAllDemoData();
              setConfirmReset(false);
              toast.success("Demo data restored.");
            }}
          >
            Reset everything
          </Button>
        </div>
      </Modal>
    </Container>
  );
}
