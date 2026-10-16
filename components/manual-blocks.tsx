import { Fragment } from "react";
import { Steps, Callout, CheckList, DefGrid, Pill } from "./ui";
import { FAQ } from "./faq";
import type { Block, Rich } from "@/lib/manual-funcionario";

/* Web renderer for manual content. Its PDF twin lives in lib/pdf. */

export function RichText({ text }: { text: Rich }) {
  if (typeof text === "string") return text;
  return text.map((node, i) => {
    if (typeof node === "string") return <Fragment key={i}>{node}</Fragment>;
    if ("b" in node) return <strong key={i} className="text-fg">{node.b}</strong>;
    const pill = <Pill>{node.code}</Pill>;
    return node.href ? (
      <a key={i} href={node.href} target="_blank" rel="noopener noreferrer">
        {pill}
      </a>
    ) : (
      <Fragment key={i}>{pill}</Fragment>
    );
  });
}

export function ManualBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[1.02rem] leading-relaxed text-fg-muted">
          <RichText text={block.text} />
        </p>
      );
    case "callout":
      return (
        <Callout variant={block.variant} title={block.title}>
          <RichText text={block.text} />
        </Callout>
      );
    case "steps":
      return (
        <Steps
          items={block.items.map((s) => ({
            title: s.title,
            body: s.body && <RichText text={s.body} />,
          }))}
        />
      );
    case "checklist":
      return <CheckList items={block.items.map((t, i) => <RichText key={i} text={t} />)} />;
    case "definitions":
      return <DefGrid rows={block.rows.map((r) => ({ term: r.term, def: <RichText text={r.def} /> }))} />;
    case "groups":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {block.items.map((g) => (
            <div key={g.g} className="break-inside-avoid rounded-xl border border-line bg-surface/40 p-4">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[0.78rem] font-semibold text-lime">{g.g}</span>
                <h4 className="text-[0.94rem] font-medium text-fg">{g.nome}</h4>
              </div>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-fg-faint">{g.desc}</p>
            </div>
          ))}
        </div>
      );
    case "faq":
      return <FAQ items={block.items.map((f) => ({ q: f.q, a: <RichText text={f.a} /> }))} />;
    case "tips":
      return (
        <div className="grid gap-4 sm:grid-cols-3">
          {block.columns.map((c) => (
            <div key={c.title} className="break-inside-avoid rounded-2xl border border-line bg-surface/40 p-5">
              <h4 className="text-[0.92rem] font-semibold text-fg">{c.title}</h4>
              <ul className="mt-3 space-y-2 text-[0.88rem] text-fg-muted">
                {c.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-lime">·</span>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
  }
}
