import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/** Visible breadcrumb trail plus BreadcrumbList structured data (navigation data only, no business claims). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href, siteConfig.url) } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-body">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link href={c.href} className="rounded underline-offset-4 hover:text-forest hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-ink" : undefined}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className="size-3.5 text-body/60" />}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </nav>
  );
}
