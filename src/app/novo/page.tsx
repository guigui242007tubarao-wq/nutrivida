import AdminPostForm from "@/components/AdminPostForm";
import { createMdxPost } from "@/lib/mdx-actions";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Novo post</h1>
        <p className="muted">Vai criar um arquivo .mdx automaticamente.</p>
      </div>

      <div className="card">
        <AdminPostForm mode="new" action={createMdxPost} />
      </div>
    </div>
  );
}
