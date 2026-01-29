export default function SobrePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Sobre</h1>
        <p className="muted">
          A NutriVida é um projeto para organizar conteúdo prático de nutrição, treino e hábitos — do básico ao avançado.
        </p>
      </div>

      <div className="card space-y-3 text-sm text-zinc-200 leading-relaxed">
        <p>
          A ideia é entregar um lugar simples pra você aprender e aplicar: calculadoras, guias, receitas e treinos
          fáceis de manter.
        </p>
        <p className="muted">
          Observação: conteúdo educativo. Para dieta/treino personalizados, procure profissionais qualificados.
        </p>
      </div>
    </div>
  );
}
