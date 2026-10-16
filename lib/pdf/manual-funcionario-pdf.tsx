/* ============================================================
   Manual do Funcionário : PDF renderer.
   Vector A4 document built from lib/manual-funcionario.ts (the
   same data as the web page). Rendered once at build time by
   app/(portal)/funcionario/manual.pdf/route.ts.
   ============================================================ */

import path from "node:path";
import type { ReactNode } from "react";
import {
  Document,
  Font,
  Link,
  Page,
  Path,
  Circle,
  StyleSheet,
  Svg,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { MANUAL_FUNCIONARIO as M, type Block, type Rich, type CalloutVariant } from "../manual-funcionario";

/* ---------- Fonts ---------- */

const fontDir = path.join(process.cwd(), "assets", "fonts", "inter");
Font.register({
  family: "Inter",
  fonts: [400, 500, 600, 700].map((fontWeight) => ({
    src: path.join(fontDir, `inter-latin-${fontWeight}-normal.woff`),
    fontWeight,
  })),
});
// The default hyphenator is English-only and mangles Portuguese words.
Font.registerHyphenationCallback((word) => [word]);

/* ---------- Tokens (paper palette, mirrors the print theme) ---------- */

const A4_HEIGHT = 841.89; // pt

const c = {
  ink: "#0b0c0e",
  muted: "#374151",
  faint: "#6b7280",
  line: "#e3e5e8",
  surface: "#f5f6f7",
  lime: "#a6d93f",
  limeInk: "#4d7a0f", // AA on white
  charcoal: "#2c2e32",
  good: "#15803d",
  alert: "#b91c1c",
};

const callout: Record<CalloutVariant, { bar: string; label: string }> = {
  info: { bar: c.limeInk, label: "Importante" },
  tip: { bar: c.good, label: "Dica" },
  warning: { bar: c.alert, label: "Atenção" },
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.55,
    color: c.muted,
    paddingTop: 44,
    paddingBottom: 58,
    paddingHorizontal: 46,
  },
  kicker: { fontSize: 6.8, fontWeight: 500, letterSpacing: 1.8, textTransform: "uppercase", color: c.faint },
  footer: {
    // Anchored from the top: react-pdf resolves `bottom` against the
    // unpaginated content height here, pushing the footer off-page.
    position: "absolute",
    top: A4_HEIGHT - 36,
    left: 46,
    right: 46,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    fontWeight: 500,
    color: c.faint,
  },
  b: { fontWeight: 600, color: c.ink },
  code: { fontWeight: 500, color: c.limeInk },
  card: { backgroundColor: c.surface, borderWidth: 0.75, borderColor: c.line, borderRadius: 8 },
});

/* ---------- Primitives ---------- */

function R({ text }: { text: Rich }) {
  if (typeof text === "string") return text;
  return text.map((node, i) => {
    if (typeof node === "string") return node;
    if ("b" in node) return <Text key={i} style={s.b}>{node.b}</Text>;
    return node.href ? (
      <Link key={i} src={node.href} style={{ ...s.code, textDecoration: "none" }}>{node.code}</Link>
    ) : (
      <Text key={i} style={s.code}>{node.code}</Text>
    );
  });
}

function Logo({ size = 15 }: { size?: number }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: size * 0.12 }}>
      <Svg viewBox="0 0 40 40" width={size * 1.2} height={size * 1.2}>
        <Circle cx="19" cy="20" r="13" fill="none" stroke={c.lime} strokeWidth={6.5} />
        <Path d="M26 28 L33 35" stroke={c.lime} strokeWidth={6.5} strokeLinecap="round" />
        <Path d="M12 20.5 l4.5 4.5 L28 12.5" fill="none" stroke={c.charcoal} strokeWidth={4.2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
      <Text style={{ fontSize: size * 1.15, fontWeight: 700, color: c.ink, letterSpacing: -0.3, lineHeight: 1 }}>Work</Text>
    </View>
  );
}

