/* ============================================================
   Manual do Funcionário : single source of truth.
   Rendered twice from this data: the web page (/funcionario)
   and the downloadable PDF (/funcionario/manual.pdf), so the
   two can never drift apart.
   ============================================================ */

import { GRUPOS, SUPPORT } from "./content";

/* ---------- Rich text: just enough markup for both renderers ---------- */

export type Inline =
  | string
  | { b: string }
  /** Monospace token (CPF format, URL…); optionally a link. */
  | { code: string; href?: string };

export type Rich = string | Inline[];

/* ---------- Content blocks ---------- */

export type CalloutVariant = "info" | "tip" | "warning";

export type Block =
  | { type: "paragraph"; text: Rich }
  | { type: "callout"; variant?: CalloutVariant; title?: string; text: Rich }
  | { type: "steps"; items: { title: string; body?: Rich }[] }
  | { type: "checklist"; items: Rich[] }
  | { type: "definitions"; rows: { term: string; def: Rich }[] }
  | { type: "groups"; items: typeof GRUPOS }
  | { type: "faq"; items: { q: string; a: Rich }[] }
  | { type: "tips"; columns: { title: string; items: string[] }[] };

export interface ManualSection {
  id: string;
  eyebrow: string;
  title: string;
  blocks: Block[];
}

const loginLink: Inline = { code: SUPPORT.loginUrl, href: SUPPORT.loginUrl };

