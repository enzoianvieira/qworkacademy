import type { Metadata } from "next";
import { PageHero, Section, Steps, Callout, CheckList, DefGrid, Pill } from "@/components/ui";
import { GRUPOS, SUPPORT } from "@/lib/content";
import { FAQ } from "@/components/faq";
import { Logo } from "@/components/logo";
import { ExportPdfButton } from "@/components/export-pdf-button";

export const metadata: Metadata = { title: "Manual do Funcionário · QWork Academy" };

const loginLink = (
  <a href={SUPPORT.loginUrl} target="_blank" rel="noopener noreferrer">
    <Pill>{SUPPORT.loginUrl}</Pill>
  </a>
);

export default function FuncionarioPage() {
  return (
    <article>
      {/* Paper-only letterhead for the exported PDF. */}
      <div className="mb-10 hidden items-center justify-between border-b border-line pb-5 print:flex">
        <span className="text-[17pt]">
          <Logo />
        </span>
        <span className="kicker">Guia do colaborador</span>
      </div>

      <PageHero
        kicker="Manual do Funcionário"
        audience="Para colaboradores"
        title="Responda sua avaliação psicossocial sem complicação"
        lead="Um guia direto para acessar o sistema, responder as 37 questões e acompanhar seu comprovante. Leva de 15 a 20 minutos."
        actions={<ExportPdfButton fileName="Manual do Funcionário - QWork" />}
      />

      {/* Paper-only quick reference: what the employee needs before anything else. */}
      <aside className="mt-8 hidden break-inside-avoid rounded-2xl border border-line bg-surface/50 p-6 print:block">
        <p className="kicker">Acesso rápido</p>
        <dl className="mt-4 grid grid-cols-[150px_1fr] gap-x-6 gap-y-2.5 text-[0.95rem]">
          <dt className="font-medium text-fg">Link</dt>
          <dd className="text-fg-muted">{loginLink}</dd>
          <dt className="font-medium text-fg">Login</dt>
          <dd className="text-fg-muted">Seu CPF, apenas números</dd>
          <dt className="font-medium text-fg">Data de nascimento</dt>
          <dd className="text-fg-muted">
            Formato <Pill>ddmmaaaa</Pill>, ex.: <Pill>15031990</Pill>
          </dd>
          <dt className="font-medium text-fg">Senha</dt>
          <dd className="text-fg-muted">Deixe em branco</dd>
          <dt className="font-medium text-fg">Tempo</dt>
          <dd className="text-fg-muted">15 a 20 minutos, salvamento automático</dd>
        </dl>
      </aside>

      <Section id="sobre" eyebrow="Contexto" title="O que é a avaliação psicossocial">
        <p className="text-[1.02rem] leading-relaxed text-fg-muted">
          É um instrumento baseado no <strong className="text-fg">COPSOQ III</strong>{" "}
          (Copenhagen Psychosocial Questionnaire), questionário validado
          internacionalmente, usado para mapear riscos psicossociais no ambiente de
          trabalho. O objetivo é identificar fatores que podem afetar a saúde mental
          e o bem-estar, para que a empresa desenvolva ações de melhoria.
        </p>
        <div className="mt-6">
          <Callout variant="tip" title="100% confidencial">
            Suas respostas são <strong className="text-fg">anônimas</strong>. A empresa
            recebe apenas um relatório consolidado do grupo, nunca respostas
            individuais.
          </Callout>
        </div>
      </Section>

      <Section id="acesso" eyebrow="Passo a passo" title="Primeiro acesso e login">
        <Steps
          items={[
            { title: "Acesse a página de login", body: <>Use o link enviado pelo RH: {loginLink}</> },
            { title: "Digite seu CPF", body: "Apenas números, sem pontos ou traços." },
            { title: "Digite sua data de nascimento", body: <>No formato <Pill>ddmmaaaa</Pill>. Ex.: 15 de março de 1990 → <Pill>15031990</Pill>.</> },
            { title: "Deixe o campo Senha em branco", body: "Funcionários não usam senha." },
            { title: 'Clique em "Entrar"', body: "Você cairá na tela de confirmação de identidade." },
          ]}
        />
        <div className="mt-6">
          <Callout title="Funcionário não precisa de senha">
            O acesso é feito apenas com <strong className="text-fg">CPF + data de
            nascimento</strong>. Se algum dado na confirmação estiver errado, clique em
            “Cancelar” e fale com o RH.
          </Callout>
        </div>
      </Section>

      <Section id="dashboard" eyebrow="Sua tela inicial" title="O Dashboard">
        <p className="mb-6 text-[1.02rem] leading-relaxed text-fg-muted">
          Após confirmar a identidade, você verá:
        </p>
        <CheckList
          items={[
            <><strong className="text-fg">Avaliações disponíveis</strong>: ID da avaliação, ID do lote, data de liberação e o botão “Iniciar” ou “Continuar”.</>,
            <><strong className="text-fg">Histórico</strong>: avaliações já concluídas, com data e botão “Ver Comprovante”.</>,
            <><strong className="text-fg">Botão Sair</strong>: no canto superior direito, encerra a sessão com segurança.</>,
          ]}
        />
      </Section>

      <Section id="avaliacao" eyebrow="Respondendo" title="Realizando a avaliação">
        <DefGrid
          rows={[
            { term: "Estrutura", def: "37 questões, divididas em 10 grupos temáticos (G1 a G10)." },
            { term: "Tempo", def: "15 a 20 minutos, no seu ritmo." },
            { term: "Navegação", def: "Barra de progresso (ex.: 15 de 37) e indicação do grupo atual." },
            { term: "Salvamento", def: "Automático a cada resposta. Pode sair e continuar de onde parou, nada se perde." },
          ]}
        />
        <div className="mt-8">
          <Steps
            items={[
              { title: 'Clique em "Iniciar Avaliação"', body: "Você é levado para a tela de questões." },
              { title: "Leia e responda cada questão", body: "Selecione o valor que melhor representa sua opinião. A próxima aparece automaticamente." },
              { title: "Complete as 37 questões", body: "Ao responder a última, um modal de processamento confirma a conclusão." },
              { title: "Veja o comprovante", body: 'Mensagem de parabéns, ID, data e hora. A avaliação aparece no histórico como "Concluída".' },
            ]}
          />
        </div>
        <div className="mt-6">
          <Callout variant="tip">
            Não pense demais em cada questão. A primeira resposta que vem à mente
            costuma ser a mais sincera. Não há respostas certas ou erradas.
          </Callout>
        </div>
      </Section>

      <Section id="grupos" eyebrow="Referência" title="O que significam os grupos G1–G10">
        <div className="grid gap-3 sm:grid-cols-2">
          {GRUPOS.map((g) => (
            <div key={g.g} className="break-inside-avoid rounded-xl border border-line bg-surface/40 p-4">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[0.78rem] font-semibold text-lime">{g.g}</span>
                <h4 className="text-[0.94rem] font-medium text-fg">{g.nome}</h4>
              </div>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-fg-faint">{g.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="faq" eyebrow="Perguntas frequentes" title="Dúvidas comuns do funcionário">
        <FAQ
          items={[
            { q: "Quanto tempo leva a avaliação?", a: "Em média 15 a 20 minutos. Varia conforme seu ritmo de leitura e reflexão." },
            { q: "Posso pausar e continuar depois?", a: "Sim. O sistema salva cada resposta automaticamente. Saia quando quiser e continue de onde parou ao fazer login de novo." },
            { q: "Posso refazer a avaliação?", a: "Normalmente não, após concluída. Se houver algum problema, fale com o RH da sua empresa." },
            { q: "O que acontece depois que eu concluo?", a: "Suas respostas são processadas junto com as dos colegas para gerar um relatório consolidado, que a empresa usa para melhorar o ambiente de trabalho." },
            { q: "Não consigo fazer login. O que fazer?", a: <>Confira: CPF só com números; data de nascimento no formato <Pill>ddmmaaaa</Pill>; e se sua avaliação já foi liberada pelo RH. Persistindo, fale com o RH.</> },
            { q: "Por que preciso confirmar minha identidade?", a: "Para garantir que a pessoa certa está respondendo, mantendo a integridade dos dados coletados." },
          ]}
        />
      </Section>

      <Section id="dicas" eyebrow="Boas práticas" title="Para uma boa avaliação">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Antes de começar", items: ["Escolha um momento tranquilo", "Reserve ~20 minutos", "Local sem interrupções"] },
            { t: "Durante", items: ["Leia cada questão com atenção", "Responda com sinceridade", "Confie na primeira impressão"] },
            { t: "Lembre-se", items: ["Não há certo ou errado", "O objetivo é melhorar o ambiente", "Sua opinião é confidencial"] },
          ].map((b) => (
            <div key={b.t} className="break-inside-avoid rounded-2xl border border-line bg-surface/40 p-5">
              <h4 className="text-[0.92rem] font-semibold text-fg">{b.t}</h4>
              <ul className="mt-3 space-y-2 text-[0.88rem] text-fg-muted">
                {b.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-lime">·</span>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </article>
  );
}
