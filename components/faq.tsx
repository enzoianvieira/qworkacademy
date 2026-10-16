"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "./icons";

export interface QA {
  q: string;
  a: ReactNode;
}

export function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    // On paper each Q&A becomes its own card, so page breaks fall between
    // cards instead of slicing one shared container.
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/40 print:space-y-2.5 print:divide-y-0 print:overflow-visible print:rounded-none print:border-0 print:bg-transparent">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="break-inside-avoid print:rounded-xl print:border print:border-line print:bg-surface/40">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-surface-2/40 print:pb-2"
              aria-expanded={isOpen}
            >
              <span className="text-[1.02rem] font-medium text-fg">{it.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 text-fg-faint print:hidden"
              >
                <ChevronDown />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pt-0 text-[0.96rem] leading-relaxed text-fg-muted">
                    {it.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Paper has no accordion: closed answers still print. */}
            {!isOpen && (
              <div className="hidden px-5 pb-6 pt-0 text-[0.96rem] leading-relaxed text-fg-muted print:block">
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
