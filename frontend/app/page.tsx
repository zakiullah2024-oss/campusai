import Link from "next/link";
import {
  Briefcase,
  BookOpen,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  GraduationCap,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F4FAF7] text-[#091e17] flex flex-col justify-between">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-orb-mint -top-32 -right-32 pointer-events-none" />
      <div className="absolute w-[550px] h-[550px] rounded-full bg-orb-green -bottom-36 -left-36 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-orb-emerald top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40" />

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#065f46]/10 border border-[#065f46]/20 text-[#065f46] text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm card-enter">
            <Sparkles className="w-4 h-4 text-[#059669]" />
            <span>Campus Placement Portal 2025-26</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#091e17] leading-[1.1] card-enter">
            Launch Your Career With{" "}
            <span className="text-gradient">Intelligent Placements</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#42584f] leading-relaxed max-w-2xl mx-auto card-enter">
            Discover verified hiring drives, verify your eligibility criteria in real-time, gain actionable insights from placed seniors, and track your daily preparation journey.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-wrap gap-3.5 justify-center pt-2 card-enter">
            <Link
              href="/drives"
              className="inline-flex items-center gap-2.5 bg-[#065f46] text-white px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/20 hover:bg-[#054d39] hover:scale-[1.03] active:scale-[0.98] transition-all btn-shimmer"
            >
              <Briefcase className="w-5 h-5 text-[#a6f2d1]" />
              <span>Explore Active Drives</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/stories"
              className="inline-flex items-center gap-2 bg-white text-[#091e17] border border-[#065f46]/20 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-sm hover:bg-[#e6faf1] hover:border-[#065f46]/40 hover:scale-[1.02] transition-all"
            >
              <BookOpen className="w-5 h-5 text-[#059669]" />
              <span>Read Senior Stories</span>
            </Link>

            <Link
              href="/preparation"
              className="inline-flex items-center gap-2 bg-white text-[#091e17] border border-[#065f46]/20 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-sm hover:bg-[#e6faf1] hover:border-[#065f46]/40 hover:scale-[1.02] transition-all"
            >
              <Target className="w-5 h-5 text-[#059669]" />
              <span>My Prep Journey</span>
            </Link>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto card-enter">
          <div className="glass-card rounded-2xl p-4 text-center border-emerald-500/20">
            <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Zap className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#091e17]">Instant</p>
            <p className="text-xs font-semibold text-[#647b72]">Eligibility Check</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border-emerald-500/20">
            <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#091e17]">100%</p>
            <p className="text-xs font-semibold text-[#647b72]">Verified Companies</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border-emerald-500/20">
            <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#091e17]">Direct</p>
            <p className="text-xs font-semibold text-[#647b72]">Resume Application</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border-emerald-500/20">
            <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#091e17]">Daily</p>
            <p className="text-xs font-semibold text-[#647b72]">Prep Tracker</p>
          </div>
        </div>

        {/* Feature Cards Showcase */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <Link
            href="/drives"
            className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between group border-[#065f46]/15 hover:border-[#065f46]/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-[#a6f2d1]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider">
                  Live Opportunities
                </span>
                <h2 className="text-xl font-bold text-[#091e17] mt-1 group-hover:text-[#065f46] transition-colors">
                  Placement Drives
                </h2>
              </div>
              <p className="text-sm text-[#42584f] leading-relaxed">
                Browse on-campus & off-campus hiring drives with real-time criteria verification against your CGPA and branch.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-2 text-sm font-bold text-[#065f46]">
              <span>Browse Drives</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* Feature 2 */}
          <Link
            href="/stories"
            className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between group border-[#065f46]/15 hover:border-[#065f46]/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-[#a6f2d1]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider">
                  Peer Wisdom
                </span>
                <h2 className="text-xl font-bold text-[#091e17] mt-1 group-hover:text-[#065f46] transition-colors">
                  Placed Senior Stories
                </h2>
              </div>
              <p className="text-sm text-[#42584f] leading-relaxed">
                Learn from students who landed top offers. Read interview breakdowns, study durations, and key advice for juniors.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-2 text-sm font-bold text-[#065f46]">
              <span>Read Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* Feature 3 */}
          <Link
            href="/preparation"
            className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between group border-[#065f46]/15 hover:border-[#065f46]/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-[#a6f2d1]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider">
                  Skill Building
                </span>
                <h2 className="text-xl font-bold text-[#091e17] mt-1 group-hover:text-[#065f46] transition-colors">
                  Preparation Tracker
                </h2>
              </div>
              <p className="text-sm text-[#42584f] leading-relaxed">
                Log your daily coding problems, DSA topics, and system design progress in an interactive personal timeline.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-2 text-sm font-bold text-[#065f46]">
              <span>Track Progress</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}