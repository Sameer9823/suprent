"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  // Lock page scroll and move focus into the menu while it is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="lg:hidden" onKeyDown={open ? onKeyDown : undefined}>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-10 place-items-center rounded-md border border-line bg-white text-ink transition-colors hover:bg-sage/50"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              aria-hidden
              className="fixed inset-0 top-0 z-40 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(86vw,360px)] flex-col bg-canvas p-5 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-md border border-line bg-white text-ink"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-8">
                <ul className="flex flex-col">
                  {navLinks.map((link) => {
                    const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                    return (
                      <li key={link.href} className="border-b border-line">
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between py-4 text-lg font-semibold",
                            active ? "text-forest" : "text-ink",
                          )}
                        >
                          {link.label}
                          {active && <span aria-hidden className="size-2 rounded-full bg-forest" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <ButtonLink href="/contact" size="lg" className="mt-8 w-full" onClick={() => setOpen(false)}>
                Enquire Now
              </ButtonLink>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
