import Link from "next/link";

const quick = [
  { title: "Calculadoras", desc: "Meta diária (kcal + proteína)", href: "/calculadoras", icon: "📊" },
  { title: "Receitas", desc: "Práticas, com macros estimados", href: "/receitas", icon: "🥗" },
  { title: "Treinos", desc: "Simples e consistentes", href: "/treinos", icon: "🏋️" },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="card overflow-hidden">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <div className="pill w-fit">
              <span className="text-primary">●</span>
              <span className="muted">NutriVida 2.0</span>
              <span className="muted">•</span>
              <span className="muted">minimalista premium</span>
            </div>

            <h1 className="h1">
              Um jeito simples de cuidar da saúde —{" "}
              <span className="text-primary">sem excesso</span>.
            </h1>

            <p className="muted max-w-2xl">
              Defina sua meta diária, escolha receitas fáceis e siga treinos consistentes.
              O básico bem feito por semanas muda tudo.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/calculadoras" className="btn btn-primary">
                Definir minha meta
              </Link>
              <Link href="/receitas" className="btn">
                Ver receitas
              </Link>
              <Link href="/treinos" className="btn">
                Ver treinos
              </Link>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              <Mini label="Meta" value="kcal + proteína" />
              <Mini label="Rotina" value="prática e repetível" />
              <Mini label="Foco" value="constância" />
            </div>
          </div>

          <div className="grid w-full gap-3 md:max-w-sm">
            <Tip title="Comece em 60s">
              Abra as calculadoras, gere a meta e ajuste com o tempo.
            </Tip>
            <Tip title="Regra 80/20">
              Sono + proteína + treino. O resto é detalhe.
            </Tip>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="space-y-3">
        <div className="space-y-1">
          <h2 className="h2">Ferramentas</h2>
          <p className="muted text-sm">Acesso rápido ao que você mais usa.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quick.map((it) => (
            <Link key={it.href} href={it.href} className="card group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">
                    <span className="mr-2">{it.icon}</span>
                    {it.title}
                  </p>
                  <p className="muted mt-1 text-sm">{it.desc}</p>
                </div>
                <span className="muted text-sm transition group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold">Pronto pra começar?</p>
            <p className="muted mt-1 text-sm">
              Defina sua meta diária agora e use o site como guia.
            </p>
          </div>
          <Link href="/calculadoras" className="btn btn-primary">
            Ir para calculadoras
          </Link>
        </div>
      </section>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        border: "1px solid rgba(var(--border), 0.28)",
        background: "rgba(var(--panel), 0.18)",
      }}
    >
      <p className="muted text-xs">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Tip({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        border: "1px solid rgba(var(--border), 0.28)",
        background: "rgba(var(--panel), 0.18)",
      }}
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className="muted mt-1 text-sm">{children}</p>
    </div>
  );
}
