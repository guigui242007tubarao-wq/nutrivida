"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SavedGoal = {
  savedAt: string;
  objetivo: "manter" | "perder" | "ganhar";
  meta: number;
  protMin: number;
  protMax: number;
  aguaL?: number;
};

const LS_KEY = "nutrivida:goal";

export default function SavedGoalCard() {
  const [goal, setGoal] = useState<SavedGoal | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      setGoal(JSON.parse(raw));
    } catch {
      setGoal(null);
    }
  }, []);

  if (!goal) return null;

  const label =
    goal.objetivo === "perder" ? "Perder gordura" : goal.objetivo === "ganhar" ? "Ganhar massa" : "Manter";

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Sua meta salva</p>
        <span className="text-xs text-zinc-500">
          {new Date(goal.savedAt).toLocaleDateString("pt-BR")}
        </span>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <p className="muted text-xs">Objetivo</p>
          <p className="text-sm font-semibold">{label}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <p className="muted text-xs">Calorias</p>
          <p className="text-sm font-semibold">{goal.meta} kcal/dia</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <p className="muted text-xs">Proteína</p>
          <p className="text-sm font-semibold">
            {goal.protMin}–{goal.protMax} g/dia
          </p>
        </div>
      </div>

      {typeof goal.aguaL === "number" ? (
        <p className="muted mt-3 text-sm">Água: ~{goal.aguaL} L/dia</p>
      ) : null}

      <Link href="/calculadoras" className="btn btn-primary mt-4 w-fit">
        Ajustar meta
      </Link>
    </div>
  );
}