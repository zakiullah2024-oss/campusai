import Link from "next/link";
import { getDrives } from "../lib/api";
import DriveListClient from "./DriveListClient";
import {
  Briefcase,
  Sparkles,
  TrendingUp,
  Award,
  ArrowRight,
  GraduationCap,
  Quote,
  ShieldAlert,
  Zap,
} from "lucide-react";

type Story = {
  id: string | number;
  role: string;
  company_name: string;
  package?: string;
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

export default async function DrivesPage() {
  const drives = await getDrives();
  const stories = await getStories();

  const activeDrivesCount = drives.filter(
    (d: any) => d.status?.toLowerCase() === "active"
  ).length;

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F4FAF7] text-[#091e17] py-8 sm:py-12">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-orb-mint -top-28 -right-28 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-orb-green -bottom-32 -left-32 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner */}
        <div className="brand-gradient rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/15 mb-8 card-enter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a6f2d1]/20 border border-[#a6f2d1]/30 text-[#a6f2d1] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Live Campus Recruitment
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Placement Drives Portal
              </h1>
              <p className="text-white/80 text-sm sm:text-base mt-1 max-w-xl">
                Explore active campus opportunities, check your profile eligibility instantly, and submit direct applications.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex items-stretch gap-4 sm:gap-6 bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur-md self-start md:self-auto">
              <div>
                <p className="text-2xl sm:text-3xl font-black tabular-nums text-white">
                  {drives.length}
                </p>
                <p className="text-xs font-medium text-white/75 flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-[#a6f2d1]" /> Total Drives
                </p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-2xl sm:text-3xl font-black tabular-nums text-[#a6f2d1]">
                  {activeDrivesCount}
                </p>
                <p className="text-xs font-medium text-white/75 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" /> Active Now
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar + Drive List */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6 lg:order-1">
            {/* Spotlight Placed Seniors */}
            <div className="glass-card rounded-3xl p-5 border-[#065f46]/15">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-[#065f46] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#059669]" />
                  Placed Spotlight
                </h2>
                <Link
                  href="/stories"
                  className="text-xs font-bold text-[#059669] hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {stories.length === 0 ? (
                  <p className="text-xs text-[#647b72]">No placed stories available.</p>
                ) : (
                  stories.slice(0, 3).map((story: Story, index: number) => (
                    <div
                      key={story.id}
                      className="bg-white/70 p-3.5 rounded-2xl border border-[#065f46]/10 hover:border-[#065f46]/30 transition-all text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-[#091e17] mb-1">
                        <span>{story.company_name}</span>
                        {story.package && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#a6f2d1]/40 text-[#065f46] font-extrabold">
                            {story.package}
                          </span>
                        )}
                      </div>
                      <p className="text-[#42584f] font-medium">{story.role}</p>
                      {story.advice_for_juniors && (
                        <p className="text-[#647b72] italic mt-1.5 line-clamp-2 bg-[#f4faf7] p-1.5 rounded-lg border border-[#065f46]/5">
                          "{story.advice_for_juniors}"
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Preparation Tips Callout */}
            <div className="glass-card rounded-3xl p-5 border-[#065f46]/15 bg-gradient-to-br from-emerald-500/10 to-teal-500/5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#065f46] uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4 text-[#059669]" />
                Pro Tip for Drives
              </div>
              <p className="text-xs text-[#42584f] leading-relaxed mb-3">
                Keep your resume up to date. The system automatically cross-checks your minimum CGPA and standing backlogs before submitting.
              </p>
              <Link
                href="/preparation"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#065f46] hover:underline"
              >
                Log daily preparation <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>

          {/* Main Drives List */}
          <section className="lg:order-2">
            <DriveListClient drives={drives} />
          </section>
        </div>
      </div>
    </main>
  );
}