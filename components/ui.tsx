import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { Check } from "./icons";

/* ---------- Page hero ---------- */
export function PageHero({
  kicker,
  title,
  lead,
  audience,
}: {
  kicker: string;
  title: string;
  lead: string;
  audience?: string;
}) {
  return (
    <header className="relative border-b border-line pb-12 pt-2">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="kicker">{kicker}</span>
          {audience && (
            <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[0.7rem] font-medium text-fg-muted">
              {audience}
            </span>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.025em] text-fg sm:text-5xl">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
          {lead}
        </p>
      </Reveal>
    </header>
  );
}

/* ---------- Section ---------- */
export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-line py-14 last:border-b-0">
      <Reveal>
        {eyebrow && <span className="kicker">{eyebrow}</span>}
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-7">{children}</div>
    </section>
  );
}

/* ---------- Card ---------- */
export function Card({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface/60 p-6 ${
        hover ? "card-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Numbered steps ---------- */
export function Steps({ items }: { items: { title: string; body?: ReactNode }[] }) {
  return (
    <ol className="relative ml-3 space-y-7 border-l border-line pl-8">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[2.45rem] flex h-7 w-7 items-center justify-center rounded-full border border-line-strong bg-surface-2 text-[0.78rem] font-semibold text-lime">
            {i + 1}
          </span>
          <h4 className="text-[1.02rem] font-medium text-fg">{it.title}</h4>
          {it.body && <div className="mt-1.5 text-[0.96rem] leading-relaxed text-fg-muted">{it.body}</div>}
        </li>
      ))}
    </ol>
  );
}

/* ---------- Bulleted feature list ---------- */
export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[0.97rem] leading-relaxed text-fg-muted">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Callout ---------- */
const calloutStyles = {
  info: { bar: "var(--color-lime)", label: "Importante" },
  tip: { bar: "var(--color-risk-good)", label: "Dica" },
  warning: { bar: "var(--color-risk-alert)", label: "Atenção" },
} as const;

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const s = calloutStyles[variant];
  return (
    <div
      className="rounded-xl border border-line bg-surface/50 p-5 pl-6"
      style={{ borderLeft: `2px solid ${s.bar}` }}
    >
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em]" style={{ color: s.bar }}>
        {title ?? s.label}
      </p>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{children}</div>
    </div>
  );
}

/* ---------- Definition grid (e.g. status tables) ---------- */
export function DefGrid({ rows }: { rows: { term: string; def: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/40">
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[180px_1fr] sm:gap-6 sm:p-5">
          <dt className="font-medium text-fg">{r.term}</dt>
          <dd className="text-[0.95rem] leading-relaxed text-fg-muted">{r.def}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Risk badge ---------- */
export function RiskBadge({ level }: { level: "good" | "watch" | "alert" }) {
  const map = {
    good: { c: "var(--color-risk-good)", t: "Excelente" },
    watch: { c: "var(--color-risk-watch)", t: "Monitorar" },
    alert: { c: "var(--color-risk-alert)", t: "Atenção" },
  }[level];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-medium"
      style={{ color: map.c, background: `color-mix(in srgb, ${map.c} 14%, transparent)` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: map.c }} />
      {map.t}
    </span>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-line bg-ink-2 px-1.5 py-0.5 font-mono text-[0.85em] text-lime">
      {children}
    </code>
  );
}
