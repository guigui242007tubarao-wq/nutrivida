"use client";

import { useState } from "react";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Inscrição (demo) ✅ Depois conectamos de verdade!");
    setEmail("");
  }

  return (
    <div className="card">
      <p className="text-sm font-semibold">Newsletter</p>
      <p className="muted mt-1 text-sm">
        Receba dicas práticas 1–2x por semana (demo).
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@exemplo.com"
          type="email"
          required
        />
        <button className="btn btn-primary w-full" type="submit">
          Quero receber
        </button>
      </form>

      <p className="muted mt-3 text-xs">Sem spam. Você pode sair quando quiser.</p>
    </div>
  );
}