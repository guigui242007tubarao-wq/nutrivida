"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import Section from "@/components/Section";
import ShoppingListCard from "@/components/ShoppingListCard";
import { recipes, RecipeCategory } from "@/data/recipes";

const labels: Record<RecipeCategory, string> = {
  cafe: "Café da manhã",
  almoco: "Almoço",
  lanche: "Lanche",
  jantar: "Jantar",
};

type CatOption = "todas" | RecipeCategory;

const catOptions = ["todas", "cafe", "almoco", "lanche", "jantar"] as const;

function isCatOption(v: string): v is (typeof catOptions)[number] {
  return (catOptions as readonly string[]).includes(v);
}

function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function ReceitasPage() {
  const [cat, setCat] = useState<CatOption>("todas");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = normalize(q);
    return recipes.filter((r) => {
      const okCat = cat === "todas" ? true : r.category === cat;
      if (!okCat) return false;
      if (!query) return true;
      const hay = normalize(`${r.title} ${r.description} ${r.tags.join(" ")}`);
      return hay.includes(query);
    });
  }, [cat, q]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Receitas</h1>
        <p className="muted">
          Ideias rápidas com foco em praticidade — com estimativa de calorias e proteína.
        </p>
      </div>

      <ShoppingListCard />

      <div className="card space-y-4">
        <div className="grid gap-3 md:grid-cols-[220px_1fr_120px] md:items-end">
          <div>
            <p className="label mb-1">Categoria</p>
            <select
              className="input"
              value={cat}
              onChange={(e) => {
                const v = e.target.value;
                setCat(isCatOption(v) ? v : "todas");
              }}
            >
              <option value="todas">Todas</option>
              <option value="cafe">Café da manhã</option>
              <option value="almoco">Almoço</option>
              <option value="lanche">Lanche</option>
              <option value="jantar">Jantar</option>
            </select>
          </div>

          <div>
            <p className="label mb-1">Buscar</p>
            <input
              className="input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ex: proteico, pré-treino, doce..."
            />
          </div>

          <button
            className="btn"
            type="button"
            onClick={() => {
              setCat("todas");
              setQ("");
            }}
          >
            Limpar
          </button>
        </div>

        <p className="muted text-xs">
          Mostrando <b>{filtered.length}</b> receitas • Clique para ver o passo a passo.
        </p>
      </div>

      <Section title="Sugestões">
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((r) => (
            <Link
              key={r.slug}
              href={`/receitas/${r.slug}`}
              className="card overflow-hidden p-0 transition"
              style={{ cursor: "pointer" }}
            >
              <div className="relative h-44 w-full">
                <Image
                  src={r.cover}
                  alt={r.coverAlt || r.title}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Overlay (substitui bg-gradient-to-t...) */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.70), rgba(0,0,0,0.18), rgba(0,0,0,0.00))",
                  }}
                />

                {/* Badge categoria */}
                <div
                  className="absolute left-4 top-4 rounded-full px-2 py-1 text-xs backdrop-blur"
                  style={{
                    border: "1px solid rgba(var(--border), 0.35)",
                    background: "rgba(var(--panel), 0.35)",
                    color: "rgb(var(--text))",
                  }}
                >
                  {labels[r.category]}
                </div>
              </div>

              <div className="space-y-3 p-6">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{r.title}</p>
                  <p className="muted text-sm">{r.description}</p>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <KpiBox label="kcal" value={`${r.kcal}`} />
                  <KpiBox label="proteína" value={`${r.protein}g`} />
                  <KpiBox label="tempo" value={`${r.timeMin}m`} />
                  <KpiBox label="porções" value={`${r.servings}`} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {r.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2 py-1 text-xs"
                      style={{
                        border: "1px solid rgba(var(--border), 0.30)",
                        background: "rgba(var(--panel), 0.25)",
                        color: "rgb(var(--muted))",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-primary">Ver receita →</div>
              </div>
            </Link>
          ))}

          {filtered.length === 0 ? (
            <div className="card md:col-span-2">
              <p className="muted">Nenhuma receita encontrada. Tente outro filtro.</p>
            </div>
          ) : null}
        </div>
      </Section>
    </div>
  );
}

function KpiBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl p-3"
      style={{
        border: "1px solid rgba(var(--border), 0.30)",
        background: "rgba(var(--panel), 0.25)",
      }}
    >
      <p className="muted" style={{ fontSize: 10 }}>
        {label}
      </p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}