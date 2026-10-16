import { renderManualFuncionarioPdf } from "@/lib/pdf/manual-funcionario-pdf";
import { MANUAL_FUNCIONARIO } from "@/lib/manual-funcionario";

// Content is static: render once at build, then serve as a static file.
// Access is still gated by middleware.ts like every portal route.
export const dynamic = "force-static";

export async function GET() {
  const pdf = await renderManualFuncionarioPdf();
  const { fileName } = MANUAL_FUNCIONARIO.pdf;

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Manual-do-Funcionario-QWork.pdf"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    },
  });
}
