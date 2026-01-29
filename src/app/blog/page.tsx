import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Blog</h1>
        <p className="muted">Posts em MDX (arquivos), bem fácil de manter.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="card transition hover:bg-zinc-900/60"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{p.title}</p>
              <span className="text-xs text-zinc-500">
                {new Date(p.date).toLocaleDateString("pt-BR")}
              </span>
            </div>

            <p className="muted mt-2 text-sm">{p.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs text-zinc-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
