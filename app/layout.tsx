import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QWork Academy · Central de Ajuda e Treinamento",
  description:
    "Aprenda a usar a plataforma QWork de avaliação psicossocial: manuais, recursos e suporte para mapear riscos da NR-1.",
  icons: { icon: "/logo-qwork.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="relative antialiased">{children}</body>
    </html>
  );
}
