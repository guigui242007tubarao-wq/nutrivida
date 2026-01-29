import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function getPostPath(slug: string) {
  return path.join(POSTS_DIR, `${slug}.mdx`);
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = getPostPath(params.slug);
  if (!fs.existsSync(filePath)) return notFound();

  // Importa o MDX como módulo (Next compila)
  const Post = (await import(`../../../content/posts/${params.slug}.mdx`)).default;

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <Link href="/blog" className="text-sm text-yellow-200 hover:underline">
          ← Voltar para o blog
        </Link>
      </div>

      <div className="card prose prose-invert max-w-none">
        <MDXProvider>
          <Post />
        </MDXProvider>
      </div>

      <div className="card">
        <p className="text-sm font-semibold">Próximo passo</p>
        <p className="muted mt-1 text-sm">
          Quer algo prático? Use as calculadoras para definir uma meta.
        </p>
        <Link href="/calculadoras" className="btn btn-primary mt-3">
          Ir para calculadoras
        </Link>
      </div>
    </article>
  );
}
