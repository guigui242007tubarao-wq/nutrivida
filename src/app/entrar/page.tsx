import LoginForm from "@/components/LoginForm";

export default function EntrarPage() {
  return (
    <div className="mx-auto max-w-md">
      <div className="space-y-2">
        <h1 className="h1">Entrar</h1>
        <p className="muted">Acesso ao painel admin.</p>
      </div>

      <div className="card mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
