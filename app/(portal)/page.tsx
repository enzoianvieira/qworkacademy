import Link from "next/link";
import { NAV, ROADMAP, GRUPOS, SUPPORT } from "@/lib/content";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { Icon, ArrowRight, Video } from "@/components/icons";

export default function Home() {
  const docs = NAV.filter((n) => n.group !== "start");

  return (
    <div className="space-y-24">
      {/* ---------- Hero ---------- */}
      <section className="relative pt-4">
        <Reveal>
          <span className="kicker">Central de ajuda & treinamento</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-3xl text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-[3.5rem]">
            Domine a QWork e mapeie os riscos da{" "}
            <span className="text-lime">NR-1</span> com confiança.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            A QWork é a plataforma de avaliação psicossocial baseada no COPSOQ III.
            Aqui você encontra o caminho completo, do cadastro de funcionários à
            emissão do laudo, explicado em linguagem simples.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/funcionario"
              className="group inline-flex items-center gap-2 rounded-xl bg-lime px-5 py-3 text-[0.95rem] font-semibold text-[#0a0b0c] transition-colors hover:bg-[var(--color-lime-bright)]"
            >
              Começar o roteiro
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/gestor#video"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/50 px-5 py-3 text-[0.95rem] font-medium text-fg-muted transition-colors hover:text-fg"
            >
              <Video className="h-4 w-4 text-lime" />
              Tours em vídeo
            </Link>
            <Link
              href="/suporte"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/50 px-5 py-3 text-[0.95rem] font-medium text-fg-muted transition-colors hover:text-fg"
            >
              Tenho uma dúvida
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {[
              { k: "37", v: "questões" },
              { k: "10", v: "grupos temáticos" },
              { k: "15–20", v: "minutos" },
              { k: "100%", v: "confidencial" },
            ].map((s) => (
              <div key={s.v} className="bg-ink-2 px-5 py-6">
                <dt className="text-2xl font-semibold tracking-tight text-fg">{s.k}</dt>
                <dd className="mt-1 text-[0.82rem] text-fg-faint">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ---------- Roadmap ---------- */}
      <section id="roteiro">
        <Reveal>
          <span className="kicker">O roteiro</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">
            Seu caminho na plataforma, em 6 passos
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted">
            Siga na ordem ou pule direto para o que precisa. Cada passo leva ao
            manual correspondente.
          </p>
        </Reveal>

        <Stagger className="mt-10 space-y-3">
          {ROADMAP.map((step) => (
            <StaggerItem key={step.n}>
              <Link
                href={step.href}
                className="group card-hover relative flex items-start gap-5 rounded-2xl border border-line bg-surface/50 p-5 sm:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-ink-2 font-mono text-[0.95rem] font-semibold text-lime">
                  {String(step.n).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-[1.08rem] font-medium text-fg">{step.title}</h3>
                    <span className="rounded-full border border-line px-2 py-0.5 text-[0.68rem] font-medium text-fg-faint">
                      {step.audience}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-fg-muted">
                    {step.blurb}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-lime">
                    {step.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ---------- Document hub ---------- */}
      <section id="documentos">
        <Reveal>
          <span className="kicker">Biblioteca</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">
            Cada documento, uma página
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted">
            Toda a documentação da QWork, reorganizada para consulta rápida.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
          {docs.map((doc) => (
            <StaggerItem key={doc.slug}>
              <Link
                href={doc.href}
                className="group card-hover flex h-full flex-col rounded-2xl border border-line bg-surface/50 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-2 text-lime">
                  <Icon name={doc.icon} />
                </span>
                <h3 className="mt-5 text-[1.1rem] font-medium text-fg">{doc.title}</h3>
                <p className="mt-2 flex-1 text-[0.93rem] leading-relaxed text-fg-muted">
                  {doc.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-fg-faint transition-colors group-hover:text-lime">
                  Abrir
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ---------- COPSOQ groups ---------- */}
      <section id="grupos">
        <Reveal>
          <span className="kicker">O que é medido</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">
            Os 10 grupos temáticos
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted">
            As 37 questões se distribuem em dez dimensões do ambiente de trabalho,
            cada uma classificada como Excelente, Monitorar ou Atenção no laudo.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
          {GRUPOS.map((grp) => (
            <StaggerItem key={grp.g}>
              <div className="flex gap-4 rounded-xl border border-line bg-surface/40 p-5">
                <span className="font-mono text-[0.8rem] font-semibold text-lime">{grp.g}</span>
                <div>
                  <h4 className="text-[0.97rem] font-medium text-fg">{grp.nome}</h4>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-fg-faint">{grp.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ---------- Support CTA ---------- */}
      <section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-8 sm:p-12">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-[90px]"
              style={{ background: "var(--color-lime)" }}
            />
            <span className="kicker">Travou em algo?</span>
            <h2 className="mt-3 max-w-xl text-balance text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">
              Volte aqui sempre que tiver uma dúvida.
            </h2>
            <p className="mt-3 max-w-xl text-fg-muted">
              Reunimos as perguntas mais comuns e os canais de atendimento da QWork
              em um só lugar.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/suporte"
                className="inline-flex items-center gap-2 rounded-xl bg-lime px-5 py-3 text-[0.95rem] font-semibold text-[#0a0b0c] transition-colors hover:bg-[var(--color-lime-bright)]"
              >
                Ir para o suporte
              </Link>
              <a
                href={SUPPORT.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/50 px-5 py-3 text-[0.95rem] font-medium text-fg-muted transition-colors hover:text-fg"
              >
                {SUPPORT.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
