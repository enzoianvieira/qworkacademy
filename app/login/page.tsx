import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Entrar · QWork Academy",
};

export default function LoginPage() {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
      {/* Ambient brand glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.13] blur-[120px]"
        style={{ background: "var(--color-lime)" }}
      />

      <div className="w-full max-w-[420px]">
        <div className="mb-9 flex flex-col items-center text-center">
          <div className="text-[2.1rem]">
            <Logo showTagline />
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface/50 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <p className="kicker">Central de treinamento</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-fg">
            Acesse a QWork Academy
          </h1>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-muted">
            Tudo o que você precisa para dominar a plataforma de avaliação psicossocial.
          </p>

          <div className="mt-7">
            <LoginForm />
          </div>
        </div>

        <p className="mt-6 text-center text-[0.8rem] text-fg-faint">
          © {new Date().getFullYear()} QWork · Avalie. Previna. Proteja.
        </p>
      </div>
    </main>
  );
}
