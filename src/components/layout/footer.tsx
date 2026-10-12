import Link from "next/link";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { footerLegal, navLinks, siteConfig } from "@/data/site";
import { PROPERTY_GROUPS } from "@/data/categories";
import { facilities } from "@/data/facilities";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

const linkClass = "rounded text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline";

function Placeholder({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string | null; href?: string }) {
  return (
    <li className="flex items-start gap-3">
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-sage" />
      <span className="text-white/75">
        {value ? (
          <a href={href} className={linkClass}>
            {value}
          </a>
        ) : (
          <>
            <span className="sr-only">{label}: </span>
            {label} to be added
          </>
        )}
      </span>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-on-dark className="mt-24 bg-charcoal text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        <div className="md:col-span-2 lg:col-span-1">
          <Logo inverted />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
            Commercial spaces for rent and useful everyday facilities, in one accessible destination.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-display text-base text-white">Quick links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rental categories">
          <h2 className="font-display text-base text-white">Rental categories</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {PROPERTY_GROUPS.filter((g) => g.id !== "other").map((g) => (
              <li key={g.id}>
                <Link href={`/spaces?type=${g.id}`} className={linkClass}>
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our facilities">
          <h2 className="font-display text-base text-white">Our facilities</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {facilities.map((f) => (
              <li key={f.slug}>
                <Link href={`/facilities/${f.slug}`} className={linkClass}>
                  {f.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <Placeholder icon={Phone} label="Phone number" value={siteConfig.phone} href={siteConfig.phone ? `tel:${siteConfig.phone}` : undefined} />
            <Placeholder icon={Mail} label="Email address" value={siteConfig.email} href={siteConfig.email ? `mailto:${siteConfig.email}` : undefined} />
            <Placeholder
              icon={MessageCircle}
              label="WhatsApp number"
              value={siteConfig.whatsappNumber ? "Chat on WhatsApp" : null}
              href={siteConfig.whatsappNumber ? `https://wa.me/${siteConfig.whatsappNumber}` : undefined}
            />
            <Placeholder icon={MapPin} label="Address" value={null} />
          </ul>
          <p className="mt-4 text-sm text-white/75">
            Until contact details are published, use the{" "}
            <Link href="/contact" className="text-white underline underline-offset-4">
              inquiry form
            </Link>
            .
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} SUPGS. All rights reserved.</p>
          <ul className="flex gap-6">
            {footerLegal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
