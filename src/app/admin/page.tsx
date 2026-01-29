import Link from "next/link";
import { auth } from "@/auth";

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Painel Admin</h1>
        <p className="muted">
          Logado como: <b>{session?.user?.email}</b>{" "}
          {session?.user?.isAdmin ? "(admin)" : ""}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <p className="text-sm font-semibold">Posts</p>
          <p className="muted mt-2 text-sm">Gerencie seus posts MDX.</p>
          <Link className="btn btn-primary mt-3" href="/admin/posts">
            Gerenciar posts
          </Link>
        </div>

        <div className="card">
          <p className="text-sm font-semibold">Configurações</p>
          <p className="muted mt-2 text-sm">Branding, SEO, etc.</p>
        </div>
      </div>
    </div>
  );
}
