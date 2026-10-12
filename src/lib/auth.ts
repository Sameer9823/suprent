import { notFound } from "next/navigation";

/**
 * Admin access gate (server side). TODAY this only honours ADMIN_DEMO_ENABLED, because
 * the demo dashboard has no real authentication. Before using /admin with real data:
 *  1. add a real auth provider (Auth.js, Clerk, etc.) and check the session here,
 *  2. move reads/writes from localStorage to server actions or API routes that also
 *     call this check,
 *  3. keep /admin and /api/* out of search indexes (already done in robots.ts).
 */
export function assertAdminAccess() {
  if (process.env.ADMIN_DEMO_ENABLED === "false") notFound();
}
