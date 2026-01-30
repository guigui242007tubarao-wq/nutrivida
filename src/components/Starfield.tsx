export default function Starfield() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        /* ✅ IMPORTANTÍSSIMO: fundo 100% transparente */
        background: "transparent",
        /* estrelas = só pontos de luz (sem camada preta) */
        backgroundImage: `
          radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.55) 0, transparent 2px),
          radial-gradient(1px 1px at 28% 72%, rgba(255,255,255,0.40) 0, transparent 2px),
          radial-gradient(1px 1px at 44% 32%, rgba(255,255,255,0.35) 0, transparent 2px),
          radial-gradient(1px 1px at 63% 22%, rgba(255,255,255,0.45) 0, transparent 2px),
          radial-gradient(1px 1px at 78% 64%, rgba(255,255,255,0.40) 0, transparent 2px),
          radial-gradient(1px 1px at 88% 36%, rgba(255,255,255,0.35) 0, transparent 2px)
        `,
        backgroundRepeat: "repeat",
        backgroundSize: "320px 320px",
        opacity: 0.55,
      }}
    />
  );
}