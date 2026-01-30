export type RecipeCategory = "cafe" | "almoco" | "lanche" | "jantar";

export type Recipe = {
  slug: string;
  title: string;
  description: string;
  category: RecipeCategory;

  timeMin: number;
  servings: number;
  kcal: number; // por porção
  protein: number; // por porção (g)

  tags: string[];

  // imagem
  cover: string; // ex: "/recipes/bowl.jpg"
  coverAlt?: string;

  ingredients: string[];
  steps: string[];
  tips?: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "bowl-proteico-rapido",
    title: "Bowl proteico (rápido)",
    description:
      "Refeição completa pós-treino: simples, alta em proteína e ajustável.",
    category: "almoco",
    timeMin: 15,
    servings: 1,
    kcal: 650,
    protein: 45,
    tags: ["pós-treino", "prático", "alto em proteína"],
    cover:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "Bowl com arroz, frango e salada",
    ingredients: [
      "150g frango desfiado (ou atum)",
      "120g arroz cozido (ou mandioca)",
      "1 concha de feijão",
      "Salada (folhas + tomate)",
      "1 fio de azeite",
      "Sal/limão a gosto",
    ],
    steps: [
      "Monte o arroz/mandioca como base.",
      "Adicione o frango (ou atum) e o feijão.",
      "Finalize com salada e azeite.",
      "Ajuste o carbo conforme o objetivo (corte: menos; ganho: mais).",
    ],
    tips: [
      "Se quiser mais proteína, adicione 1 ovo cozido ou iogurte proteico no lanche do dia.",
    ],
  },
  {
    slug: "omelete-completo",
    title: "Omelete completo",
    description:
      "Café ou jantar rápido pra bater proteína com poucos ingredientes.",
    category: "jantar",
    timeMin: 10,
    servings: 1,
    kcal: 520,
    protein: 35,
    tags: ["rápido", "baixo carbo", "proteico"],
    cover:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "Omelete com tomate e ervas",
    ingredients: [
      "3 ovos",
      "Tomate + cebola",
      "Queijo (opcional)",
      "Sal e pimenta",
      "1 fatia pão integral (opcional)",
    ],
    steps: [
      "Bata os ovos com sal e pimenta.",
      "Refogue tomate e cebola rapidamente.",
      "Despeje os ovos e cozinhe em fogo baixo.",
      "Finalize com queijo (opcional).",
    ],
    tips: ["Quer mais volume? Coloque espinafre ou cogumelos."],
  },
  {
    slug: "iogurte-frutas-granola",
    title: "Iogurte + frutas + granola",
    description: "Lanche simples com proteína e energia (ótimo pra pré-treino).",
    category: "lanche",
    timeMin: 5,
    servings: 1,
    kcal: 420,
    protein: 22,
    tags: ["pré-treino", "doce", "prático"],
    cover:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "Iogurte com frutas e granola",
    ingredients: [
      "170g iogurte natural",
      "1 banana (ou morango)",
      "30g granola",
      "Mel (opcional)",
    ],
    steps: [
      "Coloque o iogurte no bowl.",
      "Adicione frutas.",
      "Finalize com granola e mel (opcional).",
    ],
    tips: ["Use iogurte grego/light pra aumentar proteína."],
  },
  {
    slug: "panqueca-de-aveia-proteica",
    title: "Panqueca de aveia (proteica)",
    description: "Café da manhã top: fácil, sacia e ajuda na meta de proteína.",
    category: "cafe",
    timeMin: 12,
    servings: 1,
    kcal: 480,
    protein: 30,
    tags: ["café da manhã", "proteico", "fácil"],
    cover:
      "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "Panqueca de aveia com banana",
    ingredients: [
      "2 ovos",
      "40g aveia",
      "1 banana",
      "Canela",
      "1 colher (sopa) de iogurte (opcional)",
    ],
    steps: [
      "Bata ovos, aveia e banana (amasse ou bata no liquidificador).",
      "Cozinhe em frigideira antiaderente (2-3 min cada lado).",
      "Finalize com canela e iogurte (opcional).",
    ],
  },
];