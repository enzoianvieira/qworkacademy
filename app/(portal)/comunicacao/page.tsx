import type { Metadata } from "next";
import { PageHero, Section, Callout, CheckList } from "@/components/ui";
import { CopyBlock } from "@/components/copy-block";
import { SUPPORT } from "@/lib/content";

export const metadata: Metadata = { title: "Comunicação ao Funcionário · QWork Academy" };

const MODELO = `Prezado(a),

Você foi convidado(a) a participar da Avaliação de Risco Psicossocial da empresa. Essa avaliação tem como objetivo identificar fatores do ambiente de trabalho que impactam o bem-estar e a saúde mental dos colaboradores.

Suas respostas são confidenciais e analisadas de forma consolidada, sem identificação individual.

Para acessar o questionário, utilize o link abaixo e informe:
• CPF
• Data de nascimento

Link: ${SUPPORT.loginUrl}

Sua participação é muito importante para que possamos construir um ambiente de trabalho cada vez melhor.`;

export default function ComunicacaoPage() {
  return (
    <article>
      <PageHero
        kicker="Recurso"
        audience="Para gestores"
        title="Convide os funcionários com um modelo pronto"
        lead="Texto explicativo para a empresa enviar aos colaboradores antes da avaliação. Copie, ajuste o que quiser e dispare por e-mail ou WhatsApp."
      />

      <Section eyebrow="Use agora" title="Modelo de mensagem">
        <CopyBlock text={MODELO} />
        <div className="mt-6">
          <Callout title="Dica de envio">
            Envie com alguns dias de antecedência e reforce o prazo. Lembre que o acesso
            é simples: apenas <strong className="text-fg">CPF</strong> e{" "}
            <strong className="text-fg">data de nascimento</strong>, sem senha.
          </Callout>
        </div>
      </Section>

      <Section eyebrow="Por que funciona" title="O que esse texto comunica">
        <CheckList
          items={[
            "O propósito da avaliação: melhorar o ambiente de trabalho",
            "A garantia de confidencialidade e análise consolidada",
            "Exatamente o que o funcionário precisa para acessar (CPF + data de nascimento)",
            "O link direto para a página de login",
            "Um convite que valoriza a participação do colaborador",
          ]}
        />
      </Section>

      <Section eyebrow="Boas práticas" title="Antes de enviar">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Personalize", d: "Adicione o nome da empresa e, se quiser, a assinatura do RH." },
            { t: "Defina o prazo", d: "Informe até quando a avaliação ficará disponível." },
            { t: "Reforce o sigilo", d: "Colaboradores respondem com mais sinceridade quando confiam no anonimato." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-line bg-surface/40 p-5">
              <h4 className="text-[0.95rem] font-semibold text-fg">{c.t}</h4>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-fg-muted">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </article>
  );
}
