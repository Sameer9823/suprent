"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const getMounted = () => true;
const getMountedServer = () => false;
const noopSubscribe = () => () => {};

export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, getMounted, getMountedServer);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef(pathname);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    if (open && prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      close();
    }
  }, [pathname, open]);

  useEffect(() => {
    prevPathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!mounted || !open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, mounted]);

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

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  key="backdrop"
                  aria-hidden
                  className="fixed inset-0 bg-black/50 z-[90]"
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
                  className="fixed top-0 right-0 z-[100] flex h-[100dvh] w-[85%] max-w-sm flex-col overflow-y-auto bg-[#f8f8f3] p-5 pb-6 shadow-2xl"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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

                  <nav aria-label="Mobile" className="mt-6 flex-1">
                    <ul className="flex flex-col">
                      {navLinks.map((link) => {
                        const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                        return (
                          <li key={link.href} className="border-b border-line">
                            <Link
                              href={link.href}
                              onClick={close}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex items-center justify-between py-4 text-lg font-semibold",
                                active ? "text-forest" : "text-ink hover:text-forest",
                              )}
                            >
                              {link.label}
                              {active && <span aria-hidden className="size-2 shrink-0 rounded-full bg-forest" />}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  <ButtonLink
                    href="/contact"
                    size="lg"
                    className="mt-auto h-12 w-full rounded-md"
                    onClick={close}
                  >
                    Enquire Now
                  </ButtonLink>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
