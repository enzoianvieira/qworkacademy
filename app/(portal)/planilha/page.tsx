import type { Metadata } from "next";
import { PageHero, Section, Steps, Callout, DefGrid, Pill } from "@/components/ui";
import { Download } from "@/components/icons";

export const metadata: Metadata = { title: "Planilha de Funcionários · QWork Academy" };

export default function PlanilhaPage() {
  return (
    <article>
      <PageHero
        kicker="Recurso"
        audience="Para gestores"
        title="Importe sua base de funcionários via planilha"
        lead="A forma mais rápida de cadastrar colaboradores na QWork. Baixe o modelo, preencha e importe em poucos cliques."
      />

      <Section eyebrow="Comece por aqui" title="Baixe o modelo XLSX">
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-line bg-surface/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[1.05rem] font-medium text-fg">
              Modelo de planilha de funcionários
            </h3>
            <p className="mt-1 text-[0.9rem] text-fg-muted">
              Arquivo de exemplo já com as colunas e valores corretos.
            </p>
          </div>
          <a
            href="/modelo-planilha-funcionarios.xlsx"
            download
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-lime px-5 py-3 text-[0.92rem] font-semibold text-[#0a0b0c] transition-colors hover:bg-[var(--color-lime-bright)]"
          >
            <Download className="h-4 w-4" />
            Baixar modelo
          </a>
        </div>
      </Section>

      <Section eyebrow="Estrutura" title="As colunas da planilha">
        <DefGrid
          rows={[
            { term: "cpf", def: "Apenas números, sem pontos ou traços." },
            { term: "nome", def: "Nome completo do colaborador." },
            { term: "setor", def: "Ex.: Produção, RH, Administrativo, Vendas." },
            { term: "funcao", def: "Cargo do funcionário. Ex.: Operador, Gerente." },
            { term: "nivel_cargo", def: <>Aceita apenas <Pill>operacional</Pill> ou <Pill>gestao</Pill>.</> },
          ]}
        />
        <div className="mt-6">
          <Callout variant="warning" title="O campo nivel_cargo é decisivo">
            Ele determina <strong className="text-fg">o nível das perguntas</strong> que o
            funcionário responde. Use exatamente <Pill>operacional</Pill> ou{" "}
            <Pill>gestao</Pill>. Qualquer outro valor causa erro na importação.
          </Callout>
        </div>
      </Section>

      <Section id="niveis" eyebrow="Entenda a diferença" title="Operacional × Gestão">
        <p className="mb-7 max-w-2xl text-[1.02rem] leading-relaxed text-fg-muted">
          Os dois níveis respondem <strong className="text-fg">exatamente as mesmas
          perguntas</strong> e os mesmos 10 grupos temáticos. O que muda é o{" "}
          <strong className="text-fg">nível de elaboração</strong> de cada questão,
          ajustado ao tipo de cargo.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface/40 p-6">
            <div className="flex items-center gap-2">
              <Pill>operacional</Pill>
              <span className="text-[0.8rem] text-fg-faint">nível mais simples</span>
            </div>
            <h4 className="mt-4 text-[1.05rem] font-medium text-fg">Cargos operacionais</h4>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-muted">
              Perguntas em versão <strong className="text-fg">mais fácil e direta</strong>,
              com linguagem simples e objetiva. Ideal para a operação e a linha de frente.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface/40 p-6">
            <div className="flex items-center gap-2">
              <Pill>gestao</Pill>
              <span className="text-[0.8rem] text-fg-faint">nível mais elaborado</span>
            </div>
            <h4 className="mt-4 text-[1.05rem] font-medium text-fg">Cargos de gestão</h4>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-muted">
              Mesmas perguntas em formulação <strong className="text-fg">mais elaborada</strong>,
              compatível com responsabilidades de liderança e decisão.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Callout>
            Resumo: <strong className="text-fg">mesmas perguntas, mesmos grupos</strong>.
            Só muda o nível. Gestão = mais elaborado. Operacional = mais fácil.
          </Callout>
        </div>
      </Section>

      <Section eyebrow="Exemplo" title="Como o preenchimento se parece">
        <div className="overflow-x-auto rounded-2xl border border-line bg-ink-2/60">
          <table className="w-full text-left text-[0.86rem]">
            <thead>
              <tr className="border-b border-line text-fg-faint">
                {["cpf", "nome", "setor", "funcao", "nivel_cargo"].map((h) => (
                  <th key={h} className="px-4 py-3 font-mono font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-fg-muted">
              <tr className="border-b border-line">
                <td className="px-4 py-3 font-mono">12345678901</td>
                <td className="px-4 py-3">João Silva</td>
                <td className="px-4 py-3">Produção</td>
                <td className="px-4 py-3">Operador</td>
                <td className="px-4 py-3 font-mono text-lime">operacional</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">98765432109</td>
                <td className="px-4 py-3">Maria Santos</td>
                <td className="px-4 py-3">RH</td>
                <td className="px-4 py-3">Gerente</td>
                <td className="px-4 py-3 font-mono text-lime">gestao</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Passo a passo" title="Como importar no sistema">
        <Steps
          items={[
            { title: 'Clique em "Importar Funcionários"', body: "🏥 Clínica: dentro do dashboard da empresa cliente. 🏢 Entidade: em “Funcionários Ativos” no menu lateral." },
            { title: "Baixe o template e preencha", body: "Use o modelo desta página como referência." },
            { title: "Selecione o arquivo preenchido", body: "Confira CPF, nível de cargo e dados de cada linha." },
            { title: 'Clique em "Importar"', body: "Os funcionários aparecem na lista, prontos para serem incluídos em um ciclo." },
          ]}
        />
        <div className="mt-6">
          <Callout title="Depois de importar">
            Você pode filtrar por setor, função ou nível, ver o status de cada avaliação
            e inativar quem não deve mais participar.
          </Callout>
        </div>
      </Section>
    </article>
  );
}
