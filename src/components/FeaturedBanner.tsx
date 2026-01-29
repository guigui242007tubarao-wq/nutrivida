import Link from "next/link";
import Image from "next/image";

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  cover?: string;
  coverAlt?: string;
};

export default function FeaturedBanner({
  post,
  label = "Destaque",
}: {
  post: PostMeta;
  label?: string;
}) {
  const hasCover = !!post.cover;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card relative overflow-hidden p-0 transition hover:bg-zinc-900/60"
    >
      {hasCover ? (
        <div className="relative h-52 w-full md:h-64">
          <Image
            src={post.cover!}
            alt={post.coverAlt || post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/45 to-zinc-950/15" />
        </div>
      ) : (
        <div className="relative h-52 w-full md:h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-yellow-500/5 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="relative space-y-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-1 text-xs text-yellow-200">
            {label}
          </span>
          <span className="text-xs text-zinc-400">
            {new Date(post.date).toLocaleDateString("pt-BR")}
          </span>
        </div>

        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          {post.title}
        </h2>

        <p className="muted text-sm">{post.description}</p>

        <div className="flex flex-wrap gap-2">
          {(post.tags ?? []).slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-xs text-zinc-300"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="pt-1 text-sm text-yellow-200">Ler agora →</div>
      </div>
    </Link>
  );
}