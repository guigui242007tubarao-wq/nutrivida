import Link from "next/link";

const items = [
  { href: "/", label: "Início" },
  { href: "/calculadoras", label: "Calculadoras" },
  { href: "/receitas", label: "Receitas" },
  { href: "/treinos", label: "Treinos" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      {/* camada glass */}
      <div
        className="border-b backdrop-blur"
        style={{
          borderColor: "rgba(var(--border), 0.28)",
          background: "rgba(var(--bg0), 0.55)",
        }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
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
              <p className="muted text-xs">minimal • warm charcoal</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="rounded-xl px-3 py-2 text-sm transition"
                style={{
                  color: "rgb(var(--text))",
                }}
              >
                <span className="opacity-90 hover:opacity-100">{it.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/calculadoras" className="btn btn-primary">
              Definir meta
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="mx-auto w-full max-w-6xl px-4 pb-4 md:hidden">
          <div className="flex flex-wrap gap-2">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="rounded-xl px-3 py-2 text-xs"
                style={{
                  border: "1px solid rgba(var(--border), 0.30)",
                  background: "rgba(var(--panel), 0.30)",
                }}
              >
                {it.label}
              </Link>
            ))}
            <Link href="/calculadoras" className="btn btn-primary text-xs">
              Definir meta
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}