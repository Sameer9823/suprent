"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Native <dialog> wrapper: focus trap, Escape to close and focus return come from the browser. */
export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn("m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] overflow-y-auto rounded-lg bg-white p-0 text-body shadow-2xl", wide ? "max-w-3xl" : "max-w-lg")}
    >
      <div className="p-5 sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-ink hover:bg-sage/50">
            <X aria-hidden className="size-4" />
          </button>
        </div>
        {open && children}
      </div>
    </dialog>
  );
}
