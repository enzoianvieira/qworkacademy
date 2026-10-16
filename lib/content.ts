/* ============================================================
   QWork Academy : Single source of truth for content.
   Drives navigation, the roadmap, and document pages.
   ============================================================ */

export type IconName =
  | "compass"
  | "user"
  | "manager"
  | "mail"
  | "sheet"
  | "lifebuoy"
  | "shield"
  | "megaphone";

export interface NavItem {
  slug: string;
  href: string;
  title: string;
  short: string;
  description: string;
  icon: IconName;
  group: "start" | "manuais" | "recursos" | "ajuda";
}

export const NAV: NavItem[] = [
  {
    slug: "inicio",
    href: "/",
    title: "Visão Geral",
    short: "Comece aqui",
    description: "Entenda o que é a QWork e o caminho para dominar a plataforma.",
    icon: "compass",
    group: "start",
  },
  {
    slug: "funcionario",
    href: "/funcionario",
    title: "Manual do Funcionário",
    short: "Funcionário",
    description: "Como acessar e responder a avaliação psicossocial em 15–20 minutos.",
    icon: "user",
    group: "manuais",
  },
  {
    slug: "gestor",
    href: "/gestor",
    title: "Manual do Gestor",
    short: "Gestor",
    description: "Gerir empresas, ciclos, pendências e emitir o laudo da NR-1.",
    icon: "manager",
    group: "manuais",
  },
  {
    slug: "comunicacao",
    href: "/comunicacao",
    title: "Comunicação ao Funcionário",
    short: "Comunicação",
    description: "Modelo pronto para convidar colaboradores para a avaliação.",
    icon: "mail",
    group: "recursos",
  },
  {
    slug: "planilha",
    href: "/planilha",
    title: "Planilha de Funcionários",
    short: "Planilha",
    description: "Como preencher e importar a base de funcionários via XLSX.",
    icon: "sheet",
    group: "recursos",
  },
  {
    slug: "marketing",
    href: "/marketing",
    title: "Kit de Marketing",
    short: "Marketing",
    description: "Apresentações, pitch e panfleto oficiais da QWork prontos para baixar.",
    icon: "megaphone",
    group: "recursos",
  },
  {
    slug: "suporte",
    href: "/suporte",
    title: "Suporte & Dúvidas",
    short: "Suporte",
    description: "Canais de atendimento e respostas para as dúvidas mais comuns.",
    icon: "lifebuoy",
    group: "ajuda",
  },
];

export const NAV_GROUPS: { id: NavItem["group"]; label: string }[] = [
  { id: "start", label: "Início" },
  { id: "manuais", label: "Manuais" },
  { id: "recursos", label: "Recursos" },
  { id: "ajuda", label: "Ajuda" },
];

/* ---------- The Roadmap: the guided journey ---------- */

export interface RoadmapStep {
  n: number;
  title: string;
  blurb: string;
  href: string;
  cta: string;
  audience: "Funcionário" | "Gestor" | "Todos";
}

export const ROADMAP: RoadmapStep[] = [
  {
    n: 1,
    title: "Entenda a avaliação psicossocial",
    blurb:
      "A QWork mapeia riscos psicossociais com o COPSOQ III, questionário validado internacionalmente, para atender à NR-1 e ao GRO.",
    href: "/funcionario#sobre",
    cta: "O que é a avaliação",
    audience: "Todos",
  },
  {
    n: 2,
    title: "Cadastre os funcionários",
    blurb:
      "O gestor importa a base de colaboradores via planilha XLSX, definindo setor, função e nível de cargo.",
    href: "/planilha",
    cta: "Como preencher a planilha",
    audience: "Gestor",
  },
  {
    n: 3,
    title: "Convide os colaboradores",
    blurb:
      "Use o modelo de comunicação pronto para explicar a avaliação e enviar o link de acesso.",
    href: "/comunicacao",
    cta: "Ver modelo de convite",
    audience: "Gestor",
  },
  {
    n: 4,
    title: "Libere o ciclo de coleta",
    blurb:
      "Crie um lote, selecione os participantes e libere. Os funcionários acessam só com CPF e data de nascimento.",
    href: "/gestor#ciclos",
    cta: "Gerir ciclos",
    audience: "Gestor",
  },
  {
    n: 5,
    title: "Responda em 15–20 minutos",
    blurb:
      "37 questões em 10 grupos temáticos. Salvamento automático: dá para pausar e continuar depois.",
    href: "/funcionario#avaliacao",
    cta: "Como responder",
    audience: "Funcionário",
  },
  {
    n: 6,
    title: "Emita o laudo da NR-1",
    blurb:
      "Com o ciclo concluído, solicite a emissão. O laudo tem validade legal e hash SHA-256 de integridade.",
    href: "/gestor#laudos",
    cta: "Emissão de laudos",
    audience: "Gestor",
  },
];

/* ---------- COPSOQ thematic groups (G1–G10) ---------- */

export const GRUPOS: { g: string; nome: string; desc: string }[] = [
  { g: "G1", nome: "Intensidade e Demandas no Trabalho", desc: "Carga de trabalho, ritmo acelerado, esgotamento físico e pressão operacional." },
  { g: "G2", nome: "Significado, Organização e Conteúdo", desc: "Relevância das atividades, autonomia e oportunidades de desenvolvimento." },
  { g: "G3", nome: "Relações Interpessoais", desc: "Apoio de colegas e supervisores, conflitos, reconhecimento e clima organizacional." },
  { g: "G4", nome: "Interface Trabalho–Indivíduo", desc: "Impacto do trabalho na vida pessoal, energia para lazer e família." },
  { g: "G5", nome: "Valores no Trabalho", desc: "Transparência, confiança na gestão e reconhecimento por desempenho." },
  { g: "G6", nome: "Resiliência e Personalidade", desc: "Confiança na capacidade de resolver problemas e manter metas." },
  { g: "G7", nome: "Saúde e Bem-Estar", desc: "Estresse, insônia e esgotamento emocional, riscos à saúde ocupacional." },
  { g: "G8", nome: "Segurança e Comportamentos Ofensivos", desc: "Assédio, ameaças e agressões. Mede a segurança psicológica no trabalho." },
  { g: "G9", nome: "Jogos de Apostas", desc: "Hábitos de apostas e sua interferência no desempenho profissional." },
  { g: "G10", nome: "Endividamento", desc: "Estresse financeiro e seu efeito na concentração e no desempenho." },
];

export const SUPPORT = {
  email: "contato@qwork.com.br",
  phone: "(41) 99540-1309",
  phoneHref: "tel:+5541995401309",
  hours: "Segunda a Sexta, 08h às 18h",
  loginUrl: "https://sistema.qwork.app.br/login",
};
