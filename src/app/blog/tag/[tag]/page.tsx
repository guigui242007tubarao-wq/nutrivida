import Link from "next/link";
import BlogExplorer from "@/components/BlogExplorer";
import { getAllPostsMeta, slugify } from "@/lib/posts";

export default function TagPage({ params }: { params: { tag: string } }) {
  const all = getAllPostsMeta();

  const tagName =
    all.flatMap((p) => p.tags ?? []).find((t) => slugify(t) === params.tag) ?? params.tag;

  const filtered = all.filter((p) => (p.tags ?? []).some((t) => slugify(t) === params.tag));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link href="/blog" className="text-sm text-yellow-200 hover:underline">
          ← Voltar para o blog
        </Link>
        <h1 className="h1">
          Tag: <span className="text-yellow-200">#{tagName}</span>
        </h1>
        <p className="muted">Todos os posts marcados com essa tag.</p>
      </div>

      <BlogExplorer posts={filtered} initialTag={tagName} />
    </div>
  );
}