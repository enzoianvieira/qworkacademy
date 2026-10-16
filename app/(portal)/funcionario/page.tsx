import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { Logo } from "@/components/logo";
import { FileDown } from "@/components/icons";
import { ManualBlock, RichText } from "@/components/manual-blocks";
import { MANUAL_FUNCIONARIO as M } from "@/lib/manual-funcionario";

export const metadata: Metadata = { title: "Manual do Funcionário · QWork Academy" };

export default function FuncionarioPage() {
  return (
    <article>
      {/* Paper-only letterhead (Ctrl+P). The downloadable PDF is built separately. */}
      <div className="mb-10 hidden items-center justify-between border-b border-line pb-5 print:flex">
        <span className="text-[17pt]">
          <Logo />
        </span>
        <span className="kicker">Guia do colaborador</span>
      </div>

      <PageHero
        {...M.hero}
        actions={
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={M.pdf.href}
              download={M.pdf.fileName}
              className="inline-flex items-center gap-2 rounded-xl bg-lime px-5 py-3 text-[0.92rem] font-semibold text-[#0a0b0c] transition-colors hover:bg-[var(--color-lime-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
            >
              <FileDown className="h-4 w-4" />
              Baixar PDF
            </a>
            <p className="text-[0.82rem] text-fg-faint">
              Pronto para enviar ao colaborador por e-mail ou WhatsApp.
            </p>
          </div>
        }
      />

      {/* Paper-only quick reference: what the employee needs before anything else. */}
      <aside className="mt-8 hidden break-inside-avoid rounded-2xl border border-line bg-surface/50 p-6 print:block">
        <p className="kicker">Acesso rápido</p>
        <dl className="mt-4 grid grid-cols-[150px_1fr] gap-x-6 gap-y-2.5 text-[0.95rem]">
          {M.quickAccess.map((row) => (
            <div key={row.term} className="contents">
              <dt className="font-medium text-fg">{row.term}</dt>
              <dd className="text-fg-muted">
                <RichText text={row.def} />
              </dd>
            </div>
          ))}
        </dl>
      </aside>

      {M.sections.map((s) => (
        <Section key={s.id} id={s.id} eyebrow={s.eyebrow} title={s.title}>
          <div className="space-y-7">
            {s.blocks.map((b, i) => (
              <ManualBlock key={i} block={b} />
            ))}
          </div>
        </Section>
      ))}
    </article>
  );
}
