import Section from "@/components/Section";

const treinos = [
  {
    title: "Treino A (Full Body)",
    items: ["Agachamento 3x8", "Supino 3x8", "Remada 3x10", "Elevação lateral 3x12", "Abdômen 3x12"],
    tip: "Aumente 1–2 reps por semana ou um pouco de carga.",
  },
  {
    title: "Treino B (Full Body)",
    items: ["Levantamento terra 3x5", "Desenvolvimento 3x8", "Puxada 3x10", "Leg press 3x10", "Panturrilha 3x12"],
    tip: "Foque em técnica. Descanso 1–2 min (ou mais nos básicos).",
  },
];

export default function TreinosPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Treinos</h1>
        <p className="muted">Modelos simples para começar e evoluir com consistência.</p>
      </div>

      <Section title="Planos sugeridos">
        <div className="grid gap-4 md:grid-cols-2">
          {treinos.map((t) => (
            <div key={t.title} className="card">
              <p className="text-sm font-semibold">{t.title}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-200">
                {t.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <p className="muted mt-3 text-sm">{t.tip}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="card">
        <p className="text-sm font-semibold">Sugestão de rotina</p>
        <p className="muted mt-1 text-sm">
          3x na semana: A / descanso / B / descanso / A. Na semana seguinte: B / A / B.
        </p>
      </div>
    </div>
  );
}
