export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string
  tags: string[];
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "como-montar-um-prato-equilibrado",
    title: "Como montar um prato equilibrado (sem frescura)",
    description:
      "Uma forma simples de distribuir proteína, carboidratos, fibras e gorduras em cada refeição.",
    date: "2026-01-10",
    tags: ["nutrição", "hábitos", "prático"],
    content: [
      "Um prato equilibrado não precisa ser perfeito — precisa ser repetível.",
      "Regra simples: metade do prato com vegetais (fibras e micronutrientes), 1/4 com proteína (frango, ovos, peixe, carne, tofu) e 1/4 com carboidrato (arroz, batata, massa, feijão).",
      "Complete com gorduras boas em pequenas quantidades (azeite, abacate, castanhas).",
      "Se treina pesado, ajuste o carbo; se está em corte, mantenha proteína alta e capriche nas fibras.",
    ],
  },
  {
    slug: "tmb-e-calorias-entenda-o-basico",
    title: "TMB e calorias: o básico para ganhar ou perder peso",
    description:
      "Entenda o que é Taxa Metabólica Basal, gasto diário e como definir meta de calorias.",
    date: "2026-01-12",
    tags: ["calorias", "tmb", "emagrecimento", "hipertrofia"],
    content: [
      "TMB é a energia mínima para seu corpo funcionar em repouso. Seu gasto total diário (TDEE) depende do nível de atividade.",
      "Para perder gordura: déficit leve (ex.: -300 a -500 kcal). Para ganhar massa: superávit leve (ex.: +200 a +400 kcal).",
      "Evite extremos. O que funciona é consistência por semanas, não um dia perfeito.",
    ],
  },
  {
    slug: "treino-consistente-bate-treino-perfeito",
    title: "Treino consistente vence treino perfeito",
    description:
      "O que mais muda o corpo é o que você consegue manter por meses: progressão simples e rotina.",
    date: "2026-01-15",
    tags: ["treino", "constância", "academia"],
    content: [
      "Escolha poucos exercícios básicos, registre cargas e repetições e evolua aos poucos.",
      "3x por semana bem feito é melhor do que 6x por semana por duas semanas e depois parar.",
      "Durma bem e coma o suficiente: treino é estímulo, evolução é recuperação.",
    ],
  },
];
