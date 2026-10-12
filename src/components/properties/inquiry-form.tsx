"use client";

import { useMemo, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, Info, MessageCircle } from "lucide-react";
import { BUDGET_RANGES, INQUIRY_TYPE_LABELS, INQUIRY_TYPES, type InquiryType } from "@/types/inquiry";
import { PROPERTY_GROUPS } from "@/data/categories";
import { siteConfig } from "@/data/site";
import { inquiryInputSchema, type InquiryInput } from "@/lib/validation";
import { buildWhatsAppLink, submitInquiry, type SubmitResult } from "@/lib/inquiry-service";
import { useFacilities, useProperties } from "@/lib/use-demo-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const control =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-body/60 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/20";

function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: FieldError;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? <span aria-hidden className="text-red-700"> *</span> : <span className="font-normal text-body"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-body">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
          {error.message}
        </p>
      )}
    </div>
  );
}

interface Props {
  defaults?: Partial<Pick<InquiryInput, "inquiryType" | "propertyType" | "referenceSlug" | "message">>;
  /** Compact mode (property pages) hides the open-ended requirement fields. */
  compact?: boolean;
  idPrefix?: string;
  allowedTypes?: readonly InquiryType[];
  submitLabel?: string;
}

export function InquiryForm({ defaults, compact = false, idPrefix = "inq", allowedTypes = INQUIRY_TYPES, submitLabel = "Send inquiry" }: Props) {
  const properties = useProperties();
  const facilities = useFacilities();
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const referenceTitle = useMemo(() => {
    const slug = defaults?.referenceSlug;
    if (!slug) return "";
    return properties.find((p) => p.slug === slug)?.title ?? facilities.find((f) => f.slug === slug)?.name ?? "";
  }, [defaults?.referenceSlug, properties, facilities]);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquiryInputSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      inquiryType: defaults?.inquiryType && allowedTypes.includes(defaults.inquiryType) ? defaults.inquiryType : allowedTypes[0],
      propertyType: defaults?.propertyType ?? "",
      requiredArea: "",
      budget: "",
      preferredVisitDate: "",
      message: defaults?.message ?? "",
      referenceSlug: defaults?.referenceSlug ?? "",
      referenceTitle: "",
      consent: false,
      website: "",
    },
  });

  const id = (name: string) => `${idPrefix}-${name}`;
  const aria = (name: keyof InquiryInput, hint = false) => ({
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? id(`${name}-error`) : hint ? id(`${name}-hint`) : undefined,
  });

  const onSubmit = async (values: InquiryInput) => {
    setFormError(null);
    const res = await submitInquiry({ ...values, referenceTitle: referenceTitle || values.referenceTitle });
    if (!res.ok) {
      setFormError(res.message);
      toast.error("Inquiry not sent", { description: res.message });
      for (const [field, msgs] of Object.entries(res.fieldErrors ?? {})) {
        if (field in values && msgs[0]) setError(field as keyof InquiryInput, { message: msgs[0] });
      }
      return;
    }
    setResult(res);
    if (res.delivery === "delivered") toast.success("Inquiry sent to the SUPGS team.");
    else toast.info("Demo mode: nothing was sent to the SUPGS team.");
  };

  const whatsappHref = (values: Partial<InquiryInput>) => buildWhatsAppLink({ ...values, referenceTitle });

  if (result?.ok) {
    const delivered = result.delivery === "delivered";
    const wa = whatsappHref(result.inquiry as unknown as Partial<InquiryInput>);
    return (
      <div role="status" className={cn("rounded-lg border p-6 sm:p-8", delivered ? "border-forest/30 bg-sage/50" : "border-amber-ink/30 bg-amber-wash")}>
        <div className="flex items-start gap-3">
          {delivered ? <CheckCircle2 aria-hidden className="mt-1 size-6 shrink-0 text-forest" /> : <Info aria-hidden className="mt-1 size-6 shrink-0 text-amber-ink" />}
          <div>
            <h3 className="text-xl">{delivered ? "Inquiry sent" : "Demo mode: your inquiry was not sent"}</h3>
            <p className="mt-2 text-ink/80">
              {delivered
                ? "The SUPGS team has received your details and will contact you on the phone number you gave."
                : "Your details passed validation, but this site has no inbox or database connected yet, so the SUPGS team has not received them. A copy is stored only in this browser for the demo admin."}
            </p>
            {!delivered && (
              <p className="mt-2 text-ink/80">
                {wa ? "To reach the team now, continue on WhatsApp." : "WhatsApp and phone details will appear here once SUPGS adds them."}
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-forest px-5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-forest-dark"
                >
                  <MessageCircle aria-hidden className="size-4" /> Continue on WhatsApp
                </a>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setResult(null);
                  reset();
                }}
              >
                Send another inquiry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Inquiry form">
      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("referenceSlug")} />
      <input type="hidden" {...register("referenceTitle")} />

      {defaults?.referenceSlug && referenceTitle && (
        <p className="rounded-md bg-sage/60 px-3.5 py-2.5 text-sm text-ink">
          Inquiring about: <strong>{referenceTitle}</strong>
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Full name" required error={errors.name}>
          <input id={id("name")} autoComplete="name" className={control} {...aria("name")} {...register("name")} />
        </Field>
        <Field id={id("phone")} label="Phone number" required error={errors.phone} hint="10-digit Indian mobile number. +91 is optional.">
          <input id={id("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" className={control} {...aria("phone", true)} {...register("phone")} />
        </Field>
        <Field id={id("email")} label="Email address" error={errors.email} className="sm:col-span-2">
          <input id={id("email")} type="email" autoComplete="email" className={control} {...aria("email")} {...register("email")} />
        </Field>
        <Field id={id("inquiryType")} label="Inquiry type" required error={errors.inquiryType}>
          <select id={id("inquiryType")} className={control} {...aria("inquiryType")} {...register("inquiryType")}>
            {allowedTypes.map((t) => (
              <option key={t} value={t}>
                {INQUIRY_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("preferredVisitDate")} label="Preferred visit date" error={errors.preferredVisitDate}>
          <input id={id("preferredVisitDate")} type="date" className={control} {...aria("preferredVisitDate")} {...register("preferredVisitDate")} />
        </Field>

        {!compact && (
          <>
            <Field id={id("propertyType")} label="Preferred property type" error={errors.propertyType}>
              <select id={id("propertyType")} className={control} {...register("propertyType")}>
                <option value="">Not sure yet</option>
                {PROPERTY_GROUPS.map((g) => (
                  <option key={g.id} value={g.label}>
                    {g.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={id("requiredArea")} label="Approximate area needed (sq. ft.)" error={errors.requiredArea}>
              <input id={id("requiredArea")} inputMode="numeric" placeholder="e.g. 1200" className={control} {...aria("requiredArea")} {...register("requiredArea")} />
            </Field>
            <Field id={id("budget")} label="Budget range" error={errors.budget} className="sm:col-span-2">
              <select id={id("budget")} className={control} {...register("budget")}>
                <option value="">Prefer to discuss</option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}

        <Field id={id("message")} label="Message" required error={errors.message} className="sm:col-span-2">
          <textarea id={id("message")} rows={compact ? 3 : 5} className={control} placeholder="Tell us about your business and what you need." {...aria("message")} {...register("message")} />
        </Field>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 rounded border-line accent-forest"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? id("consent-error") : undefined}
            {...register("consent")}
          />
          <span>I agree that SUPGS may use the details I submit to respond to this inquiry. See the privacy policy.</span>
        </label>
        {errors.consent && (
          <p id={id("consent-error")} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
            {errors.consent.message}
          </p>
        )}
      </div>

      {formError && (
        <div role="alert" className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {formError}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" loading={isSubmitting} arrow>
          {isSubmitting ? "Sending…" : submitLabel}
        </Button>
        {siteConfig.whatsappNumber && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const link = whatsappHref(getValues());
              if (link) window.open(link, "_blank", "noopener,noreferrer");
            }}
          >
            <MessageCircle aria-hidden className="size-4" /> WhatsApp instead
          </Button>
        )}
      </div>
      <p className="text-xs text-body">
        Until a backend is connected, this form runs in demo mode and will tell you clearly that nothing was delivered.
      </p>
    </form>
  );
}
