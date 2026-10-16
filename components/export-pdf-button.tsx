"use client";

import { FileDown } from "./icons";

/* Exports the current page through the browser's native print-to-PDF.
   Vector text, working links and zero server cost; layout comes from the
   print styles in globals.css. Browsers name the saved PDF after
   document.title, so it is swapped for the duration of the dialog. */
export function ExportPdfButton({
  fileName,
  label = "Exportar PDF",
}: {
  fileName: string;
  label?: string;
}) {
  function exportPdf() {
    const previous = document.title;
    const restore = () => {
      document.title = previous;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    document.title = fileName;
    window.print();
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <button
        type="button"
        onClick={exportPdf}
        aria-describedby="export-pdf-hint"
        className="inline-flex items-center gap-2 rounded-xl bg-lime px-5 py-3 text-[0.92rem] font-semibold text-[#0a0b0c] transition-colors hover:bg-[var(--color-lime-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
      >
        <FileDown className="h-4 w-4" />
        {label}
      </button>
      <p id="export-pdf-hint" className="text-[0.82rem] text-fg-faint">
        Na janela que abrir, escolha <span className="text-fg-muted">“Salvar como PDF”</span>.
      </p>
    </div>
  );
}
