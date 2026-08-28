import Link from "next/link";
import {
  Target,
  Sparkles,
  Calendar,
  Code2,
  CheckCircle2,
  TrendingUp,
  Zap,
  BookOpen,
  ArrowRight,
} from "lucide-react";

type PreparationEntry = {
  id: string | number;
  entry_date: string;
  topic: string;
  description?: string;
  problems_solved?: number;
};

async function getEntries() {
  try {
    const res = await fetch("http://127.0.0.1:8000/placements/preparation", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function PreparationPage() {
  const entries: PreparationEntry[] = await getEntries();

  const totalProblems = entries.reduce(
    (acc, entry) => acc + (entry.problems_solved || 0),
    0
  );

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F4FAF7] text-[#091e17] py-8 sm:py-12">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-orb-mint -top-32 -right-32 pointer-events-none" />
      <div className="absolute w-[550px] h-[550px] rounded-full bg-orb-green -bottom-36 -left-36 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero Banner */}
        <div className="brand-gradient rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-emerald-950/15 card-enter">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a6f2d1]/20 border border-[#a6f2d1]/30 text-[#a6f2d1] text-xs font-bold uppercase tracking-wider mb-3">
            <Target className="w-3.5 h-3.5" />
            Skill Mastery & Progress
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            My Placement Preparation Journey
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Track daily practice milestones, maintain your coding momentum, and prepare methodically for upcoming technical and interview rounds.
          </p>

          {/* Quick Metrics Strip */}
          <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                {entries.length}
              </p>
              <p className="text-xs text-white/75 font-medium flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3 text-[#a6f2d1]" /> Study Sessions
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#a6f2d1] tabular-nums">
                {totalProblems}
              </p>
              <p className="text-xs text-white/75 font-medium flex items-center gap-1 mt-0.5">
                <Code2 className="w-3 h-3 text-[#a6f2d1]" /> Problems Solved
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-2xl sm:text-3xl font-black text-white">Active</p>
              <p className="text-xs text-white/75 font-medium flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3 text-[#a6f2d1]" /> Consistency Track
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#091e17] uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#059669]" />
              Activity Log & Milestones
            </h2>
            <span className="text-xs font-semibold text-[#647b72]">
              {entries.length} recorded {entries.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-[#065f46]/20">
              <Target className="w-12 h-12 text-[#647b72]/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#091e17]">No preparation logs yet</h3>
              <p className="text-sm text-[#42584f] mt-1 max-w-sm mx-auto">
                Log your daily coding milestones and topics to visualize your placement preparation timeline.
              </p>
            </div>
          ) : (
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#065f46]/20">
              {entries.map((entry: PreparationEntry, index: number) => (
                <div
                  key={entry.id}
                  className="relative glass-card glass-card-hover rounded-3xl p-6 border-[#065f46]/15 hover:border-[#065f46]/40 transition-all card-enter"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-6 sm:-left-8 top-7 -translate-x-1/2 w-4 h-4 rounded-full bg-[#065f46] border-4 border-[#F4FAF7] shadow-sm" />

                  {/* Header: Date + Topic */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#a6f2d1]/40 text-[#065f46] border border-[#065f46]/15 self-start">
                      <Calendar className="w-3.5 h-3.5" />
                      {entry.entry_date}
                    </span>

                    {entry.problems_solved != null && entry.problems_solved > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl">
                        <Code2 className="w-3.5 h-3.5 text-emerald-700" />
                        {entry.problems_solved} {entry.problems_solved === 1 ? "problem" : "problems"} solved
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#091e17] mt-1">
                    {entry.topic}
                  </h3>

                  {entry.description && (
                    <p className="text-sm text-[#42584f] leading-relaxed mt-2 bg-white/60 p-3.5 rounded-2xl border border-[#065f46]/10">
                      {entry.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}