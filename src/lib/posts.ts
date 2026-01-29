import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function parseFrontmatter(raw: string) {
  // Frontmatter simples (sem dependências):
  // ---
  // key: "value"
  // tags: ["a","b"]
  // ---
  const match = raw.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return { meta: null as any, content: raw };

  const fm = match[1];
  const content = raw.slice(match[0].length).trim();

  const lines = fm.split("\n").map((l) => l.trim()).filter(Boolean);

  const meta: any = {};
  for (const line of lines) {
    const [k, ...rest] = line.split(":");
    const key = k.trim();
    const valueRaw = rest.join(":").trim();

    if (key === "tags") {
      try {
        meta.tags = JSON.parse(valueRaw);
      } catch {
        meta.tags = [];
      }
      continue;
    }

    // remove aspas se tiver
    meta[key] = valueRaw.replace(/^"|"$/g, "");
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
        title: meta?.title ?? slug,
        description: meta?.description ?? "",
        date: meta?.date ?? "1970-01-01",
        tags: meta?.tags ?? [],
      };
    });

    return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return [];
  }
}
