"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageHero, Section, Steps, Callout, CheckList, DefGrid, Pill, RiskBadge, Card } from "@/components/ui";
import { FAQ } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Check } from "@/components/icons";
import { SUPPORT } from "@/lib/content";

type Profile = "clinica" | "empresa";

const STORAGE_KEY = "qw_gestor_profile";

interface ProfileConfig {
  label: string;
  emoji: string;
  path: string;
  who: string;
  scope: string;
  tagline: string;
  flow: string[];
  importWhere: string;
  pendWhere: string;
  payNote: string;
  videoSrc: string;
  videoPoster: string;
  videoVtt?: string;
}

const PROFILES: Record<Profile, ProfileConfig> = {
  clinica: {
    label: "Clínica Ocupacional",
    emoji: "🏥",
    path: "/rh/*",
    who: "Profissional de clínica de medicina ocupacional",
    scope: "Gerencia múltiplas empresas clientes",
    tagline: "Você atende várias empresas clientes.",
    flow: ["Nova empresa", "Inserir funcionário", "Liberar lotes", "Avaliações", "Solicitar laudo", "Link de pagamento", "Emissão do laudo"],
    importWhere: "dentro do dashboard da empresa cliente",
    pendWhere: "dentro do dashboard de cada empresa cliente",
    payNote: "O pagamento é gerado por empresa cliente, e cada uma recebe seu próprio link de cobrança, independente das outras.",
    videoSrc: "https://lbitaf4jbntrag8h.public.blob.vercel-storage.com/videos/qwork-clinica-Yv7wjk3QGY9bio2FPzIGpaVGHdTmF8.mp4",
    videoPoster: "/videos/qwork-clinica-poster.jpg",
    videoVtt: "/videos/qwork-clinica.vtt",
  },
  empresa: {
    label: "Empresa",
    emoji: "🏢",
    path: "/entidade/*",
    who: "Profissional da própria empresa avaliada",
    scope: "Gerencia apenas a própria empresa",
    tagline: "Você cuida da avaliação da sua própria empresa.",
    flow: ["Inserir funcionário", "Liberar lotes", "Avaliações", "Solicitar laudo", "Link de pagamento", "Emissão do laudo"],
    importWhere: 'em "Funcionários Ativos" no menu lateral',
    pendWhere: 'no menu lateral, com badge de contagem',
    payNote: "O pagamento é gerado diretamente para a sua empresa após a solicitação.",
    videoSrc: "https://lbitaf4jbntrag8h.public.blob.vercel-storage.com/videos/qwork-entidade-pcHBpW9BmrT68Qx7M6Tz71v9uiJxpX.mp4",
    videoPoster: "/videos/qwork-entidade-poster.jpg",
  },
};