export const MANUAL_FUNCIONARIO = {
  pdf: {
    href: "/funcionario/manual.pdf",
    fileName: "Manual do Funcionário - QWork.pdf",
    title: "Manual do Funcionário · QWork",
  },

  hero: {
    kicker: "Manual do Funcionário",
    audience: "Para colaboradores",
    title: "Responda sua avaliação psicossocial sem complicação",
    lead: "Um guia direto para acessar o sistema, responder as 37 questões e acompanhar seu comprovante. Leva de 15 a 20 minutos.",
  },

  /** What the employee needs before anything else (top of the PDF). */
  quickAccess: [
    { term: "Link", def: [loginLink] },
    { term: "Login", def: "Seu CPF, apenas números" },
    { term: "Data de nascimento", def: ["Formato ", { code: "ddmmaaaa" }, ", ex.: ", { code: "15031990" }] },
    { term: "Senha", def: "Deixe em branco" },
    { term: "Tempo", def: "15 a 20 minutos, salvamento automático" },
  ] satisfies { term: string; def: Rich }[],

  sections: [
    {
      id: "sobre",
      eyebrow: "Contexto",
      title: "O que é a avaliação psicossocial",
      blocks: [
        {
          type: "paragraph",
          text: [
            "É um instrumento baseado no ",
            { b: "COPSOQ III" },
            " (Copenhagen Psychosocial Questionnaire), questionário validado internacionalmente, usado para mapear riscos psicossociais no ambiente de trabalho. O objetivo é identificar fatores que podem afetar a saúde mental e o bem-estar, para que a empresa desenvolva ações de melhoria.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "100% confidencial",
          text: [
            "Suas respostas são ",
            { b: "anônimas" },
            ". A empresa recebe apenas um relatório consolidado do grupo, nunca respostas individuais.",
          ],
        },
      ],
    },
    {
      id: "acesso",
      eyebrow: "Passo a passo",
      title: "Primeiro acesso e login",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Acesse a página de login", body: ["Use o link enviado pelo RH: ", loginLink] },
            { title: "Digite seu CPF", body: "Apenas números, sem pontos ou traços." },
            {
              title: "Digite sua data de nascimento",
              body: ["No formato ", { code: "ddmmaaaa" }, ". Ex.: 15 de março de 1990 fica ", { code: "15031990" }, "."],
            },
            { title: "Deixe o campo Senha em branco", body: "Funcionários não usam senha." },
            { title: "Clique em “Entrar”", body: "Você cairá na tela de confirmação de identidade." },
          ],
        },
        {
          type: "callout",
          title: "Funcionário não precisa de senha",
          text: [
            "O acesso é feito apenas com ",
            { b: "CPF + data de nascimento" },
            ". Se algum dado na confirmação estiver errado, clique em “Cancelar” e fale com o RH.",
          ],
        },
      ],
    },
    {
      id: "dashboard",
      eyebrow: "Sua tela inicial",
      title: "O Dashboard",
      blocks: [
        { type: "paragraph", text: "Após confirmar a identidade, você verá:" },
        {
          type: "checklist",
          items: [
            [{ b: "Avaliações disponíveis" }, ": ID da avaliação, ID do lote, data de liberação e o botão “Iniciar” ou “Continuar”."],
            [{ b: "Histórico" }, ": avaliações já concluídas, com data e botão “Ver Comprovante”."],
            [{ b: "Botão Sair" }, ": no canto superior direito, encerra a sessão com segurança."],
          ],
        },
      ],
    },
    {
      id: "avaliacao",
      eyebrow: "Respondendo",
      title: "Realizando a avaliação",
      blocks: [
        {
          type: "definitions",
          rows: [
            { term: "Estrutura", def: "37 questões, divididas em 10 grupos temáticos (G1 a G10)." },
            { term: "Tempo", def: "15 a 20 minutos, no seu ritmo." },
            { term: "Navegação", def: "Barra de progresso (ex.: 15 de 37) e indicação do grupo atual." },
            { term: "Salvamento", def: "Automático a cada resposta. Pode sair e continuar de onde parou, nada se perde." },
          ],
        },
        {
          type: "steps",
          items: [
            { title: "Clique em “Iniciar Avaliação”", body: "Você é levado para a tela de questões." },
            { title: "Leia e responda cada questão", body: "Selecione o valor que melhor representa sua opinião. A próxima aparece automaticamente." },
            { title: "Complete as 37 questões", body: "Ao responder a última, um modal de processamento confirma a conclusão." },
            { title: "Veja o comprovante", body: "Mensagem de parabéns, ID, data e hora. A avaliação aparece no histórico como “Concluída”." },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          text: "Não pense demais em cada questão. A primeira resposta que vem à mente costuma ser a mais sincera. Não há respostas certas ou erradas.",
        },
      ],
    },
    {
      id: "grupos",
      eyebrow: "Referência",
      title: "O que significam os grupos G1–G10",
      blocks: [{ type: "groups", items: GRUPOS }],
    },
    {
      id: "faq",
      eyebrow: "Perguntas frequentes",
      title: "Dúvidas comuns do funcionário",
      blocks: [
        {
          type: "faq",
          items: [
            { q: "Quanto tempo leva a avaliação?", a: "Em média 15 a 20 minutos. Varia conforme seu ritmo de leitura e reflexão." },
            { q: "Posso pausar e continuar depois?", a: "Sim. O sistema salva cada resposta automaticamente. Saia quando quiser e continue de onde parou ao fazer login de novo." },
            { q: "Posso refazer a avaliação?", a: "Normalmente não, após concluída. Se houver algum problema, fale com o RH da sua empresa." },
            { q: "O que acontece depois que eu concluo?", a: "Suas respostas são processadas junto com as dos colegas para gerar um relatório consolidado, que a empresa usa para melhorar o ambiente de trabalho." },
            {
              q: "Não consigo fazer login. O que fazer?",
              a: ["Confira: CPF só com números; data de nascimento no formato ", { code: "ddmmaaaa" }, "; e se sua avaliação já foi liberada pelo RH. Persistindo, fale com o RH."],
            },
            { q: "Por que preciso confirmar minha identidade?", a: "Para garantir que a pessoa certa está respondendo, mantendo a integridade dos dados coletados." },
          ],
        },
      ],
    },
    {
      id: "dicas",
      eyebrow: "Boas práticas",
      title: "Para uma boa avaliação",
      blocks: [
        {
          type: "tips",
          columns: [
            { title: "Antes de começar", items: ["Escolha um momento tranquilo", "Reserve ~20 minutos", "Local sem interrupções"] },
            { title: "Durante", items: ["Leia cada questão com atenção", "Responda com sinceridade", "Confie na primeira impressão"] },
            { title: "Lembre-se", items: ["Não há certo ou errado", "O objetivo é melhorar o ambiente", "Sua opinião é confidencial"] },
          ],
        },
      ],
    },
  ] satisfies ManualSection[],
};
