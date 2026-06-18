import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Pill } from "@/components/ui";
import { FAQ } from "@/components/faq";
import { Mail, Lifebuoy } from "@/components/icons";
import { SUPPORT } from "@/lib/content";

export const metadata: Metadata = { title: "Suporte & Dúvidas · QWork Academy" };

export default function SuportePage() {
  return (
    <article>
      <PageHero
        kicker="Ajuda"
        title="Travou? Volte aqui sempre que precisar"
        lead="Canais de atendimento da QWork e as respostas para as dúvidas mais comuns, reunidas em um só lugar."
      />

      <Section eyebrow="Fale com a gente" title="Canais de atendimento">
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${SUPPORT.email}`}
            className="card-hover flex items-start gap-4 rounded-2xl border border-line bg-surface/50 p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-2 text-lime">
              <Mail />
            </span>
            <div>
              <h3 className="text-[1.02rem] font-medium text-fg">E-mail</h3>
              <p className="mt-1 text-[0.95rem] text-fg-muted">{SUPPORT.email}</p>
            </div>
          </a>
          <a
            href={SUPPORT.phoneHref}
            className="card-hover flex items-start gap-4 rounded-2xl border border-line bg-surface/50 p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-2 text-lime">
              <Lifebuoy />
            </span>
            <div>
              <h3 className="text-[1.02rem] font-medium text-fg">Telefone</h3>
              <p className="mt-1 text-[0.95rem] text-fg-muted">{SUPPORT.phone}</p>
              <p className="mt-0.5 text-[0.82rem] text-fg-faint">{SUPPORT.hours}</p>
            </div>
          </a>
        </div>
      </Section>

      <Section eyebrow="Agilize o atendimento" title="Tenha em mãos">
        <div className="grid gap-3 sm:grid-cols-3">
          {["Seu CPF", "Nome da empresa (ou cliente, se aplicável)", "ID do ciclo, se aplicável"].map((i) => (
            <div key={i} className="rounded-xl border border-line bg-surface/40 px-5 py-4 text-[0.92rem] text-fg-muted">
              {i}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Perguntas frequentes" title="Dúvidas do funcionário">
        <FAQ
          items={[
            { q: "Não consigo fazer login. O que fazer?", a: <>Verifique: CPF só com números; data de nascimento no formato <Pill>ddmmaaaa</Pill>; e se a avaliação já foi liberada pelo RH. Persistindo, fale com o RH da sua empresa.</> },
            { q: "Posso pausar e continuar depois?", a: "Sim. Cada resposta é salva automaticamente. Saia quando quiser e continue de onde parou." },
            { q: "Minhas respostas são confidenciais?", a: "Sim. São anônimas e analisadas de forma consolidada. A empresa só vê o relatório do grupo, nunca respostas individuais." },
            { q: "Quanto tempo leva?", a: "De 15 a 20 minutos, no seu ritmo." },
          ]}
        />
      </Section>

      <Section eyebrow="Perguntas frequentes" title="Dúvidas do gestor">
        <FAQ
          items={[
            { q: "Como os funcionários acessam o sistema?", a: <>Com CPF (só números) e data de nascimento (<Pill>ddmmaaaa</Pill>). Sem senha.</> },
            { q: "Posso adicionar funcionários a um ciclo existente?", a: "Não. Crie um novo ciclo. Os adicionados depois aparecem na Aba Pendências." },
            { q: "Qual a diferença entre Inativar e Reset?", a: "Inativar tira o funcionário do ciclo; Reset apaga as respostas e ele recomeça. Ambas são irreversíveis." },
            { q: "Quanto tempo leva para emitir o laudo?", a: "Após a confirmação do pagamento, o Emissor processa e disponibiliza. Você é notificado quando estiver pronto." },
            { q: "O laudo tem validade legal?", a: "Sim. Atende à NR-1/GRO e o hash SHA-256 garante a integridade para auditoria e fiscalização." },
          ]}
        />
      </Section>

      <Section eyebrow="Continue aprendendo" title="Volte aos manuais">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/funcionario" className="card-hover rounded-2xl border border-line bg-surface/50 p-5 text-fg-muted hover:text-fg">
            <span className="text-[0.78rem] uppercase tracking-wider text-fg-faint">Manual</span>
            <p className="mt-1 text-[1.02rem] font-medium text-fg">Funcionário</p>
            <p className="mt-1 text-[0.9rem]">Login, avaliação e comprovante.</p>
          </Link>
          <Link href="/gestor" className="card-hover rounded-2xl border border-line bg-surface/50 p-5 text-fg-muted hover:text-fg">
            <span className="text-[0.78rem] uppercase tracking-wider text-fg-faint">Manual</span>
            <p className="mt-1 text-[1.02rem] font-medium text-fg">Gestor</p>
            <p className="mt-1 text-[0.9rem]">Ciclos, pendências e laudos.</p>
          </Link>
        </div>
      </Section>
    </article>
  );
}
