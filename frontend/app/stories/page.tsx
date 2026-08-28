import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Building2,
  Clock,
  BookOpen,
  Quote,
  Code2,
  Award,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

type Story = {
  id: string | number;
  role: string;
  company_name: string;
  package: string;
  preparation_duration: string;
  topics_prepared?: string[];
  advice_for_juniors?: string;
};

async function getStories() {
  try {
    const res = await fetch("http://127.0.0.1:8000/placements/stories", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F4FAF7] text-[#091e17] py-8 sm:py-12">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-orb-mint -top-32 -right-32 pointer-events-none" />
      <div className="absolute w-[550px] h-[550px] rounded-full bg-orb-green -bottom-36 -left-36 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero Banner */}
        <div className="brand-gradient rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-emerald-950/15 card-enter">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a6f2d1]/20 border border-[#a6f2d1]/30 text-[#a6f2d1] text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            Senior Hall of Fame
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Placed Senior Stories & Interview Debriefs
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Gain invaluable wisdom from seniors who successfully cracked campus recruitment drives. Discover their study schedules, resources, and critical advice.
          </p>
        </div>

        {/* Stories Grid */}
        {stories.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-[#065f46]/20">
            <BookOpen className="w-12 h-12 text-[#647b72]/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#091e17]">No stories published yet</h3>
            <p className="text-sm text-[#42584f] mt-1 max-w-sm mx-auto">
              Check back soon for new interview debriefs from placed seniors.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {stories.map((story: Story, index: number) => (
              <div
                key={story.id}
                className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border-[#065f46]/15 hover:border-[#065f46]/40 transition-all flex flex-col justify-between card-enter group"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="space-y-4">
                  {/* Top Row: Company & Package */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                        {story.company_name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-[#091e17] group-hover:text-[#065f46] transition-colors">
                          {story.company_name}
                        </h2>
                        <p className="text-xs font-semibold text-[#059669]">
                          {story.role}
                        </p>
                      </div>
                    </div>

                    {story.package && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-[#a6f2d1]/50 text-[#065f46] border border-[#065f46]/20 shadow-sm flex-shrink-0">
                        <Award className="w-3.5 h-3.5 text-[#059669]" />
                        {story.package}
                      </span>
                    )}
                  </div>

                  {/* Preparation Duration Badge */}
                  <div className="flex items-center gap-2 text-xs text-[#42584f]">
                    <span className="inline-flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-lg border border-[#065f46]/10 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#059669]" />
                      Prep Duration: <strong>{story.preparation_duration}</strong>
                    </span>
                  </div>

                  {/* Topics Prepared Tags */}
                  {story.topics_prepared && story.topics_prepared.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-bold text-[#647b72] uppercase tracking-wider flex items-center gap-1">
                        <Code2 className="w-3 h-3 text-[#059669]" />
                        Core Topics Prepared
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {story.topics_prepared.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-[#e6faf1] text-[#065f46] border border-[#065f46]/10"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Advice for Juniors Quote Box */}
                  {story.advice_for_juniors && (
                    <div className="bg-[#f0fdf4]/80 p-4 rounded-2xl border border-emerald-200/80 relative mt-3">
                      <Quote className="w-5 h-5 text-emerald-600/30 absolute right-3 top-3" />
                      <p className="text-xs font-bold text-[#065f46] uppercase tracking-wider mb-1">
                        Advice for Juniors
                      </p>
                      <p className="text-xs sm:text-[13px] text-[#2d4a3e] leading-relaxed italic">
                        "{story.advice_for_juniors}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#065f46]/10 mt-4 flex items-center justify-between text-xs text-[#647b72]">
                  <span className="flex items-center gap-1 font-medium text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Placement
                  </span>
                  <span>Campus AI Peer Network</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}