export function GestorManual() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "clinica" || saved === "empresa") setProfile(saved);
    setReady(true);
  }, []);

  function choose(p: Profile) {
    setProfile(p);
    localStorage.setItem(STORAGE_KEY, p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setProfile(null);
    localStorage.removeItem(STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!ready) return <div className="min-h-[60vh]" />;

  return (
    <AnimatePresence mode="wait">
      {!profile ? (
        <motion.div
          key="picker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <ProfilePicker onChoose={choose} />
        </motion.div>
      ) : (
        <motion.div
          key={profile}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Manual profile={profile} onReset={reset} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Profile picker ---------------- */
function ProfilePicker({ onChoose }: { onChoose: (p: Profile) => void }) {
  return (
    <div>
      <header className="border-b border-line pb-12 pt-2">
        <Reveal>
          <span className="kicker">Manual do Gestor</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.025em] text-fg sm:text-5xl">
            Primeiro, quem é você?
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            O sistema tem duas jornadas. Escolha o seu perfil e o passo a passo se
            ajusta a você. Dá para trocar a qualquer momento.
          </p>
        </Reveal>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {(Object.keys(PROFILES) as Profile[]).map((key, i) => {
          const p = PROFILES[key];
          return (
            <Reveal key={key} delay={0.1 + i * 0.08}>
              <button
                onClick={() => onChoose(key)}
                className="group card-hover flex h-full w-full flex-col rounded-2xl border border-line bg-surface/50 p-7 text-left"
              >
                <span className="text-3xl">{p.emoji}</span>
                <h2 className="mt-4 text-[1.3rem] font-semibold tracking-[-0.01em] text-fg">
                  {p.label}
                </h2>
                <p className="mt-1 text-[0.85rem] text-fg-faint">
                  Acesso <Pill>{p.path}</Pill>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5 text-[0.92rem] text-fg-muted">
                  <li className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                    {p.who}
                  </li>
                  <li className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                    {p.scope}
                  </li>
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-lime">
                  Sou {p.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Manual ---------------- */
function Manual({ profile, onReset }: { profile: Profile; onReset: () => void }) {
  const p = PROFILES[profile];
  const isClinica = profile === "clinica";

  return (
    <article>
      {/* Selected-profile indicator */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface/50 px-5 py-3.5">
        <span className="inline-flex items-center gap-2.5 text-[0.95rem]">
          <span className="text-xl">{p.emoji}</span>
          <span className="text-fg-faint">Você é</span>
          <span className="font-semibold text-fg">{p.label}</span>
        </span>
        <button
          onClick={onReset}
          className="rounded-lg border border-line bg-ink-2 px-3 py-1.5 text-[0.82rem] font-medium text-fg-muted transition-colors hover:text-fg"
        >
          Trocar perfil
        </button>
      </div>

      <PageHero
        kicker="Manual do Gestor"
        audience={p.label}
        title="Conduza o processo, do cadastro ao laudo da NR-1"
        lead={`${p.tagline} Gerencie funcionários, libere ciclos, acompanhe pendências e emita o laudo de mapeamento de riscos psicossociais com validade legal.`}
      />

      {/* Vídeo do perfil */}
      <Section id="video" eyebrow="Comece em vídeo" title={`Tour guiado: ${p.label}`}>
        <p className="mb-6 text-[1.02rem] leading-relaxed text-fg-muted">
          Assista ao passo a passo em vídeo para o seu perfil antes de seguir o manual
          escrito abaixo.
        </p>

        <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-2xl shadow-black/40">
          <div className="relative aspect-video bg-black">
            <video
              key={p.videoSrc}
              controls
              playsInline
              preload="metadata"
              poster={p.videoPoster}
              className="h-full w-full object-contain"
            >
              <source src={p.videoSrc} type="video/mp4" />
              {p.videoVtt && (
                <track
                  label="Português"
                  kind="subtitles"
                  srcLang="pt-BR"
                  src={p.videoVtt}
                  default
                />
              )}
              Seu navegador não suporta a tag de vídeo HTML5.
            </video>
          </div>
        </div>
      </Section>

      {/* Login */}
      <Section id="acesso" eyebrow="Acesso" title="Login e primeiro acesso">
        <Steps
          items={[
            { title: "Acesse a página de login e informe CPF + Senha", body: <>Diferente do funcionário, <strong className="text-fg">gestores sempre usam senha</strong>.</> },
            { title: "Sua senha é gerada automaticamente", body: <>São os <strong className="text-fg">6 últimos dígitos do CNPJ</strong>. Ex.: CNPJ <Pill>44.261.338/0001-72</Pill> → senha <Pill>000172</Pill>.</> },
            { title: "Aceite os termos no primeiro acesso", body: "Leia os Termos de Uso e a Política de Privacidade, marque as caixas e clique em “Concordar e Continuar”." },
            { title: "Esqueceu ou quer trocar a senha?", body: "Entre em contato com o administrador do sistema." },
          ]}
        />
        <div className="mt-6">
          <Callout title="Como montar a senha">
            Pegue o CNPJ {isClinica ? "da clínica" : "da sua empresa"}, ignore pontos,
            barras e traços, e use apenas os <strong className="text-fg">6 últimos números</strong>.
          </Callout>
        </div>
      </Section>

      {/* Dashboard / fluxo: only selected profile's flow */}
      <Section id="fluxo" eyebrow="Visão geral" title="Dashboard e fluxo de trabalho">
        <p className="mb-6 text-[1.02rem] leading-relaxed text-fg-muted">
          O dashboard exibe um <strong className="text-fg">fluxo interativo</strong> com
          todas as etapas, cada uma com um tooltip explicativo. Para o seu perfil, o
          caminho é:
        </p>
        <Card>
          <p className="text-[0.78rem] font-semibold uppercase tracking-wider text-fg-faint">
            {p.emoji} {p.label}
          </p>
          <ol className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {p.flow.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-[0.92rem] text-fg-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-ink-2 font-mono text-[0.72rem] text-lime">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </Card>
      </Section>

      {/* Empresas: Clínica only, now with import via planilha */}
      {isClinica && (
        <Section id="empresas" eyebrow="🏥 Apenas Clínica Ocupacional" title="Gestão de empresas clientes">
          <Steps
            items={[
              { title: 'Clique em "Nova Empresa"', body: "No dashboard principal, para cadastrar uma empresa por vez." },
              { title: "Preencha os dados obrigatórios", body: "Nome, CNPJ, e nome/telefone/e-mail do representante." },
              { title: "Ou importe várias empresas via planilha", body: <>Use a opção de <strong className="text-fg">importação em massa</strong> e suba um arquivo XLSX com a lista de empresas, ideal para cadastrar muitas clientes de uma vez.</> },
              { title: "Acesse o dashboard da empresa", body: "Clique no card da empresa para gerenciar seus funcionários e lotes." },
            ]}
          />
          <div className="mt-6 space-y-3">
            <Callout title="Importação de empresas em massa">
              Além do cadastro manual, a Clínica Ocupacional pode{" "}
              <strong className="text-fg">importar empresas via planilha</strong>. Cada
              empresa recebe sua senha automaticamente (6 últimos dígitos do CNPJ).
            </Callout>
            <p className="text-[0.9rem] text-fg-faint">
              Na lista de empresas você vê nome, CNPJ, status (Ativa/Inativa), total de
              funcionários e avaliações, e a barra de progresso de cada uma.
            </p>
          </div>
        </Section>
      )}

      {/* Funcionários */}
      <Section id="funcionarios" eyebrow="Base de dados" title="Gestão de funcionários">
        <p className="mb-6 text-[1.02rem] leading-relaxed text-fg-muted">
          A forma mais rápida de cadastrar é importar a planilha XLSX. Veja o guia
          completo em <a href="/planilha" className="text-lime underline-offset-4 hover:underline">Planilha de Funcionários</a>.
        </p>
        <Steps
          items={[
            { title: `Clique em "Importar Funcionários" (${p.importWhere})`, body: <>Baixe o template. Colunas: <Pill>cpf</Pill> <Pill>nome</Pill> <Pill>setor</Pill> <Pill>funcao</Pill> <Pill>nivel_cargo</Pill>.</> },
            { title: "Preencha o nível de cargo corretamente", body: <>Aceita apenas <Pill>operacional</Pill> ou <Pill>gestao</Pill>. Isso define o <strong className="text-fg">nível das perguntas</strong> que o funcionário responde.</> },
            { title: "Selecione o arquivo e clique em Importar", body: "Depois você pode filtrar por setor, função ou nível, e ver o status de cada um." },
          ]}
        />
        <div className="mt-6">
          <Callout title="Operacional × Gestão: mesma avaliação, níveis diferentes">
            Os dois respondem <strong className="text-fg">as mesmas perguntas</strong>. O
            que muda é o <strong className="text-fg">nível</strong> de cada questão:{" "}
            <strong className="text-fg">gestão</strong> traz uma formulação mais
            elaborada (compatível com cargos de liderança) e{" "}
            <strong className="text-fg">operacional</strong> uma versão mais simples e
            direta. Veja em <a href="/planilha#niveis" className="text-lime hover:underline">Planilha</a>.
          </Callout>
        </div>
      </Section>

      {/* Ciclos: updated status labels */}
      <Section id="ciclos" eyebrow="Coletas" title="Ciclos de coletas avaliativas">
        <p className="mb-6 text-[1.02rem] leading-relaxed text-fg-muted">
          Um <strong className="text-fg">ciclo</strong> (ou lote) é um conjunto de
          funcionários selecionados para responder em um período. Crie, libere e
          acompanhe por ele.
        </p>
        <Steps
          items={[
            { title: 'Clique em "Iniciar Novo Ciclo"', body: "Selecione os funcionários participantes." },
            { title: "Configure o tipo", body: <><strong className="text-fg">Inicial</strong> (primeira avaliação) ou <strong className="text-fg">Sequencial</strong> (acompanhamento).</> },
            { title: "Crie e libere o ciclo", body: "Após liberar, os funcionários acessam com CPF + data de nascimento (sem senha)." },
          ]}
        />
        <h4 className="mb-3 mt-9 text-[0.95rem] font-semibold text-fg">Status do ciclo</h4>
        <DefGrid
          rows={[
            { term: "Sem Ciclo", def: "Nenhum ciclo ativo ainda: criado mas não liberado, ou ainda não iniciado." },
            { term: "Em Andamento", def: "Liberado: os funcionários estão respondendo." },
            { term: "Concluído", def: "Todas as avaliações finalizadas." },
            { term: "Cancelado", def: "Ciclo cancelado." },
          ]}
        />
      </Section>

      {/* Detalhes do lote */}
      <Section id="detalhes" eyebrow="Acompanhamento" title="Detalhes do lote">
        <p className="mb-6 text-[1.02rem] leading-relaxed text-fg-muted">
          Clique no card de um ciclo para ver estatísticas (total, concluídas,
          pendentes) e a tabela de funcionários com ID, nome, CPF, nível, status,
          data de conclusão e a classificação por grupo (G1–G10).
        </p>
        <div className="mb-7 flex flex-wrap items-center gap-2">
          <span className="text-[0.85rem] text-fg-faint">Classificações por grupo:</span>
          <RiskBadge level="good" />
          <RiskBadge level="watch" />
          <RiskBadge level="alert" />
        </div>
        <Callout variant="warning" title="Reset vs Inativar: ações irreversíveis">
          <strong className="text-fg">Reset</strong> apaga todas as respostas e o
          funcionário recomeça do zero. <strong className="text-fg">Inativar</strong>{" "}
          remove o funcionário do ciclo (não conta para o progresso). Ambas exigem
          confirmação e não podem ser desfeitas.
        </Callout>
      </Section>

      {/* Pendências */}
      <Section id="pendencias" eyebrow="Garantia de cobertura" title="Aba Pendências">
        <p className="mb-6 text-[1.02rem] leading-relaxed text-fg-muted">
          Mostra funcionários ativos <strong className="text-fg">sem avaliação concluída</strong>{" "}
          em relação ao último ciclo liberado (lote de referência). Garante que ninguém
          fique de fora. No seu perfil, a aba fica {p.pendWhere}.
        </p>
        <DefGrid
          rows={[
            { term: "Inativado no Lote", def: "A avaliação foi inativada durante o último ciclo liberado." },
            { term: "Nunca Avaliado", def: "Nunca participou de nenhum ciclo da empresa." },
            { term: "Adicionado Após o Lote", def: "Cadastrado depois da liberação do lote de referência." },
            { term: "Sem Conclusão Válida", def: "Participou de algum ciclo, mas não concluiu nenhuma avaliação." },
          ]}
        />
        <div className="mt-6">
          <Callout title="Como agir">
            Nunca avaliados ou adicionados depois → inclua no próximo ciclo. Inativados →
            decida se retornam. Sem conclusão → verifique se houve problema de acesso.
            Atualiza em tempo real (botão de refresh).
          </Callout>
        </div>
      </Section>

      {/* Laudos */}
      <Section id="laudos" eyebrow="Entrega" title="Emissão de laudos">
        <p className="mb-6 text-[1.02rem] leading-relaxed text-fg-muted">
          Você solicita a emissão quando o ciclo está <strong className="text-fg">Concluído</strong>,
          com todas as avaliações finalizadas.
        </p>
        <Steps
          items={[
            { title: "Acesse o ciclo concluído", body: 'Localize a seção "Lote Concluído".' },
            { title: 'Clique em "Solicitar Emissão do Laudo"', body: "Confirme a solicitação." },
            { title: "Receba o link de pagamento", body: "Via WhatsApp e/ou e-mail. Pague por Boleto, Pix ou Cartão." },
            { title: "Baixe o laudo", body: "Após a confirmação do pagamento e o upload, baixe o PDF pelo painel." },
          ]}
        />
        <h4 className="mb-3 mt-9 text-[0.95rem] font-semibold text-fg">Status da emissão</h4>
        <DefGrid
          rows={[
            { term: "Emissão Solicitada", def: "Aguardando processamento." },
            { term: "Aguardando Pagamento", def: "Link gerado, pagamento pendente." },
            { term: "Laudo Emitido", def: "Pronto para download." },
          ]}
        />
        <div className="mt-6 space-y-3">
          <Callout title="Verificação de integridade (Hash SHA-256)">
            Cada laudo tem um hash SHA-256 que comprova autenticidade. O sistema verifica
            automaticamente antes de cada download: hash válido → download segue; hash
            inválido → alerta de possível alteração. Copie e guarde o hash para auditorias.
          </Callout>
          <p className="text-[0.9rem] text-fg-faint">{p.emoji} {p.payNote}</p>
        </div>
      </Section>

      {/* Laudo NR-1 */}
      <Section id="laudo-nr1" eyebrow="O documento" title="Laudo de Mapeamento de Riscos Psicossociais">
        <p className="mb-6 text-[1.02rem] leading-relaxed text-fg-muted">
          Documento técnico gerado ao final do processo, produzido pelo{" "}
          <strong className="text-fg">Emissor</strong> (profissional habilitado
          pré-cadastrado). Atende às exigências da <strong className="text-fg">NR-1</strong> e
          do <strong className="text-fg">GRO</strong>.
        </p>
        <CheckList
          items={[
            "Identificação da empresa e do ciclo avaliativo",
            "Consolidação das respostas por grupo temático (G1–G10)",
            "Classificação de risco de cada grupo: Excelente, Monitorar ou Atenção",
            "Análise qualitativa dos riscos identificados",
            "Recomendações de intervenção e monitoramento",
          ]}
        />
        <div className="mt-6">
          <Callout variant="warning" title="Validade legal">
            O laudo tem validade legal. Guarde-o em local seguro e mantenha o hash de
            integridade registrado para auditorias ou fiscalizações.
          </Callout>
        </div>
      </Section>

      {/* Relatórios */}
      <Section id="relatorios" eyebrow="Análise" title="Relatórios">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h4 className="text-[1rem] font-medium text-fg">Relatório do ciclo</h4>
            <p className="mt-2 text-[0.92rem] text-fg-muted">
              Em detalhes do ciclo → “Gerar Relatório PDF”. Contém estatísticas gerais,
              análise por grupo (G1–G10), classificação de risco e recomendações.
            </p>
          </Card>
          <Card>
            <h4 className="text-[1rem] font-medium text-fg">Relatório individual</h4>
            <p className="mt-2 text-[0.92rem] text-fg-muted">
              Na tabela de funcionários, botão “PDF” na coluna Ações. O relatório do
              funcionário é baixado automaticamente.
            </p>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Perguntas frequentes" title="Dúvidas comuns do gestor">
        <FAQ
          items={[
            { q: "Qual é a minha senha de acesso?", a: <>É gerada automaticamente: os <strong className="text-fg">6 últimos dígitos do CNPJ</strong> {isClinica ? "da clínica" : "da sua empresa"} (sem pontos, barras ou traços).</> },
            { q: "Quantas questões tem a avaliação?", a: "37 questões em 10 grupos temáticos. Tempo estimado de 15 a 20 minutos." },
            { q: "Como os funcionários acessam o sistema?", a: <>Com CPF (só números) e data de nascimento (<Pill>ddmmaaaa</Pill>). Não precisam de senha.</> },
            { q: "Qual a diferença entre operacional e gestão?", a: "São as mesmas perguntas, mas em níveis diferentes: gestão tem formulação mais elaborada (para liderança) e operacional uma versão mais simples e direta." },
            { q: "Qual a diferença entre Inativar e Reset?", a: "Inativar remove o funcionário do ciclo (não responde mais). Reset apaga todas as respostas e ele recomeça do zero. Ambas são irreversíveis." },
            { q: "Posso adicionar funcionários a um ciclo existente?", a: "Não. Crie um novo ciclo. Os adicionados após a liberação do último lote aparecem na Aba Pendências." },
            ...(isClinica
              ? [{ q: "Posso cadastrar várias empresas de uma vez?", a: "Sim. Além do cadastro manual, a Clínica Ocupacional pode importar empresas em massa via planilha XLSX." } as const]
              : []),
            { q: "O laudo tem validade legal?", a: "Sim. Atende aos requisitos da NR-1/GRO e o hash SHA-256 garante a integridade para auditoria e fiscalização." },
          ]}
        />
      </Section>

      <Section id="suporte" eyebrow="Precisa de ajuda?" title="Fale com o suporte QWork">
        <p className="text-[1.02rem] leading-relaxed text-fg-muted">
          E-mail <a href={`mailto:${SUPPORT.email}`} className="text-lime hover:underline">{SUPPORT.email}</a> ·
          Telefone <a href={SUPPORT.phoneHref} className="text-lime hover:underline">{SUPPORT.phone}</a> · {SUPPORT.hours}.
          Veja mais na página de <a href="/suporte" className="text-lime hover:underline">Suporte</a>.
        </p>
      </Section>
    </article>
  );
}
