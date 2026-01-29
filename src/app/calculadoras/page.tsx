"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";
import { clamp, round } from "@/lib/utils";

type Sexo = "masculino" | "feminino";
type NivelAtividade = "sedentario" | "leve" | "moderado" | "alto" | "muito_alto";
type Objetivo = "manter" | "perder" | "ganhar";

const atividadeFactor: Record<NivelAtividade, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  alto: 1.725,
  muito_alto: 1.9,
};

// Mifflin-St Jeor
function calcTMB(sexo: Sexo, pesoKg: number, alturaCm: number, idade: number) {
  const base = 10 * pesoKg + 6.25 * alturaCm - 5 * idade;
  return sexo === "masculino" ? base + 5 : base - 161;
}

function calcIMC(pesoKg: number, alturaCm: number) {
  const h = alturaCm / 100;
  return pesoKg / (h * h);
}

function classificarIMC(imc: number) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade I";
  if (imc < 40) return "Obesidade II";
  return "Obesidade III";
}

export default function CalculadorasPage() {
  const [sexo, setSexo] = useState<Sexo>("masculino");
  const [peso, setPeso] = useState(75);
  const [altura, setAltura] = useState(175);
  const [idade, setIdade] = useState(22);
  const [atividade, setAtividade] = useState<NivelAtividade>("moderado");
  const [objetivo, setObjetivo] = useState<Objetivo>("manter");

  const safe = useMemo(() => {
    const pesoOk = clamp(Number(peso) || 0, 30, 250);
    const alturaOk = clamp(Number(altura) || 0, 120, 220);
    const idadeOk = clamp(Number(idade) || 0, 12, 90);
    return { pesoOk, alturaOk, idadeOk };
  }, [peso, altura, idade]);

  const resultados = useMemo(() => {
    const imc = calcIMC(safe.pesoOk, safe.alturaOk);
    const tmb = calcTMB(sexo, safe.pesoOk, safe.alturaOk, safe.idadeOk);
    const tdee = tmb * atividadeFactor[atividade];

    const meta =
      objetivo === "perder"
        ? tdee - 400
        : objetivo === "ganhar"
        ? tdee + 250
        : tdee;

    // sugestão simples de proteína (1.6 a 2.2 g/kg)
    const protMin = safe.pesoOk * 1.6;
    const protMax = safe.pesoOk * 2.2;

    return {
      imc: round(imc, 1),
      imcLabel: classificarIMC(imc),
      tmb: Math.round(tmb),
      tdee: Math.round(tdee),
      meta: Math.round(meta),
      protMin: Math.round(protMin),
      protMax: Math.round(protMax),
    };
  }, [safe, sexo, atividade, objetivo]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="h1">Calculadoras</h1>
        <p className="muted">
          Use como referência. Ajuste com o tempo conforme seu peso e desempenho evoluem.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
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
              <input
                className="input"
                type="number"
                value={altura}
                onChange={(e) => setAltura(Number(e.target.value))}
              />
            </div>

            <div className="space-y-1">
              <p className="label">Idade</p>
              <input
                className="input"
                type="number"
                value={idade}
                onChange={(e) => setIdade(Number(e.target.value))}
              />
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

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
            <p className="text-sm font-semibold">Dica</p>
            <p className="muted mt-1 text-sm">
              Ajuste sua meta a cada 2–3 semanas. Se o peso não muda, altere ~150–250 kcal e observe.
            </p>
          </div>
        </div>

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
                <p className="text-sm font-medium text-zinc-200">Gasto diário (TDEE)</p>
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
                  {resultados.protMin}–{resultados.protMax}g/dia
                </p>
                <p className="muted mt-2 text-sm">Faixa comum: 1.6–2.2 g/kg</p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
