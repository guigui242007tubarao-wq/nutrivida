"use client";

import Link from "next/link";
import { useState } from "react";

type SavedGoal = {
  savedAt: string;
  objetivo: "manter" | "perder" | "ganhar";
  meta: number;
  protMin: number;
  protMax: number;
  aguaL?: number;
};

const LS_KEY = "nutrivida:goal";

function readGoalFromStorage(): SavedGoal | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    const g = parsed as Partial<SavedGoal>;

    if (
      !g.savedAt ||
      !g.objetivo ||
      typeof g.meta !== "number" ||
      typeof g.protMin !== "number" ||
      typeof g.protMax !== "number"
    ) {
      return null;
    }

    return {
      savedAt: String(g.savedAt),
      objetivo: g.objetivo,
      meta: g.meta,
      protMin: g.protMin,
      protMax: g.protMax,
      aguaL: typeof g.aguaL === "number" ? g.aguaL : undefined,
    };
  } catch {
    return null;
  }
}

export default function SavedGoalCard() {
  const [goal, setGoal] = useState<SavedGoal | null>(() => readGoalFromStorage());

  function clear() {
    localStorage.removeItem(LS_KEY);
    setGoal(null);
  }

  if (!goal) return null;

  const label =
    goal.objetivo === "perder"
      ? "Perder gordura"
      : goal.objetivo === "ganhar"
      ? "Ganhar massa"
      : "Manter";

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Sua meta salva</p>
        <span className="muted text-xs">
          {new Date(goal.savedAt).toLocaleDateString("pt-BR")}
        </span>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div
          className="rounded-2xl p-4"
          style={{
            border: "1px solid rgba(var(--border), 0.30)",
            background: "rgba(var(--panel), 0.30)",
          }}
        >
          <p className="muted text-xs">Objetivo</p>
          <p className="text-sm font-semibold">{label}</p>
        </div>

        <div
          className="rounded-2xl p-4"
          style={{
            border: "1px solid rgba(var(--border), 0.30)",
            background: "rgba(var(--panel), 0.30)",
          }}
        >
          <p className="muted text-xs">Calorias</p>
          <p className="text-sm font-semibold">{goal.meta} kcal/dia</p>
        </div>

        <div
          className="rounded-2xl p-4"
          style={{
            border: "1px solid rgba(var(--border), 0.30)",
            background: "rgba(var(--panel), 0.30)",
          }}
        >
          <p className="muted text-xs">Proteína</p>
          <p className="text-sm font-semibold">
            {goal.protMin}–{goal.protMax} g/dia
          </p>
        </div>
      </div>

      {typeof goal.aguaL === "number" ? (
        <p className="muted mt-3 text-sm">Água: ~{goal.aguaL} L/dia</p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/calculadoras" className="btn btn-primary">
          Ajustar meta
        </Link>

        <button className="btn" type="button" onClick={clear}>
          Limpar
        </button>
      </div>
    </div>
  );
}