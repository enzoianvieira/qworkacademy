import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section, Callout } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/reveal";
import { Download } from "@/components/icons";
import { MARKETING_ASSETS, type MarketingAsset } from "@/lib/marketing";

export const metadata: Metadata = { title: "Kit de Marketing · QWork Academy" };

export default function MarketingPage() {
  return (
    <article>
      <PageHero
        kicker="Recurso"
        audience="Para comercial e parceiros"
        title="Kit de Marketing QWork"
        lead="Os materiais oficiais para apresentar a QWork a empresas e parceiros, e para levar o colaborador até a avaliação. Baixe, apresente e envie."
      />

      <Section eyebrow={`${MARKETING_ASSETS.length} materiais`} title="Apresentações e campanha">
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {MARKETING_ASSETS.map((asset, i) => (
            <StaggerItem key={asset.slug} className="h-full">
              <AssetCard asset={asset} priority={i < 2} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section eyebrow="Como usar" title="Antes de enviar">
        <Callout variant="tip" title="Arquivos editáveis">
          Todos os materiais são <strong className="text-fg">.pptx</strong> e abrem no
          PowerPoint, Keynote ou Google Slides. Para mandar a um cliente, prefira
          exportar como <strong className="text-fg">PDF</strong> (Arquivo → Exportar):
          o layout fica preservado em qualquer aparelho.
        </Callout>
      </Section>
    </article>
  );
}

function AssetCard({ asset, priority }: { asset: MarketingAsset; priority: boolean }) {
  const unit = asset.pages === 1 ? "página" : "slides";

  return (
    <div className="group card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/50">
      {/* Stage: real first slide, framed on a uniform canvas so mixed
          aspect ratios (16:9, vertical, A4) sit as one consistent gallery. */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-ink-2">
        <div
          aria-hidden
          className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 100%, color-mix(in srgb, var(--color-lime) 14%, transparent), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-7">
          <Image
            src={asset.cover}
            alt={`Capa: ${asset.title}`}
            placeholder="blur"
            priority={priority}
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
            className="h-auto max-h-full w-auto max-w-full rounded-md shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)] ring-1 ring-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.015]"
          />
        </div>
        <span className="absolute left-3.5 top-3.5 rounded-full border border-line-strong bg-ink/70 px-2.5 py-1 text-[0.68rem] font-medium text-fg-muted backdrop-blur-md">
          {asset.format}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="kicker">{asset.audience}</span>
        <h3 className="mt-2.5 text-[1.12rem] font-semibold tracking-[-0.01em] text-fg">
          {asset.title}
        </h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-fg-muted">{asset.description}</p>
        <p className="mt-4 text-[0.84rem] leading-relaxed text-fg-faint">
          <span className="font-medium text-fg-muted">Quando usar: </span>
          {asset.useWhen}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-[0.78rem] tabular-nums text-fg-faint">
            {asset.pages} {unit} · {asset.size} · PPTX
          </span>
          <a
            href={asset.href}
            download={asset.downloadName}
            aria-label={`Baixar ${asset.title} (PPTX, ${asset.size})`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-line-strong bg-surface-2 px-3.5 py-2 text-[0.84rem] font-medium text-fg transition-colors hover:border-lime/60 hover:text-lime"
          >
            <Download className="h-4 w-4" />
            Baixar
          </a>
        </div>
      </div>
    </div>
  );
}
