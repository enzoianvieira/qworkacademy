import type { Metadata } from "next";
import { GestorManual } from "./gestor-manual";

export const metadata: Metadata = { title: "Manual do Gestor · QWork Academy" };

export default function GestorPage() {
  return <GestorManual />;
}
