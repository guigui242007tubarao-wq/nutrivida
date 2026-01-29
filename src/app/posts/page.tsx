import Link from "next/link";
import { listPosts } from "@/lib/mdx-store";
import { deleteMdxPost } from "@/lib/mdx-actions";

export default async function AdminPostsPage() {
  const posts = await listPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="h1">Admin • Posts (MDX)</h1>
          <p className="muted">Gerencie os arquivos em <code>src/content/posts</code>.</p>
        </div>

        <Link className="btn btn-primary" href="/admin/posts/novo">
          + Novo post
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((p) => (
          <div key={p.slug} className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold">{p.meta.title}</p>
              <p className="muted text-sm">{p.meta.description}</p>
              <p className="text-xs text-zinc-500">
                <b>{p.slug}</b> • {p.meta.date} • {p.meta.tags.map((t) => `#${t}`).join(" ")}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link className="btn" href={`/admin/posts/${p.slug}`}>Editar</Link>
              <Link className="btn" href={`/blog/${p.slug}`}>Ver</Link>

              <form action={async () => { "use server"; await deleteMdxPost(p.slug); }}>
                <button className="btn" type="submit">Excluir</button>
              </form>
            </div>
          </div>
        ))}

        {posts.length === 0 ? (
          <div className="card">
            <p className="muted">Nenhum post ainda. Crie o primeiro em “Novo post”.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
