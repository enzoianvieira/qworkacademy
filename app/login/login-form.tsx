"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight } from "@/components/icons";

export function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Não foi possível entrar.");
        setLoading(false);
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setError("Falha de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field
        label="Usuário"
        type="text"
        value={user}
        onChange={setUser}
        placeholder="qwork"
        autoComplete="username"
      />
      <Field
        label="Senha"
        type="password"
        value={pass}
        onChange={setPass}
        placeholder="••••••••"
        autoComplete="current-password"
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[0.85rem] text-[var(--color-risk-alert)]"
        >
          {error}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-lime px-5 py-3 text-[0.95rem] font-semibold text-[#0a0b0c] transition-all hover:bg-[var(--color-lime-bright)] disabled:opacity-60"
      >
        {loading ? "Entrando…" : "Entrar"}
        {!loading && (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.8rem] font-medium text-fg-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="w-full rounded-xl border border-line bg-ink-2/70 px-4 py-3 text-[0.95rem] text-fg outline-none transition-all placeholder:text-fg-faint focus:border-[var(--color-lime-dim)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-lime)_25%,transparent)]"
      />
    </label>
  );
}
