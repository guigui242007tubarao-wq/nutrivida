import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/auth-actions";

const items = [
  { href: "/", label: "Início" },
  { href: "/blog", label: "Blog" },
  { href: "/calculadoras", label: "Calculadoras" },
  { href: "/receitas", label: "Receitas" },
  { href: "/treinos", label: "Treinos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default async function Navbar() {
  const session = await auth();
  const isAdmin = !!session?.user?.isAdmin;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40">
            🥗
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">NutriVida</p>
            <p className="text-xs text-zinc-400">saúde • treino • alimentação</p>
          </div>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden gap-1 md:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-xl px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900/60 hover:text-zinc-50"
            >
              {it.label}
            </Link>
          ))}

          {isAdmin ? (
            <Link
              href="/admin"
              className="rounded-xl px-3 py-2 text-sm text-yellow-200 hover:bg-zinc-900/60"
            >
              Admin
            </Link>
          ) : null}
        </nav>

        {/* Ações desktop */}
        <div className="hidden md:flex items-center gap-2">
          {!session ? (
            <Link href="/entrar" className="btn btn-primary">
              Entrar
            </Link>
          ) : (
            <form action={logout}>
              <button className="btn" type="submit">
                Sair
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-4 md:hidden">
        <div className="flex flex-wrap gap-2">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-xs text-zinc-200"
            >
              {it.label}
            </Link>
          ))}

          {isAdmin ? (
            <Link
              href="/admin"
              className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-200"
            >
              Admin
            </Link>
          ) : null}

          {!session ? (
            <Link
              href="/entrar"
              className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-200"
            >
              Entrar
            </Link>
          ) : (
            <form action={logout}>
              <button
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 px-3 py-2 text-xs text-zinc-200"
                type="submit"
              >
                Sair
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
