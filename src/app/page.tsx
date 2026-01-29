import Link from "next/link";
import Section from "@/components/Section";
import StatCard from "@/components/StatCard";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="card overflow-hidden">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-200">
              🧠 Bem-estar + performance
            </p>
            <h1 className="h1">
              Nutrição, treinos e hábitos para você evoluir de verdade.
            </h1>
            <p className="muted max-w-2xl">
              Artigos simples, receitas práticas e calculadoras (IMC/TMB/calorias) para te ajudar na rotina —
              seja para academia, saúde ou qualidade de vida.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/calculadoras" className="btn btn-primary">
                Usar calculadoras
              </Link>
              <Link href="/blog" className="btn">
                Ler o blog
              </Link>
            </div>
          </div>

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

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Calculadoras" value="IMC + TMB" hint="e meta de calorias diária" />
        <StatCard title="Conteúdo" value="Blog" hint="nutrição, hábitos e treino" />
        <StatCard title="Rotina" value="Praticidade" hint="receitas e treinos simples" />
      </div>

      {/* Seções */}
      <div className="grid gap-6 md:grid-cols-2">
        <Section
          title="O que você encontra aqui"
          subtitle="Um hub completo sobre saúde e performance."
        >
          <div className="grid gap-3">
            <div className="card">
              <p className="font-semibold">🥗 Nutrição</p>
              <p className="muted mt-1 text-sm">
                Guia de macronutrientes, montagem de prato, dicas para bulking/cutting.
              </p>
            </div>
            <div className="card">
              <p className="font-semibold">🏋️ Treinos</p>
              <p className="muted mt-1 text-sm">
                Treinos simples e progressão, consistência, volume, descanso e técnica.
              </p>
            </div>
            <div className="card">
              <p className="font-semibold">🧠 Bem-estar</p>
              <p className="muted mt-1 text-sm">
                Sono, estresse, rotina, hábitos e motivação sem complicação.
              </p>
            </div>
          </div>
        </Section>

        <Section
          title="Comece por aqui"
          subtitle="Uma trilha básica (sem terrorismo nutricional)."
        >
          <div className="card space-y-3">
            <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-200">
              <li>Calcule sua manutenção (TMB + atividade) em <b>Calculadoras</b>.</li>
              <li>Defina objetivo: manter, ganhar massa ou perder gordura.</li>
              <li>Monte refeições com proteína + fibra + carbo bom + gorduras.</li>
              <li>Treine o básico e evolua cargas gradualmente.</li>
              <li>Durma 7–9h e mantenha consistência.</li>
            </ol>
            <div className="flex gap-3">
              <Link href="/calculadoras" className="btn btn-primary">Ir para calculadoras</Link>
              <Link href="/receitas" className="btn">Ver receitas</Link>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
