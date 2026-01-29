import fs from "node:fs/promises";
import path from "node:path";

export type PostMeta = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
};

export type PostFile = {
  slug: string;
  meta: PostMeta;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function safeSlug(slug: string) {
  // evita ../ e coisas estranhas
  return slug.replace(/[^a-z0-9-]/g, "").toLowerCase();
}

function parseFrontmatter(raw: string): { meta: PostMeta; content: string } {
  const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*/);
  const fallback: PostMeta = {
    title: "Sem título",
    description: "",
    date: "1970-01-01",
    tags: [],
  };

  if (!match) return { meta: fallback, content: raw.trim() };

  const fm = match[1];
  const content = raw.slice(match[0].length).trim();

  const meta: any = {};
  for (const line of fm.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const [k, ...rest] = line.split(":");
    const key = k.trim();
    const valueRaw = rest.join(":").trim();

    if (key === "tags") {
      try {
        meta.tags = JSON.parse(valueRaw);
      } catch {
        meta.tags = [];
      }
    } else {
      meta[key] = valueRaw.replace(/^"|"$/g, "");
    }
  }

  return {
    meta: {
      title: meta.title ?? fallback.title,
      description: meta.description ?? fallback.description,
      date: meta.date ?? fallback.date,
      tags: Array.isArray(meta.tags) ? meta.tags : fallback.tags,
    },
    content,
  };
}

function toFrontmatter(meta: PostMeta) {
  const tagsJson = JSON.stringify(meta.tags ?? []);
  return `---
title: "${(meta.title ?? "").replaceAll(`"`, `'`)}"
description: "${(meta.description ?? "").replaceAll(`"`, `'`)}"
date: "${meta.date ?? "1970-01-01"}"
tags: ${tagsJson}
---

`;
}

export async function ensurePostsDir() {
  await fs.mkdir(POSTS_DIR, { recursive: true });
}

export async function listPosts(): Promise<{ slug: string; meta: PostMeta }[]> {
  await ensurePostsDir();
  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".mdx"));

  const items = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      const { meta } = parseFrontmatter(raw);
      return { slug, meta };
    })
  );

  return items.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export async function readPost(slug: string): Promise<PostFile | null> {
  await ensurePostsDir();
  const clean = safeSlug(slug);
  const filePath = path.join(POSTS_DIR, `${clean}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { meta, content } = parseFrontmatter(raw);
    return { slug: clean, meta, content };
  } catch {
    return null;
  }
}

export async function existsPost(slug: string) {
  const clean = safeSlug(slug);
  try {
    await fs.access(path.join(POSTS_DIR, `${clean}.mdx`));
    return true;
  } catch {
    return false;
  }
}

export async function writePost(slug: string, meta: PostMeta, content: string) {
  await ensurePostsDir();
  const clean = safeSlug(slug);
  const filePath = path.join(POSTS_DIR, `${clean}.mdx`);
  const raw = toFrontmatter(meta) + (content ?? "").trim() + "\n";
  await fs.writeFile(filePath, raw, "utf8");
  return clean;
}

export async function deletePost(slug: string) {
  const clean = safeSlug(slug);
  const filePath = path.join(POSTS_DIR, `${clean}.mdx`);
  await fs.unlink(filePath);
}

export async function renamePost(oldSlug: string, newSlug: string) {
  const oldClean = safeSlug(oldSlug);
  const newClean = safeSlug(newSlug);

  const oldPath = path.join(POSTS_DIR, `${oldClean}.mdx`);
  const newPath = path.join(POSTS_DIR, `${newClean}.mdx`);

  await fs.rename(oldPath, newPath);
  return newClean;
}
