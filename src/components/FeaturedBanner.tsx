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
      className="card relative overflow-hidden p-0 transition"
      style={{ opacity: 0.98 }}
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

          {/* Overlay (no lugar do bg-gradient-to-t...) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.35), rgba(0,0,0,0.10))",
            }}
          />
        </div>
      ) : (
        <div className="relative h-52 w-full md:h-64">
          {/* Fundo premium sem classes de gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(16,14,12,1), rgba(30,26,22,1), rgba(16,14,12,1))",
            }}
          />

          {/* “Glows” suaves (sem yellow classes) */}
          <div
            className="absolute"
            style={{
              left: -120,
              top: -120,
              width: 320,
              height: 320,
              borderRadius: 9999,
              background: "rgba(74,124,89,0.12)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute"
            style={{
              right: -120,
              bottom: -120,
              width: 320,
              height: 320,
              borderRadius: 9999,
              background: "rgba(255,214,170,0.06)",
              filter: "blur(60px)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.12), transparent)",
            }}
          />
        </div>
      )}

      <div className="relative space-y-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <span
            className="rounded-full px-2 py-1 text-xs"
            style={{
              border: "1px solid rgba(var(--primary), 0.45)",
              background: "rgba(var(--primary), 0.18)",
              color: "rgb(var(--text))",
            }}
          >
            {label}
          </span>

          <span className="muted text-xs">
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
              className="rounded-full px-2 py-1 text-xs"
              style={{
                border: "1px solid rgba(var(--border), 0.35)",
                background: "rgba(var(--panel), 0.22)",
                color: "rgb(var(--muted))",
              }}
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="pt-1 text-sm" style={{ color: "rgb(var(--primary))" }}>
          Ler agora →
        </div>
      </div>
    </Link>
  );
}