# QWork Academy

Central de ajuda e treinamento da plataforma **QWork**: avaliação psicossocial e mapeamento de riscos da **NR-1** (COPSOQ III).

Portal dark-first com login único, roteiro guiado e uma página dedicada para cada documento de conhecimento.

## Acesso

| Campo   | Valor      |
| ------- | ---------- |
| Usuário | `qwork`    |
| Senha   | `qwork123` |

## Rodar

```bash
npm install      # uma vez
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # servir build
```

## Estrutura

- `app/login`: portão de acesso (cookie httpOnly + `middleware.ts`).
- `app/(portal)`: área autenticada com sidebar:
  - `/`: visão geral + **roteiro de 6 passos** + biblioteca + grupos G1–G10.
  - `/funcionario`: manual do funcionário.
  - `/gestor`: manual do gestor (perfis Clínica e Entidade).
  - `/comunicacao`: modelo de convite (copiar para clipboard).
  - `/planilha`: guia de importação + download do modelo XLSX.
  - `/suporte`: canais de atendimento + FAQ.
- `lib/content.ts`: fonte única de conteúdo (nav, roteiro, grupos, suporte).
- `public/`: `logo-qwork.png` e `modelo-planilha-funcionarios.xlsx`.

## Stack

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Motion · TypeScript.

Conteúdo extraído dos manuais oficiais em `QWork/`. Marca: lime `#a6d93f` + charcoal, dark-first.
