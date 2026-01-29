import Link from "next/link";

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export default function PopularPosts({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="card">
      <p className="text-sm font-semibold">Populares</p>
      <p className="muted mt-1 text-sm">
        Seleção rápida (por enquanto baseada nos mais recentes).
      </p>

      <div className="mt-4 grid gap-3">
        {posts.map((p, i) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/30 p-4 transition hover:bg-zinc-900/50"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">
                <span className="text-zinc-500">{i + 1}.</span> {p.title}
              </p>
              <span className="text-xs text-zinc-500">
                {new Date(p.date).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <p className="muted mt-2 text-sm">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}