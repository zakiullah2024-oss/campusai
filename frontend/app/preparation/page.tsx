async function getEntries() {
  const res = await fetch("http://127.0.0.1:8000/placements/preparation", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function PreparationPage() {
  const entries = await getEntries();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4FAF7] text-[#0D1C17] py-10">
      <div className="absolute w-96 h-96 rounded-full bg-orb-mint -top-20 -right-20" />
      <div className="absolute w-96 h-96 rounded-full bg-orb-green -bottom-20 -left-20" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#0D1C17] mb-2">My Preparation Journey</h1>
        <p className="text-[#4B5C55] mb-8">A timeline of your placement preparation.</p>

        <div className="brand-gradient rounded-[28px] p-6 text-white shadow-[0_24px_60px_rgba(6,95,70,0.18)] card-enter mb-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[#A6F2D1]">Preparation progress</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-3xl font-bold tabular-nums">{entries.length}</p>
              <p className="text-sm text-white/75">logged entries</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {entries.length === 0 && (
            <p className="text-[#4B5C55]">No entries yet. Start logging your preparation.</p>
          )}
          {entries.map((entry: any, index: number) => (
            <div
              key={entry.id}
              className="glass-card rounded-2xl p-5 card-enter"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <p className="text-xs text-[#4B5C55] uppercase font-semibold mb-1 tracking-[0.12em]">
                {entry.entry_date}
              </p>
              <h2 className="text-lg font-semibold text-[#0D1C17]">{entry.topic}</h2>
              {entry.description && (
                <p className="text-sm text-[#4B5C55] mt-1">{entry.description}</p>
              )}
              {entry.problems_solved != null && (
                <p className="text-sm text-[#065F46] font-medium mt-2">
                  {entry.problems_solved} problems solved
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}