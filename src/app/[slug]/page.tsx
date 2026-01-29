import { notFound } from "next/navigation";
import AdminPostForm from "@/components/AdminPostForm";
import { readPost } from "@/lib/mdx-store";
import { updateMdxPost } from "@/lib/mdx-actions";

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const post = await readPost(params.slug);
  if (!post) return notFound();

  const action = updateMdxPost.bind(null, post.slug);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Editar post</h1>
        <p className="muted">Slug atual: <b>{post.slug}</b></p>
      </div>

      <div className="card">
        <AdminPostForm
          mode="edit"
          action={action}
          initial={{
            slug: post.slug,
            title: post.meta.title,
            description: post.meta.description,
            date: post.meta.date,
            tags: post.meta.tags,
            content: post.content,
          }}
        />
      </div>
    </div>
  );
}
