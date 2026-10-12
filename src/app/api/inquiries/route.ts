import { NextResponse } from "next/server";
import { z } from "zod";
import { inquiryInputSchema, normalizePhone } from "@/lib/validation";

/**
 * POST /api/inquiries
 *
 * Validates the inquiry on the server (the browser is never trusted) and, if
 * INQUIRY_WEBHOOK_URL is configured, forwards it. With no webhook it answers
 * `delivered: false`, so the UI can say honestly that nothing reached the team.
 *
 * There is intentionally NO GET handler: inquiry data must never be readable
 * through a public endpoint. Add authenticated read endpoints when a database exists.
 * Production note: add rate limiting (e.g. Upstash, Vercel WAF) before launch.
 */
export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 50_000) {
    return NextResponse.json({ ok: false, message: "That request is too large." }, { status: 413 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The request could not be read." }, { status: 400 });
  }

  const parsed = inquiryInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Some details need fixing. Check the highlighted fields.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const { website: _honeypot, ...data } = parsed.data;
  void _honeypot;
  const payload = { ...data, phone: normalizePhone(data.phone), submittedAt: new Date().toISOString() };

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("Inquiry delivery failed:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { ok: false, message: "We couldn't deliver your inquiry just now. Please try again in a moment." },
      { status: 502 },
    );
  }
}
