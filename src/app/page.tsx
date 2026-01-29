import Link from "next/link";
import Section from "@/components/Section";
import StatCard from "@/components/StatCard";
import { getAllPostsMeta } from "@/lib/posts";
import SavedGoalCard from "@/components/SavedGoalCard";

function GoalCard({
  title,
  desc,
  href,
  badge,
}: {
  title: string;
  desc: string;
  href: string;
  badge: string;
}) {
  return (
    <Link href={href} className="card transition hover:bg-zinc-900/60">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">{title}</p>
        <span className="rounded-full border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs text-zinc-300">
          {badge}
        </span>
      </div>
      <p className="muted mt-2 text-sm">{desc}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm text-yellow-200">
        Ver plano <span aria-hidden>→</span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const posts = getAllPostsMeta();
  const recent = posts.slice(0, 3);

  // “Prova social” simples (pode virar dinâmico depois)
  const stats = {
    artigos: posts.length,
    receitas: 3, // depois a gente liga no data/receitas
    treinos: 2,  // depois a gente liga no data/treinos
  };

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="card overflow-hidden">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-200">
              🧠 Bem-estar + performance
            </p>

            <h1 className="h1">
              Nutrição, treinos e hábitos para você evoluir de verdade.
            </h1>

            <p className="muted max-w-2xl">
              Um hub prático para rotina: calculadoras (IMC/TMB/TDEE), receitas rápidas,
              planos de treino e guias de alimentação sem complicação.
            </p>

            {/* CTA duplo */}
            <div className="flex flex-wrap gap-3">
              <Link href="/calculadoras" className="btn btn-primary">
                Usar calculadoras
              </Link>
              <Link href="#plano" className="btn">
                Ver plano de rotina
              </Link>
            </div>

            {/* “confiança” */}
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              <span className="rounded-full border border-zinc-800 bg-zinc-950/40 px-3 py-1">
                ✅ Conteúdo direto
              </span>
              <span className="rounded-full border border-zinc-800 bg-zinc-950/40 px-3 py-1">
                ✅ Rotina realista
              </span>
              <span className="rounded-full border border-zinc-800 bg-zinc-950/40 px-3 py-1">
                ✅ Sem terrorismo nutricional
              </span>
            </div>
          </div>

          {/* bloco lateral */}
          <div className="grid w-full gap-3 md:max-w-sm">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <p className="text-sm font-semibold">Sugestão rápida</p>
              <p className="muted mt-1 text-sm">
                Comece pelo básico: água, proteína em todas as refeições, sono e treino consistente.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <p className="text-sm font-semibold">Meta semanal</p>
              <p className="muted mt-1 text-sm">
                3 treinos + 2 caminhadas + 1 receita nova. Pequeno, mas constante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL / KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Artigos" value={`+${stats.artigos}`} hint="guias e posts no blog" />
        <StatCard title="Receitas" value={`+${stats.receitas}`} hint="práticas pra rotina" />
        <StatCard title="Treinos" value={`+${stats.treinos}`} hint="planos simples" />
        <StatCard title="Ferramentas" value="Calculadoras" hint="IMC / TMB / TDEE" />
      </div>

      {/* OBJETIVOS */}
      <Section
        title="Escolha seu objetivo"
        subtitle="Três caminhos claros (depois a gente aprofunda cada um)."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <GoalCard
            title="Perder gordura"
            badge="Cut"
            href="/calculadoras"
            desc="Defina um déficit leve, aumente proteína, foco em consistência e passos diários."
          />
          <GoalCard
            title="Manter saúde"
            badge="Manter"
            href="/calculadoras"
            desc="Ajuste manutenção (TDEE), rotina de treino 3x/sem e refeições equilibradas."
          />
          <GoalCard
            title="Ganhar massa"
            badge="Bulk"
            href="/calculadoras"
            desc="Superávit leve, progressão de cargas e sono forte. Simples e eficiente."
          />
        </div>
      </Section>

      {/* PLANO DE ROTINA */}
      <section id="plano" className="card space-y-4">
        <div className="space-y-1">
          <h2 className="h2">Plano de rotina (comece por aqui)</h2>
          <p className="muted">
            Um passo a passo básico que funciona pra maioria das pessoas.
          </p>
        </div>

        <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-200">
          <li>
            Calcule sua manutenção em <b>Calculadoras</b> (TMB + atividade = TDEE).
          </li>
          <li>
            Defina objetivo: déficit leve (perder), manutenção (manter) ou superávit leve (ganhar).
          </li>
          <li>
            Monte refeições com proteína + fibra + carbo bom + gordura boa (sem perfeccionismo).
          </li>
          <li>
            Treine o básico e evolua cargas gradualmente (3x/sem já muda jogo).
          </li>
          <li>
            Durma 7–9h e mantenha consistência por semanas.
          </li>
        </ol>

        <div className="flex flex-wrap gap-3">
          <Link href="/calculadoras" className="btn btn-primary">
            Calcular minha meta
          </Link>
          <Link href="/treinos" className="btn">
            Ver treinos
          </Link>
          <Link href="/receitas" className="btn">
            Ver receitas
          </Link>
        </div>
      </section>

      {/* CONTEÚDOS RECENTES */}
      <Section
        title="Conteúdos recentes"
        subtitle="Os últimos posts publicados no blog."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {recent.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card transition hover:bg-zinc-900/60"
            >
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="muted mt-2 text-sm">{p.description}</p>

              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>{new Date(p.date).toLocaleDateString("pt-BR")}</span>
                <span className="text-yellow-200">Ler →</span>
              </div>
            </Link>
          ))}

          {recent.length === 0 ? (
            <div className="card md:col-span-3">
              <p className="muted">
                Nenhum post ainda. Crie posts em <b>Admin → Posts</b> para aparecer aqui.
              </p>
            </div>
          ) : null}
        </div>

        <div>
          <Link href="/blog" className="btn">
            Ver todos os posts
          </Link>
        </div>
      </Section>
    </div>
  );
}
