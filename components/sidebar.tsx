"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV, NAV_GROUPS } from "@/lib/content";
import { Logo } from "./logo";
import { Icon, Logout, Menu, Close } from "./icons";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="flex h-full flex-col">
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2 px-2 text-[1.35rem]">
        <Logo />
        <span className="ml-1 mt-0.5 hidden text-[0.62rem] font-medium uppercase tracking-[0.22em] text-fg-faint sm:inline">
          Academy
        </span>
      </Link>

      <nav className="mt-9 flex-1 space-y-7 overflow-y-auto pr-1">
        {NAV_GROUPS.map((group) => {
          const items = NAV.filter((n) => n.group === group.id);
          if (!items.length) return null;
          return (
            <div key={group.id}>
              <p className="px-3 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-fg-faint">
                {group.label}
              </p>
              <ul className="mt-2 space-y-0.5">
                {items.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.slug}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.92rem] transition-colors ${
                          active
                            ? "bg-surface text-fg"
                            : "text-fg-muted hover:bg-surface/60 hover:text-fg"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute left-0 top-1/2 h-5 w-[2.5px] -translate-y-1/2 rounded-full bg-lime"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                        <Icon
                          name={item.icon}
                          width={18}
                          height={18}
                          className={active ? "text-lime" : "text-fg-faint group-hover:text-fg-muted"}
                        />
                        {item.short}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="mt-6 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.92rem] text-fg-faint transition-colors hover:bg-surface/60 hover:text-fg"
      >
        <Logout width={18} height={18} />
        Sair
      </button>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[268px] flex-col border-r border-line bg-ink-2/70 px-5 py-7 backdrop-blur-xl lg:flex print:!hidden">
        <NavList />
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-line bg-ink-2/80 px-4 py-3 backdrop-blur-xl lg:hidden print:hidden">
        <Link href="/" className="text-[1.2rem]">
          <Logo />
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg border border-line p-2 text-fg-muted"
          aria-label="Abrir menu"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-line bg-ink-2 px-5 py-7 lg:hidden"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-5 rounded-lg p-1.5 text-fg-muted"
                aria-label="Fechar menu"
              >
                <Close />
              </button>
              <NavList onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
