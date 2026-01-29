export type Sexo = "masculino" | "feminino";
export type NivelAtividade = "sedentario" | "leve" | "moderado" | "alto" | "muito_alto";
export type Objetivo = "manter" | "perder" | "ganhar";

export const atividadeFactor: Record<NivelAtividade, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  alto: 1.725,
  muito_alto: 1.9,
};

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function round(n: number, digits = 0) {
  const p = Math.pow(10, digits);
  return Math.round(n * p) / p;
}

// Mifflin-St Jeor
export function calcTMB(sexo: Sexo, pesoKg: number, alturaCm: number, idade: number) {
  const base = 10 * pesoKg + 6.25 * alturaCm - 5 * idade;
  return sexo === "masculino" ? base + 5 : base - 161;
}

export function calcIMC(pesoKg: number, alturaCm: number) {
  const h = alturaCm / 100;
  return pesoKg / (h * h);
}

export function classificarIMC(imc: number) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade I";
  if (imc < 40) return "Obesidade II";
  return "Obesidade III";
}

export function calcTDEE(tmb: number, atividade: NivelAtividade) {
  return tmb * atividadeFactor[atividade];
}

// regra simples para meta de calorias
export function calcMetaCalorias(tdee: number, objetivo: Objetivo) {
  if (objetivo === "perder") return tdee - 400;
  if (objetivo === "ganhar") return tdee + 250;
  return tdee;
}

// proteína 1.6 a 2.2 g/kg
export function calcProteina(pesoKg: number) {
  return {
    min: pesoKg * 1.6,
    max: pesoKg * 2.2,
  };
}

// água/dia (opcional): 35 ml/kg (clamp 1.5 a 5.0 L)
export function calcAguaLitros(pesoKg: number) {
  const litros = (pesoKg * 35) / 1000;
  return clamp(litros, 1.5, 5.0);
}