"use client";

import { useState } from "react";
import { Copy, Check } from "./icons";

export function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2/60">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-fg-faint">
          Modelo de mensagem
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[0.82rem] font-medium text-fg-muted transition-colors hover:text-fg"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-lime" /> Copiado
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copiar
            </>
          )}
        </button>
      </div>
      <pre className="whitespace-pre-wrap px-5 py-5 font-sans text-[0.96rem] leading-relaxed text-fg-muted">
        {text}
      </pre>
    </div>
  );
}
