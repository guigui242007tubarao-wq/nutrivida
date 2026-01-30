"use client";

import { useMemo } from "react";

const LS_KEY = "nutrivida:shopping";

function getList(): string[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveList(items: string[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export default function AddToShoppingListButton({
  ingredients,
  title,
}: {
  ingredients: string[];
  title: string;
}) {
  const clean = useMemo(
    () => ingredients.map((x) => x.trim()).filter(Boolean),
    [ingredients]
  );

  function add() {
    const current = new Set(getList());
    for (const it of clean) current.add(it);
    saveList(Array.from(current));
    alert(`Adicionado à lista de compras ✅\n(${title})`);
  }

  return (
    <button className="btn btn-primary" type="button" onClick={add}>
      Adicionar à lista de compras
    </button>
  );
}