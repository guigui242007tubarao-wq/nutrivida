export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function round(n: number, digits = 0) {
  const p = Math.pow(10, digits);
  return Math.round(n * p) / p;
}
