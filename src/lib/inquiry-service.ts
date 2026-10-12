import { siteConfig } from "@/data/site";
import { INQUIRY_TYPE_LABELS, type Inquiry } from "@/types/inquiry";
import { normalizePhone, type InquiryInput } from "./validation";
import { inquiryStore } from "./use-demo-data";
import { uid } from "./utils";

export type SubmitResult =
  | { ok: true; delivery: "delivered" | "local"; inquiry: Inquiry }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

/**
 * Single submission entry point. To change how inquiries are delivered, change the
 * API route (src/app/api/inquiries/route.ts); the form does not need to know.
 *
 * Honesty rule: `delivery: "delivered"` is returned ONLY when the server confirms that a
 * backend (INQUIRY_WEBHOOK_URL) accepted the inquiry. Otherwise the inquiry is kept in
 * this browser (for the demo admin) and the UI says so.
 */
export async function submitInquiry(values: InquiryInput): Promise<SubmitResult> {
  let res: Response;
  try {
    res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  } catch {
    return { ok: false, message: "We could not reach the server. Check your connection and try again." };
  }

  const body = (await res.json().catch(() => null)) as {
    ok?: boolean;
    delivered?: boolean;
    message?: string;
    fieldErrors?: Record<string, string[]>;
  } | null;

  if (!res.ok || !body?.ok) {
    return {
      ok: false,
      message: body?.message ?? "Something went wrong while sending your inquiry. Please try again.",
      fieldErrors: body?.fieldErrors,
    };
  }

  const delivery = body.delivered ? "delivered" : "local";
  const inquiry: Inquiry = {
    id: uid("inq"),
    name: values.name.trim(),
    phone: normalizePhone(values.phone),
    email: values.email.trim(),
    inquiryType: values.inquiryType,
    propertyType: values.propertyType,
    requiredArea: values.requiredArea,
    budget: values.budget,
    preferredVisitDate: values.preferredVisitDate,
    message: values.message.trim(),
    referenceSlug: values.referenceSlug,
    referenceTitle: values.referenceTitle,
    status: "new",
    delivery,
    createdAt: new Date().toISOString(),
  };
  try {
    inquiryStore.set([inquiry, ...inquiryStore.getSnapshot()]);
  } catch {
    /* demo copy is optional; the real delivery result still stands */
  }
  return { ok: true, delivery, inquiry };
}

export function buildWhatsAppLink(values: Partial<InquiryInput>): string | null {
  if (!siteConfig.whatsappNumber) return null;
  const lines = [
    `Hello SUPGS, I would like to make a ${INQUIRY_TYPE_LABELS[values.inquiryType ?? "general"].toLowerCase()}.`,
    values.referenceTitle ? `Regarding: ${values.referenceTitle}` : "",
    values.propertyType ? `Property type: ${values.propertyType}` : "",
    values.requiredArea ? `Approx. area: ${values.requiredArea} sq. ft.` : "",
    values.budget ? `Budget: ${values.budget}` : "",
    values.preferredVisitDate ? `Preferred visit date: ${values.preferredVisitDate}` : "",
    values.message ? `Message: ${values.message}` : "",
    values.name ? `Name: ${values.name}` : "",
    values.phone ? `Phone: ${values.phone}` : "",
  ].filter(Boolean);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
