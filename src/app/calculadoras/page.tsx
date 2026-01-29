"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";
import {
  Sexo,
  NivelAtividade,
  Objetivo,
  clamp,
  round,
  calcIMC,
  classificarIMC,
  calcTMB,
  calcTDEE,
  calcMetaCalorias,
  calcProteina,
  calcAguaLitros,
} from "@/lib/calculations";

type SavedGoal = {
  savedAt: string;
  sexo: Sexo;
  peso: number;
  altura: number;
  idade: number;
  atividade: NivelAtividade;
  objetivo: Objetivo;
  tmb: number;
  tdee: number;
  meta: number;
  protMin: number;
  protMax: number;
  aguaL?: number;
};

const LS_KEY = "nutrivida:goal";

export default function CalculadorasPage() {
  const [sexo, setSexo] = useState<Sexo>("masculino");
  const [peso, setPeso] = useState(75);
  const [altura, setAltura] = useState(175);
  const [idade, setIdade] = useState(22);
  const [atividade, setAtividade] = useState<NivelAtividade>("moderado");
  const [objetivo, setObjetivo] = useState<Objetivo>("manter");
  const [mostrarAgua, setMostrarAgua] = useState(true);

  const safe = useMemo(() => {
    const pesoOk = clamp(Number(peso) || 0, 30, 250);
    const alturaOk = clamp(Number(altura) || 0, 120, 220);
    const idadeOk = clamp(Number(idade) || 0, 12, 90);
    return { pesoOk, alturaOk, idadeOk };
  }, [peso, altura, idade]);

  const resultados = useMemo(() => {
    const imc = calcIMC(safe.pesoOk, safe.alturaOk);
    const tmb = calcTMB(sexo, safe.pesoOk, safe.alturaOk, safe.idadeOk);
    const tdee = calcTDEE(tmb, atividade);
    const meta = calcMetaCalorias(tdee, objetivo);

    const prot = calcProteina(safe.pesoOk);
    const aguaL = calcAguaLitros(safe.pesoOk);

    return {
      imc: round(imc, 1),
      imcLabel: classificarIMC(imc),
      tmb: Math.round(tmb),
      tdee: Math.round(tdee),
      meta: Math.round(meta),
      protMin: Math.round(prot.min),
      protMax: Math.round(prot.max),
      aguaL: round(aguaL, 1),
    };
  }, [safe, sexo, atividade, objetivo]);

  function salvarMeta() {
    const payload: SavedGoal = {
      savedAt: new Date().toISOString(),
      sexo,
      peso: safe.pesoOk,
      altura: safe.alturaOk,
      idade: safe.idadeOk,
      atividade,
      objetivo,
      tmb: resultados.tmb,
      tdee: resultados.tdee,
      meta: resultados.meta,
      protMin: resultados.protMin,
      protMax: resultados.protMax,
      aguaL: mostrarAgua ? resultados.aguaL : undefined,
    };

    localStorage.setItem(LS_KEY, JSON.stringify(payload));
    alert("Meta salva ✅ (aparece na Home)");
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="h1">Calculadoras</h1>
        <p className="muted">
          Use como referência. Ajuste a cada 2–3 semanas conforme peso e desempenho.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
        {/* Form */}
        <div className="card space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="label">Sexo</p>
              <select className="input" value={sexo} onChange={(e) => setSexo(e.target.value as Sexo)}>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>

            <div className="space-y-1">
              <p className="label">Nível de atividade</p>
              <select
                className="input"
                value={atividade}
                onChange={(e) => setAtividade(e.target.value as NivelAtividade)}
              >
                <option value="sedentario">Sedentário</option>
                <option value="leve">Leve (1–3x/sem)</option>
                <option value="moderado">Moderado (3–5x/sem)</option>
                <option value="alto">Alto (6x/sem)</option>
                <option value="muito_alto">Muito alto (trabalho físico)</option>
              </select>
            </div>

            <div className="space-y-1">
              <p className="label">Peso (kg)</p>
              <input className="input" type="number" value={peso} onChange={(e) => setPeso(Number(e.target.value))} />
            </div>

            <div className="space-y-1">
              <p className="label">Altura (cm)</p>
              <input className="input" type="number" value={altura} onChange={(e) => setAltura(Number(e.target.value))} />
            </div>

            <div className="space-y-1">
              <p className="label">Idade</p>
              <input className="input" type="number" value={idade} onChange={(e) => setIdade(Number(e.target.value))} />
            </div>

            <div className="space-y-1">
              <p className="label">Objetivo</p>
              <select className="input" value={objetivo} onChange={(e) => setObjetivo(e.target.value as Objetivo)}>
                <option value="manter">Manter</option>
                <option value="perder">Perder gordura</option>
                <option value="ganhar">Ganhar massa</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-200">
            <input
              type="checkbox"
              checked={mostrarAgua}
              onChange={(e) => setMostrarAgua(e.target.checked)}
            />
            Mostrar sugestão de água/dia
          </label>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
            <p className="text-sm font-semibold">Dica</p>
            <p className="muted mt-1 text-sm">
              Se o peso não muda por 2–3 semanas, ajuste ~150–250 kcal e observe de novo.
            </p>
          </div>

          <button className="btn btn-primary w-fit" type="button" onClick={salvarMeta}>
            Salvar meta
          </button>

          <p className="muted text-xs">
            Salva no seu navegador (localStorage). Depois a gente conecta no painel admin/DB.
          </p>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <Section title="Resultados">
            <div className="grid gap-4">
              <div className="card">
                <p className="text-sm font-medium text-zinc-200">IMC</p>
                <p className="kpi mt-2">{resultados.imc}</p>
                <p className="muted mt-2 text-sm">{resultados.imcLabel}</p>
              </div>

              <div className="card">
                <p className="text-sm font-medium text-zinc-200">TMB (kcal/dia)</p>
                <p className="kpi mt-2">{resultados.tmb}</p>
                <p className="muted mt-2 text-sm">Estimativa em repouso</p>
              </div>

              <div className="card">
                <p className="text-sm font-medium text-zinc-200">TDEE (gasto total)</p>
                <p className="kpi mt-2">{resultados.tdee}</p>
                <p className="muted mt-2 text-sm">TMB × atividade</p>
              </div>

              <div className="card">
                <p className="text-sm font-medium text-zinc-200">Meta sugerida (kcal/dia)</p>
                <p className="kpi mt-2">{resultados.meta}</p>
                <p className="muted mt-2 text-sm">
                  {objetivo === "perder"
                    ? "Déficit leve (~-400 kcal)"
                    : objetivo === "ganhar"
                    ? "Superávit leve (~+250 kcal)"
                    : "Manutenção"}
                </p>
              </div>

              <div className="card">
                <p className="text-sm font-medium text-zinc-200">Proteína sugerida</p>
                <p className="kpi mt-2">
                  {resultados.protMin}–{resultados.protMax} g/dia
                </p>
                <p className="muted mt-2 text-sm">Faixa comum: 1.6–2.2 g/kg</p>
              </div>

              {mostrarAgua ? (
                <div className="card">
                  <p className="text-sm font-medium text-zinc-200">Água (estimativa)</p>
                  <p className="kpi mt-2">{resultados.aguaL} L/dia</p>
                  <p className="muted mt-2 text-sm">Regra simples: ~35ml/kg (ajuste pelo calor/treino)</p>
                </div>
              ) : null}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}