import Section from "@/components/Section";

const receitas = [
  {
    title: "Bowl proteico (rápido)",
    items: ["Arroz/mandioca", "Frango desfiado ou atum", "Feijão", "Salada + azeite"],
    tip: "Ótimo pós-treino. Ajuste o carbo conforme seu objetivo.",
  },
  {
    title: "Omelete completo",
    items: ["3 ovos", "Queijo (opcional)", "Tomate + cebola", "Aveia ou pão integral"],
    tip: "Prático e forte pra bater proteína do dia.",
  },
  {
    title: "Iogurte + frutas + granola",
    items: ["Iogurte natural", "Banana/morango", "Granola", "Mel (opcional)"],
    tip: "Lanche fácil. Use iogurte com boa proteína.",
  },
];

export default function ReceitasPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Receitas</h1>
        <p className="muted">Ideias simples para rotina, com foco em praticidade.</p>
      </div>

      <Section title="Sugestões">
        <div className="grid gap-4 md:grid-cols-2">
          {receitas.map((r) => (
            <div key={r.title} className="card">
              <p className="text-sm font-semibold">{r.title}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-200">
                {r.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <p className="muted mt-3 text-sm">{r.tip}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
