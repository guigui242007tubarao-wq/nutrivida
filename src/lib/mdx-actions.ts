"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deletePost,
  existsPost,
  readPost,
  renamePost,
  writePost,
} from "@/lib/mdx-store";

function parseTags(raw: string) {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function createMdxPost(_: any, formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const date = String(formData.get("date") || "").trim() || new Date().toISOString().slice(0, 10);
  const slug = String(formData.get("slug") || "").trim();
  const tags = parseTags(String(formData.get("tags") || ""));
  const content = String(formData.get("content") || "");

  if (!title || !slug) return "Preencha título e slug.";

  if (await existsPost(slug)) return "Já existe um post com esse slug.";

  await writePost(slug, { title, description, date, tags }, content);

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");

  redirect("/admin/posts");
}

export async function updateMdxPost(oldSlug: string, _: any, formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const date = String(formData.get("date") || "").trim() || "1970-01-01";
  const newSlug = String(formData.get("slug") || "").trim();
  const tags = parseTags(String(formData.get("tags") || ""));
  const content = String(formData.get("content") || "");

  if (!title || !newSlug) return "Preencha título e slug.";

  const current = await readPost(oldSlug);
  if (!current) return "Post não encontrado.";

  // Se mudou slug, checa conflito
  if (newSlug !== oldSlug && (await existsPost(newSlug))) {
    return "Já existe um post com esse novo slug.";
  }

  // salva conteúdo/meta
  await writePost(oldSlug, { title, description, date, tags }, content);

  // renomeia se slug mudou
  let finalSlug = oldSlug;
  if (newSlug !== oldSlug) {
    finalSlug = await renamePost(oldSlug, newSlug);
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${oldSlug}`);
  revalidatePath(`/blog/${finalSlug}`);
  revalidatePath("/admin/posts");

  redirect("/admin/posts");
}

export async function deleteMdxPost(slug: string) {
  await deletePost(slug);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
}
