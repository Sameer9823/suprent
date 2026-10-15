# SUPGS website

Premium commercial-property and facilities website for **SUPGS**, built with Next.js (App Router), TypeScript (strict), Tailwind CSS v4, Motion (Framer Motion's `motion/react` package), React Hook Form + Zod and Lucide icons.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional, see "Environment variables"
npm run dev                  # http://localhost:3000
npm run lint && npm run typecheck && npm run build
npm start                    # serve the production build
```

Requires Node 20.9+ (developed on Node 22).

## What is in the box

| Route | Purpose |
| --- | --- |
| `/` | Home: hero + working search, infrastructure, location & connectivity, categories, featured spaces, facilities, how it works |
| `/spaces` | Filterable listing (type, availability, keyword, sort, grid/list). Filters live in the URL |
| `/spaces/[slug]` | Property detail: gallery (keyboard + full-screen), infrastructure, inquiry panel, related spaces |
| `/facilities`, `/facilities/[slug]` | Library, digital car washing center, fitness center, stationery shop, hair salon, stitching center, tuition center |
| `/about`, `/contact`, `/privacy`, `/terms` | Content pages (privacy/terms are **placeholders**, not legal advice) |
| `/admin` | Demo dashboard: properties CRUD, facilities, inquiries |
| `POST /api/inquiries` | Server-side validation + optional webhook forwarding |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Property video

The home page has a video section (`#tour`, component `src/components/home/property-video.tsx`). Until a video is set it shows a "Property video coming soon" state. To add yours, set `NEXT_PUBLIC_PROPERTY_VIDEO_URL` in `.env.local`, then restart the dev server:

- A file you put in `public/videos/`, e.g. `NEXT_PUBLIC_PROPERTY_VIDEO_URL=/videos/property-tour.mp4` (use H.264 MP4, ideally under 30 MB, 1080p)
- A hosted file: `https://cdn.example.com/tour.mp4`
- A YouTube or Vimeo link: `https://youtu.be/XXXXXXXXXXX`

Optionally set `NEXT_PUBLIC_PROPERTY_VIDEO_POSTER` to a cover image URL. The heading, description and the three highlight chips are in `propertyVideo` in `src/data/site.ts`.

## Demo data and honesty rules

- All listings in `src/data/properties.ts` are **fictional samples** (`isSample: true`): location "Sample Location", illustrative areas, "Price on Request". The file covers retail, showrooms, offices, banks, healthcare, education, hospitality, events, warehousing and storage. Replace the file when real inventory exists.
- Facility services and hours in `src/data/facilities.ts` are **placeholders**; hours of `null` display "To be confirmed". The first three facilities have photos; the remaining four (stationery shop, hair salon, stitching center, tuition center) have no confirmed photos yet and use a category icon cover instead of a broken image.
- Infrastructure in `src/data/site.ts`: parking, separate boys/girls restrooms, 24-hour CCTV monitoring, road connectivity and a healthy environment are shown as provided. Location & connectivity distances on the home page are approximate and will be confirmed; the bus-stop note is flagged **"To be verified"**.
- No phone, email, address, domain or coordinates are invented. Footer and contact page show "to be added" until you set the env vars below.
- Listings with no price are never treated as zero. Listings without a published price show "Price on Request" and stay visible so they can be enquired about.
- Reserved/Rented listings have the enquiry action disabled.

## Inquiries: what really happens

1. The form validates in the browser (Zod) and again on the server.
2. `POST /api/inquiries`:
   - if `INQUIRY_WEBHOOK_URL` is set, the inquiry is forwarded and the UI says **"Inquiry sent"** only after the webhook returns success;
   - otherwise the API answers `delivered: false` and the UI says **"Demo mode: your inquiry was not sent"**.
3. A copy is kept in the visitor's own browser so the demo admin can show it.
4. If `NEXT_PUBLIC_WHATSAPP_NUMBER` is set, a working "WhatsApp instead" flow is offered.

The submission layer is isolated in `src/lib/inquiry-service.ts` (client) and `src/app/api/inquiries/route.ts` (server).

## Demo admin (`/admin`)

> **Not secure and not for production.** There is no login. Data is stored in the browser's `localStorage`, so changes are visible only on that browser and are not shared with other visitors. Stored data is re-validated with Zod and discarded if malformed.

Set `ADMIN_DEMO_ENABLED=false` to return 404 for `/admin` (e.g. in production). The server-side gate lives in `src/lib/auth.ts`.

## Environment variables

See `.env.example`. All are optional.

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_EMAIL` | Contact details, shown only when set |
| `INQUIRY_WEBHOOK_URL` | Server-only forwarding target for inquiries |
| `ADMIN_DEMO_ENABLED` | `false` hides `/admin` |
| `DATABASE_URL` | Future database |

## Images

Unsplash photo IDs are centralised in `src/data/images.ts`; `next.config.ts` allows `images.unsplash.com`. `<SafeImage>` shows a neutral fallback if any image fails, and serves admin-entered non-Unsplash URLs unoptimised. **Check every image visually before launch** (IDs were chosen from memory of Unsplash and could not be fetched while building) and replace them with real SUPGS photography when available.

## Fonts

Manrope and Inter (OFL) are self-hosted from `src/app/fonts` via `next/font/local`, so builds work offline. To use Google Fonts instead, swap the two `localFont` calls in `src/app/layout.tsx` for `next/font/google`; the CSS variable names are unchanged.

## Future backend integration

1. `npm i prisma @prisma/client`, set `DATABASE_URL`, adapt `prisma/schema.prisma` (Prisma 7 also needs a `prisma.config.ts`), run a migration.
2. Replace the three `createDemoStore` instances in `src/lib/use-demo-data.ts` and the `properties` / `facilities` imports with server-side data access (Server Components or route handlers). `src/lib/property-service.ts` is pure and can be reused as is.
3. Add real authentication in `src/lib/auth.ts`, protect `/admin`, and move admin writes to authenticated server actions. Add authenticated read endpoints for inquiries (there is deliberately no public GET).
4. Store inquiries in the database inside `route.ts`; add rate limiting and spam protection beyond the included honeypot.
5. Replace `/privacy` and `/terms` placeholders with reviewed legal text.

## Structure

```
src/app            routes, metadata, sitemap, robots, API
src/components     layout, home, properties, facilities, admin, ui
src/data           typed seed data (properties, facilities, categories, site, images)
src/lib            validation (Zod), filtering, demo storage, services, motion variants
src/types          Property, Facility, Inquiry models
prisma/            future schema (unused by the demo)
```
