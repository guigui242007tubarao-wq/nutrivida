"use client";

export default function ContatoPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Mensagem enviada (demo) ✅");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="h1">Contato</h1>
        <p className="muted">
          Deixe uma sugestão de conteúdo ou melhorias para o site.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-4">
        <div className="space-y-1">
          <p className="label">Nome</p>
          <input className="input" name="nome" placeholder="Seu nome" />
        </div>

        <div className="space-y-1">
          <p className="label">Email</p>
          <input
            className="input"
            name="email"
            type="email"
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <div className="space-y-1">
          <p className="label">Mensagem</p>
          <textarea className="input min-h-32" placeholder="Escreva sua mensagem..." />
        </div>

        <button className="btn btn-primary w-fit" type="submit">
          Enviar (demo)
        </button>

        <p className="muted text-xs">
          *Esse formulário é apenas visual (demo). Depois eu te ajudo a conectar
          com email/DB.
        </p>
      </form>
    </div>
  );
}
