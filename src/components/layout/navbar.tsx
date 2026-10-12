"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const getScrolled = () => window.scrollY > 8;
const getScrolledServer = () => false;

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getScrolledServer);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-canvas/95 backdrop-blur-sm transition-shadow duration-300",
        scrolled ? "border-line shadow-[0_6px_20px_-14px_rgb(23_33_27/0.35)]" : "border-line",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[72px]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
                      active ? "text-forest" : "text-body hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-x-3.5 -bottom-[13px] h-0.5 bg-forest"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex" arrow>
            Enquire Now
          </ButtonLink>
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
