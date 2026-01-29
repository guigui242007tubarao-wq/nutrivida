"use client";

import { useMemo, useState, useActionState } from "react";
import { slugify } from "@/lib/slugify";

type Props = {
  mode: "new" | "edit";
  initial?: {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    content: string;
  };
  action: (prevState: any, formData: FormData) => Promise<any>;
};

export default function AdminPostForm({ mode, initial, action }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [desc, setDesc] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [content, setContent] = useState(initial?.content ?? "");

  const [error, formAction, pending] = useActionState(action, undefined);

  const suggestSlug = useMemo(() => slugify(title), [title]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <p className="label">Título</p>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} name="title" required />
          <p className="muted text-xs">Sugestão de slug: <b>{suggestSlug || "-"}</b></p>
        </div>

        <div className="space-y-1">
          <p className="label">Slug</p>
          <input className="input" value={slug} onChange={(e) => setSlug(e.target.value)} name="slug" required />
          <p className="muted text-xs">Ex.: <b>meu-post-top</b> (sem espaços)</p>
        </div>

        <div className="space-y-1 md:col-span-2">
          <p className="label">Descrição</p>
          <input className="input" value={desc} onChange={(e) => setDesc(e.target.value)} name="description" />
        </div>

        <div className="space-y-1">
          <p className="label">Data</p>
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} name="date" />
        </div>

        <div className="space-y-1">
          <p className="label">Tags (separadas por vírgula)</p>
          <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} name="tags" />
        </div>

        <div className="space-y-1 md:col-span-2">
          <p className="label">Conteúdo (MDX)</p>
          <textarea
            className="input min-h-[260px] font-mono"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="content"
            placeholder={`## Meu post\n\nEscreva aqui...`}
          />
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {String(error)}
        </p>
      ) : null}

      <button className="btn btn-primary" disabled={pending} type="submit">
        {pending ? "Salvando..." : mode === "new" ? "Criar post" : "Salvar alterações"}
      </button>
    </form>
  );
}
