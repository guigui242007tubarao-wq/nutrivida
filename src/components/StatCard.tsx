export default function StatCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="card">
      <p className="text-sm font-medium text-zinc-200">{title}</p>
      <p className="kpi mt-2">{value}</p>
      {hint ? <p className="muted mt-2 text-sm">{hint}</p> : null}
    </div>
  );
}