function Check() {
  return (
    <Svg viewBox="0 0 24 24" width={11} height={11} style={{ marginTop: 2.5 }}>
      <Path d="m5 12.5 4.5 4.5L19 6.5" fill="none" stroke={c.limeInk} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/* ---------- Blocks ---------- */

function BlockPdf({ block }: { block: Block }): ReactNode {
  switch (block.type) {
    case "paragraph":
      return <Text style={{ fontSize: 10.5, lineHeight: 1.65 }}><R text={block.text} /></Text>;

    case "callout": {
      const v = callout[block.variant ?? "info"];
      return (
        <View wrap={false} style={{ ...s.card, borderLeftWidth: 2, borderLeftColor: v.bar, paddingVertical: 11, paddingHorizontal: 14 }}>
          <Text style={{ fontSize: 6.8, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: v.bar }}>
            {block.title ?? v.label}
          </Text>
          <Text style={{ marginTop: 4 }}><R text={block.text} /></Text>
        </View>
      );
    }

    case "steps":
      return (
        <View style={{ gap: 11 }}>
          {block.items.map((step, i) => (
            <View key={i} wrap={false} style={{ flexDirection: "row", gap: 11 }}>
              <View style={{ width: 17, height: 17, borderRadius: 9, borderWidth: 0.75, borderColor: c.line, backgroundColor: c.surface, alignItems: "center", justifyContent: "center", marginTop: 0.5 }}>
                <Text style={{ fontSize: 7.5, fontWeight: 600, color: c.limeInk, lineHeight: 1 }}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10.5, fontWeight: 500, color: c.ink }}>{step.title}</Text>
                {step.body && <Text style={{ marginTop: 1 }}><R text={step.body} /></Text>}
              </View>
            </View>
          ))}
        </View>
      );

    case "checklist":
      return (
        <View style={{ gap: 7 }}>
          {block.items.map((item, i) => (
            <View key={i} wrap={false} style={{ flexDirection: "row", gap: 8 }}>
              <Check />
              <Text style={{ flex: 1 }}><R text={item} /></Text>
            </View>
          ))}
        </View>
      );

    case "definitions":
      return (
        <View style={s.card}>
          {block.rows.map((row, i) => (
            <View key={i} wrap={false} style={{ flexDirection: "row", gap: 14, paddingVertical: 9, paddingHorizontal: 13, borderTopWidth: i ? 0.75 : 0, borderTopColor: c.line }}>
              <Text style={{ width: 92, fontWeight: 500, color: c.ink }}>{row.term}</Text>
              <Text style={{ flex: 1 }}><R text={row.def} /></Text>
            </View>
          ))}
        </View>
      );

    case "groups":
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 7 }}>
          {block.items.map((g) => (
            <View key={g.g} wrap={false} style={{ ...s.card, width: "49%", padding: 10 }}>
              <Text style={{ fontSize: 9.5, fontWeight: 500, color: c.ink }}>
                <Text style={{ fontSize: 7.5, fontWeight: 700, color: c.limeInk }}>{g.g}  </Text>
                {g.nome}
              </Text>
              <Text style={{ marginTop: 3, fontSize: 8.5, color: c.faint, lineHeight: 1.5 }}>{g.desc}</Text>
            </View>
          ))}
        </View>
      );

    case "faq":
      return (
        <View style={{ gap: 6 }}>
          {block.items.map((f, i) => (
            <View key={i} wrap={false} style={{ ...s.card, paddingVertical: 10, paddingHorizontal: 13 }}>
              <Text style={{ fontSize: 10.5, fontWeight: 500, color: c.ink }}>{f.q}</Text>
              <Text style={{ marginTop: 2 }}><R text={f.a} /></Text>
            </View>
          ))}
        </View>
      );

    case "tips":
      return (
        <View style={{ flexDirection: "row", gap: 8 }}>
          {block.columns.map((col) => (
            <View key={col.title} wrap={false} style={{ ...s.card, flex: 1, padding: 12 }}>
              <Text style={{ fontSize: 9.5, fontWeight: 600, color: c.ink }}>{col.title}</Text>
              <View style={{ marginTop: 6, gap: 4 }}>
                {col.items.map((item) => (
                  <View key={item} style={{ flexDirection: "row", gap: 5 }}>
                    <Text style={{ color: c.limeInk, fontWeight: 700 }}>·</Text>
                    <Text style={{ flex: 1, fontSize: 9 }}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      );
  }
}

/* ---------- Document ---------- */

function ManualFuncionarioPdf() {
  return (
    <Document
      title={M.pdf.title}
      author="QWork"
      subject={M.hero.lead}
      keywords="QWork, avaliação psicossocial, COPSOQ III, NR-1"
      creator="QWork Academy"
      producer="QWork Academy"
      language="pt-BR"
    >
      <Page size="A4" style={s.page}>
        <View fixed style={s.footer}>
          <Text>QWork Academy · Manual do Funcionário</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>

        {/* Letterhead */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottomWidth: 0.75, borderBottomColor: c.line }}>
          <Logo />
          <Text style={s.kicker}>Guia do colaborador</Text>
        </View>

        {/* Hero */}
        <View style={{ paddingTop: 22, paddingBottom: 20, borderBottomWidth: 0.75, borderBottomColor: c.line }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={s.kicker}>{M.hero.kicker}</Text>
            <Text style={{ fontSize: 7, fontWeight: 500, color: c.muted, borderWidth: 0.75, borderColor: c.line, borderRadius: 8, paddingVertical: 2, paddingHorizontal: 7, backgroundColor: c.surface }}>
              {M.hero.audience}
            </Text>
          </View>
          <Text style={{ marginTop: 12, maxWidth: 400, fontSize: 24, fontWeight: 600, color: c.ink, letterSpacing: -0.5, lineHeight: 1.15 }}>
            {M.hero.title}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 11.5, lineHeight: 1.6, maxWidth: 420 }}>{M.hero.lead}</Text>
        </View>

        {/* Quick access */}
        <View wrap={false} style={{ ...s.card, marginTop: 18, padding: 16, borderLeftWidth: 2, borderLeftColor: c.lime }}>
          <Text style={s.kicker}>Acesso rápido</Text>
          <View style={{ marginTop: 8, gap: 5 }}>
            {M.quickAccess.map((row) => (
              <View key={row.term} style={{ flexDirection: "row", gap: 14 }}>
                <Text style={{ width: 110, fontWeight: 500, color: c.ink }}>{row.term}</Text>
                <Text style={{ flex: 1 }}><R text={row.def} /></Text>
              </View>
            ))}
          </View>
        </View>

        {M.sections.map((section) => (
          <View key={section.id} style={{ marginTop: 26 }}>
            {/* Header keeps ~90pt of content with it, so it never ends a page. */}
            <View minPresenceAhead={90} style={{ marginBottom: 12 }}>
              <Text style={s.kicker}>{section.eyebrow}</Text>
              <Text style={{ marginTop: 5, fontSize: 15.5, fontWeight: 600, color: c.ink, letterSpacing: -0.25 }}>
                {section.title}
              </Text>
            </View>
            <View style={{ gap: 12 }}>
              {section.blocks.map((block, i) => (
                <BlockPdf key={i} block={block} />
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export function renderManualFuncionarioPdf(): Promise<Buffer> {
  return renderToBuffer(<ManualFuncionarioPdf />);
}
