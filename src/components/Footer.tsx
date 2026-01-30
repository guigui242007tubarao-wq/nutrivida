import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-10 border-t"
      style={{ borderColor: "rgba(var(--border), 0.28)" }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  border: "1px solid rgba(var(--border), 0.30)",
                  background: "rgba(var(--panel), 0.35)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.03) inset",
                }}
                aria-hidden
              >
                🥗
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">NutriVida</p>
                <p className="muted text-xs">rotina prática</p>
              </div>
            </div>

            <p className="muted text-sm">
              Calculadoras, receitas e treinos — do básico bem feito ao progresso
              consistente.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Seções</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link className="muted hover:opacity-100 opacity-90" href="/calculadoras">
                Calculadoras
              </Link>
              <Link className="muted hover:opacity-100 opacity-90" href="/receitas">
                Receitas
              </Link>
              <Link className="muted hover:opacity-100 opacity-90" href="/treinos">
                Treinos
              </Link>
            </div>
          </div>

          {/* Aviso */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Aviso</p>
            <p className="muted text-sm">
              Conteúdo educativo. Para recomendações personalizadas, procure um
              nutricionista/profissional de saúde.
            </p>

            <div
              className="rounded-2xl p-4"
              style={{
                border: "1px solid rgba(var(--border), 0.28)",
                background: "rgba(var(--panel), 0.30)",
              }}
            >
              <p className="text-xs font-semibold">Dica rápida</p>
              <p className="muted mt-1 text-xs">
                Consistência por semanas vale mais que um dia perfeito.
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(var(--border), 0.28)" }}
        >
          <p className="muted">© {new Date().getFullYear()} NutriVida</p>
          <p className="muted">Warm Charcoal • Next.js + TypeScript</p>
        </div>
      </div>
    </footer>
  );
}