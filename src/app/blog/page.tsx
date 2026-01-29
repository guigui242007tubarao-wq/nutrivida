import BlogExplorer from "@/components/BlogExplorer";
import FeaturedBanner from "@/components/FeaturedBanner";
import NewsletterCard from "@/components/NewsletterCard";
import PopularPosts from "@/components/PopularPosts";
import { getAllPostsMeta } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPostsMeta();

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = sorted.filter((p) => !!p.featured);
  const featuredPick = (featured.length ? featured : sorted).slice(0, 2);

  const featuredSlugs = new Set(featuredPick.map((p) => p.slug));
  const rest = sorted.filter((p) => !featuredSlugs.has(p.slug));

  const popular = rest.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Blog</h1>
        <p className="muted">
          Conteúdo direto sobre nutrição, treino e bem-estar — com foco em rotina.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {featuredPick[0] ? <FeaturedBanner post={featuredPick[0]} label="Destaque" /> : null}
        {featuredPick[1] ? <FeaturedBanner post={featuredPick[1]} label="Em alta" /> : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <BlogExplorer posts={sorted} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          {popular.length ? <PopularPosts posts={popular} /> : null}
          <NewsletterCard />
        </aside>
      </div>
    </div>
  );
}