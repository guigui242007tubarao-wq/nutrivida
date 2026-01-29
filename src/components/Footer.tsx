import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-sm font-semibold">NutriVida</p>
          <p className="muted text-sm">
            Nutrição, exercícios e bem-estar com foco em rotina prática.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Links</p>
          <div className="flex flex-col gap-2 text-sm text-zinc-300">
            <Link className="hover:text-zinc-50" href="/blog">Blog</Link>
            <Link className="hover:text-zinc-50" href="/calculadoras">Calculadoras</Link>
            <Link className="hover:text-zinc-50" href="/receitas">Receitas</Link>
            <Link className="hover:text-zinc-50" href="/treinos">Treinos</Link>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Aviso</p>
          <p className="muted text-sm">
            Conteúdo educativo. Para recomendações personalizadas, procure um nutricionista/profissional de saúde.
          </p>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} NutriVida</p>
          <p>Feito com Next.js + TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
