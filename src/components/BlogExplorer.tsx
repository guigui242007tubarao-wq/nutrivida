"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

function normalize(s: string) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function tagToSlug(tag: string) {
  return normalize(tag).replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

type SortMode = "recent" | "oldest" | "az";

export default function BlogExplorer({
  posts,
  initialTag = null,
}: {
  posts: PostMeta[];
  initialTag?: string | null;
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);
  const [sort, setSort] = useState<SortMode>("recent");

  const pageSize = 6;
  const [page, setPage] = useState(1);

  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of posts) for (const t of p.tags ?? []) map.set(t, (map.get(t) ?? 0) + 1);
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [posts]);

  const filteredSorted = useMemo(() => {
    const q = normalize(query);

    let list = posts.filter((p) => {
      const matchesTag = activeTag ? (p.tags ?? []).includes(activeTag) : true;
      if (!matchesTag) return false;
      if (!q) return true;
      const hay = normalize(`${p.title} ${p.description} ${(p.tags ?? []).join(" ")}`);
      return hay.includes(q);
    });

    if (sort === "recent") list = list.sort((a, b) => (a.date < b.date ? 1 : -1));
    if (sort === "oldest") list = list.sort((a, b) => (a.date > b.date ? 1 : -1));
    if (sort === "az") list = list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [posts, query, activeTag, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, currentPage]);

  function resetToFirstPage() {
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <div className="card space-y-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_120px] md:items-end">
          <div>
            <p className="label mb-1">Buscar</p>
            <input
              className="input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetToFirstPage();
              }}
              placeholder="Ex: proteína, tmb, cutting, sono..."
            />
          </div>

          <div>
            <p className="label mb-1">Ordenar</p>
            <select
              className="input"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortMode);
                resetToFirstPage();
              }}
            >
              <option value="recent">Mais recentes</option>
              <option value="oldest">Mais antigos</option>
              <option value="az">A–Z</option>
            </select>
          </div>

          <button
            type="button"
            className="btn"
            onClick={() => {
              setQuery("");
              setActiveTag(null);
              setSort("recent");
              setPage(1);
            }}
          >
            Limpar
          </button>
        </div>

        {tagCounts.length ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`rounded-full border px-3 py-1 text-xs transition ${
                !activeTag
                  ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
                  : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:bg-zinc-900/50"
              }`}
              onClick={() => {
                setActiveTag(null);
                resetToFirstPage();
              }}
            >
              Todas
            </button>

            {tagCounts.map(([t, count]) => {
              const on = activeTag === t;
              return (
                <button
                  key={t}
                  type="button"
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    on
                      ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
                      : "border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:bg-zinc-900/50"
                  }`}
                  onClick={() => {
                    setActiveTag(on ? null : t);
                    resetToFirstPage();
                  }}
                >
                  #{t} <span className="text-zinc-500">({count})</span>
                </button>
              );
            })}
          </div>
        ) : null}

        <p className="muted text-xs">
          Mostrando <b>{filteredSorted.length}</b> de <b>{posts.length}</b>
          {activeTag ? (
            <>
              {" "}
              • tag <b>#{activeTag}</b> •{" "}
              <Link className="text-yellow-200 hover:underline" href={`/blog/tag/${tagToSlug(activeTag)}`}>
                abrir página da tag →
              </Link>
            </>
          ) : null}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pageItems.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card transition hover:bg-zinc-900/60">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{p.title}</p>
              <span className="text-xs text-zinc-500">
                {new Date(p.date).toLocaleDateString("pt-BR")}
              </span>
            </div>

            <p className="muted mt-2 text-sm">{p.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {(p.tags ?? []).map((t) => (
                <Link
                  key={t}
                  href={`/blog/tag/${tagToSlug(t)}`}
                  className="rounded-full border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-900/50"
                  title="Abrir página da tag"
                >
                  #{t}
                </Link>
              ))}
            </div>

            <div className="mt-4 text-sm text-yellow-200">Ler →</div>
          </Link>
        ))}

        {filteredSorted.length === 0 ? (
          <div className="card md:col-span-2">
            <p className="muted">Nada encontrado. Tente outra palavra ou limpe os filtros.</p>
          </div>
        ) : null}
      </div>

      {filteredSorted.length > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="muted text-sm">
            Página <b>{currentPage}</b> de <b>{totalPages}</b>
          </p>

          <div className="flex gap-2">
            <button
              className="btn"
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Anterior
            </button>
            <button
              className="btn"
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Próxima →
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}