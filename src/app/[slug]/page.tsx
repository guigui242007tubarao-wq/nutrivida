import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import AddToShoppingListButton from "@/components/AddToShoppingListButton";
import { recipes } from "@/data/recipes";

const label: Record<string, string> = {
  cafe: "Café da manhã",
  almoco: "Almoço",
  lanche: "Lanche",
  jantar: "Jantar",
};

export default function ReceitaPage({ params }: { params: { slug: string } }) {
  const r = recipes.find((x) => x.slug === params.slug);
  if (!r) return notFound();

  return (
    <div className="space-y-6">
      <Link href="/receitas" className="text-sm" style={{ color: "rgb(var(--primary))" }}>
        ← Voltar para receitas
      </Link>

      {/* Banner com imagem */}
      <div className="card overflow-hidden p-0">
        <div className="relative h-56 w-full md:h-72">
          <Image
            src={r.cover}
            alt={r.coverAlt || r.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />

          {/* Overlay (sem bg-gradient-to-t) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.28), rgba(0,0,0,0.05))",
            }}
          />

          {/* Badge categoria (sem zinc) */}
          <div
            className="absolute left-6 top-6 rounded-full px-3 py-1 text-xs backdrop-blur"
            style={{
              border: "1px solid rgba(var(--border), 0.35)",
              background: "rgba(var(--panel), 0.40)",
              color: "rgb(var(--text))",
            }}
          >
            {label[r.category]}
          </div>
        </div>

        <div className="space-y-3 p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {r.tags.map((t) => (
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

          <h1 className="h1">{r.title}</h1>
          <p className="muted">{r.description}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <AddToShoppingListButton ingredients={r.ingredients} title={r.title} />
            <Link href="/calculadoras" className="btn">
              Ajustar para meu objetivo
            </Link>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="kcal / porção" value={`${r.kcal}`} />
        <KpiCard label="proteína / porção" value={`${r.protein}g`} />
        <KpiCard label="tempo" value={`${r.timeMin} min`} />
        <KpiCard label="porções" value={`${r.servings}`} />
      </div>

      {/* Ingredientes + preparo */}
      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Ingredientes">
          <div className="card">
            <ul className="list-disc space-y-2 pl-5 text-sm" style={{ color: "rgb(var(--text))" }}>
              {r.ingredients.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title="Modo de preparo">
          <div className="card">
            <ol className="list-decimal space-y-2 pl-5 text-sm" style={{ color: "rgb(var(--text))" }}>
              {r.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </Section>
      </div>

      {r.tips?.length ? (
        <Section title="Dicas">
          <div className="card">
            <ul className="list-disc space-y-2 pl-5 text-sm" style={{ color: "rgb(var(--text))" }}>
              {r.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <p className="muted text-xs">{label}</p>
      <p className="kpi mt-2">{value}</p>
    </div>
  );
}