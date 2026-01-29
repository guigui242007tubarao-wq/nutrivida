"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "@/lib/auth-actions";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const [error, formAction, pending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div className="space-y-1">
        <p className="label">Email</p>
        <input className="input" name="email" type="email" required />
      </div>

      <div className="space-y-1">
        <p className="label">Senha</p>
        <input className="input" name="password" type="password" required />
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <button className="btn btn-primary w-full" disabled={pending} type="submit">
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
