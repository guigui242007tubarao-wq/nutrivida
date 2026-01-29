import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  featured?: boolean;

  // banner/capa
  cover?: string;    // ex: "/covers/prato.jpg"
  coverAlt?: string; // texto alternativo
};

export type Post = PostMeta & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function slugify(s: string) {
  return normalize(s)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseFrontmatter(raw: string): { meta: Partial<PostMeta>; content: string } {
  if (!raw.startsWith("---")) return { meta: {}, content: raw };

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, content: raw };

  const fm = raw.slice(3, end).trim();
  const content = raw.slice(end + "\n---".length).trimStart();

  const meta: Partial<PostMeta> = {};
  const lines = fm.split("\n").map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    const i = line.indexOf(":");
    if (i === -1) continue;

    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim();

    if (key === "title") meta.title = value.replace(/^["']|["']$/g, "");
    if (key === "description") meta.description = value.replace(/^["']|["']$/g, "");
    if (key === "date") meta.date = value.replace(/^["']|["']$/g, "");

    if (key === "tags") {
      const cleaned = value.replace(/^\[|\]$/g, "").trim();
      const parts = cleaned
        .split(",")
        .map((t) => t.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      meta.tags = parts;
    }

    // ✅ featured
    if (key === "featured") {
      meta.featured = value.replace(/^["']|["']$/g, "") === "true";
    }

    // ✅ capa/banner
    if (key === "cover") meta.cover = value.replace(/^["']|["']$/g, "");
    if (key === "coverAlt") meta.coverAlt = value.replace(/^["']|["']$/g, "");
  }

  return { meta, content };
}

export function getAllPostsMeta(): PostMeta[] {
  try {
    if (!fs.existsSync(POSTS_DIR)) return [];
    const stat = fs.statSync(POSTS_DIR);
    if (!stat.isDirectory()) return [];

    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

    const metas: PostMeta[] = files.map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { meta } = parseFrontmatter(raw);

      return {
        slug,
        title: meta.title ?? slug,
        description: meta.description ?? "",
        date: meta.date ?? "1970-01-01",
        tags: meta.tags ?? [],
        featured: meta.featured ?? false,
        cover: meta.cover ?? "",
        coverAlt: meta.coverAlt ?? "",
      };
    });

    return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const file = path.join(POSTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(file)) return null;

    const raw = fs.readFileSync(file, "utf8");
    const { meta, content } = parseFrontmatter(raw);

    return {
      slug,
      title: meta.title ?? slug,
      description: meta.description ?? "",
      date: meta.date ?? "1970-01-01",
      tags: meta.tags ?? [],
      featured: meta.featured ?? false,
      cover: meta.cover ?? "",
      coverAlt: meta.coverAlt ?? "",
      content,
    };
  } catch {
    return null;
  }
}

export function readingTimeMinutes(content: string) {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_\-\[\]\(\)!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
}

export type TocItem = { id: string; text: string; level: 2 | 3 };

export function getToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  const re = /^(##|###)\s+(.+)$/gm;

  let m: RegExpExecArray | null;
  while ((m = re.exec(content))) {
    const level = m[1] === "##" ? 2 : 3;
    const text = m[2].trim();
    items.push({ id: slugify(text), text, level });
  }

  return items;
}

export function getRelatedPosts(current: PostMeta, all: PostMeta[], limit = 3) {
  const curTags = new Set(current.tags ?? []);
  return all
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      let score = 0;
      for (const t of p.tags ?? []) if (curTags.has(t)) score++;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => (b.score - a.score) || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.p);
}
