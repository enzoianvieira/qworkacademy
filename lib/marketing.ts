/* ============================================================
   QWork Academy : Marketing kit.
   Official sales & campaign decks. Source files live in
   public/marketing (served behind the auth gate); covers are
   the real first slide of each deck, exported from PowerPoint.
   ============================================================ */

import type { StaticImageData } from "next/image";
import coverEmpresas from "@/assets/marketing/qwork-apresentacao-empresas.webp";
import coverParceiros from "@/assets/marketing/qwork-apresentacao-parceiros.webp";
import coverPitch from "@/assets/marketing/qwork-pitch-vertical.webp";
import coverPanfleto from "@/assets/marketing/qwork-panfleto-qrcode.webp";

export interface MarketingAsset {
  slug: string;
  title: string;
  description: string;
  /** When this material is the right one to reach for. */
  useWhen: string;
  audience: string;
  format: string;
  pages: number;
  /** Human-readable size of the .pptx, kept in sync with public/marketing. */
  size: string;
  href: string;
  /** Friendly filename the browser saves the download as. */
  downloadName: string;
  cover: StaticImageData;
}

export const MARKETING_ASSETS: MarketingAsset[] = [
  {
    slug: "apresentacao-empresas",
    title: "Apresentação para Empresas",
    description:
      "Gestão de riscos psicossociais para atender à NR-1: o problema, o que a norma exige e como a QWork entrega conformidade e segurança jurídica.",
    useWhen: "Reuniões comerciais com RH, SESMT e diretoria.",
    audience: "Empresas",
    format: "Widescreen 16:9",
    pages: 10,
    size: "7,2 MB",
    href: "/marketing/qwork-apresentacao-empresas.pptx",
    downloadName: "QWork - Apresentação para Empresas.pptx",
    cover: coverEmpresas,
  },
  {
    slug: "apresentacao-parceiros",
    title: "Apresentação para Parceiros SST",
    description:
      "Por que a NR-1 virou urgência e como clínicas e consultorias de SST podem atender essa nova demanda com a QWork.",
    useWhen: "Prospecção de clínicas ocupacionais e consultorias de SST.",
    audience: "Parceiros SST",
    format: "Widescreen 16:9",
    pages: 10,
    size: "1,5 MB",
    href: "/marketing/qwork-apresentacao-parceiros.pptx",
    downloadName: "QWork - Apresentação para Parceiros SST.pptx",
    cover: coverParceiros,
  },
  {
    slug: "pitch-vertical",
    title: "Pitch Vertical",
    description:
      "A NR-1 mudou, sua responsabilidade também. A narrativa comercial completa em formato pensado para a tela do celular.",
    useWhen: "Envio por WhatsApp, e-mail ou leitura no celular.",
    audience: "Empresas",
    format: "Vertical · celular",
    pages: 12,
    size: "2,5 MB",
    href: "/marketing/qwork-pitch-vertical.pptx",
    downloadName: "QWork - Pitch.pptx",
    cover: coverPitch,
  },
  {
    slug: "panfleto-qrcode",
    title: "Panfleto QR Code",
    description:
      "Cartaz para o colaborador escanear e acessar o questionário direto pelo celular, sem precisar digitar o link.",
    useWhen: "Imprimir e fixar em murais, refeitório e pontos de grande circulação.",
    audience: "Colaboradores",
    format: "Impresso A4",
    pages: 1,
    size: "194 KB",
    href: "/marketing/qwork-panfleto-qrcode.pptx",
    downloadName: "QWork - Panfleto QR Code.pptx",
    cover: coverPanfleto,
  },
];
