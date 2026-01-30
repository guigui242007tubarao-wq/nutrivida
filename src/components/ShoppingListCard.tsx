"use client";

import { useMemo, useState } from "react";

const LS_KEY = "nutrivida:shopping";

function readItemsFromStorage(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((x) => String(x).trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default function ShoppingListCard() {
  const [items, setItems] = useState<string[]>(() => readItemsFromStorage());

  const has = items.length > 0;

  const sorted = useMemo(
    () => [...items].sort((a, b) => a.localeCompare(b)),
    [items]
  );

  function clear() {
    localStorage.removeItem(LS_KEY);
    setItems([]);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(sorted.join("\n"));
      alert("Lista copiada ✅");
    } catch {
      alert("Não consegui copiar automaticamente. Tente manualmente.");
    }
  }

  if (!has) return null;

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Lista de compras</p>
        <div className="flex gap-2">
          <button className="btn" type="button" onClick={copy}>
            Copiar
          </button>
          <button className="btn" type="button" onClick={clear}>
            Limpar
          </button>
        </div>
      </div>

      <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-200">
        {sorted.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>

      <p className="muted text-xs">Salvo no seu navegador (localStorage).</p>
    </div>
  );
}