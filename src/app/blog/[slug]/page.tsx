import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Section from "@/components/Section";
import {
  getAllPostsMeta,
  getPostBySlug,
  getRelatedPosts,
  getToc,
  readingTimeMinutes,
  slugify,
} from "@/lib/posts";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const all = getAllPostsMeta();
  const related = getRelatedPosts(post, all, 3);
  const toc = getToc(post.content);
  const minutes = readingTimeMinutes(post.content);

  return (
    <div className="space-y-6">
      <Link href="/blog" className="text-sm text-yellow-200 hover:underline">
        ← Voltar para o blog
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Conteúdo */}
        <article className="space-y-5">
          <header className="space-y-3">
            <h1 className="h1">{post.title}</h1>
            <p className="muted">{post.description}</p>

            <div className="flex flex-wrap items-center gap-2">
              {(post.tags ?? []).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs text-zinc-300"
                >
                  #{t}
                </span>
              ))}

              <span className="text-xs text-zinc-500">
                {new Date(post.date).toLocaleDateString("pt-BR")}
              </span>
              <span className="text-xs text-zinc-500">•</span>
              <span className="text-xs text-zinc-500">{minutes} min de leitura</span>
            </div>
          </header>

          <div className="card">
            <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => {
                    const text = String(children);
                    return <h2 id={slugify(text)}>{children}</h2>;
                  },
                  h3: ({ children }) => {
                    const text = String(children);
                    return <h3 id={slugify(text)}>{children}</h3>;
                  },
                  a: ({ children, href }) => (
                    <a href={href} className="text-yellow-200 hover:underline">
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="card">
            <p className="text-sm font-semibold">Próximo passo</p>
            <p className="muted mt-1 text-sm">
              Quer algo prático? Use as calculadoras pra definir sua meta de calorias e proteína.
            </p>
            <Link href="/calculadoras" className="btn btn-primary mt-3">
              Ir para calculadoras
            </Link>
          </div>
        </article>

        {/* Lateral */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          {toc.length > 0 ? (
            <div className="card">
              <p className="text-sm font-semibold">Sumário</p>
              <nav className="mt-3 space-y-2 text-sm">
                {toc.map((it) => (
                  <a
                    key={it.id}
                    href={`#${it.id}`}
                    className={`block hover:text-zinc-50 ${
                      it.level === 3 ? "pl-4 text-zinc-400" : "text-zinc-200"
                    }`}
                  >
                    {it.text}
                  </a>
                ))}
              </nav>
            </div>
          ) : null}

          {related.length > 0 ? (
            <Section title="Relacionados">
              <div className="grid gap-3">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="card hover:bg-zinc-900/60 transition">
                    <p className="text-sm font-semibold">{p.title}</p>
                    <p className="muted mt-1 text-sm">{p.description}</p>
                    <div className="mt-3 text-xs text-zinc-500">
                      {new Date(p.date).toLocaleDateString("pt-BR")}
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
