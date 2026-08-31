import { getMyProfile, getMyResumes } from "../lib/api";
import ProfileClient from "./ProfileClient";
import { User, Sparkles, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const profile = await getMyProfile();
  const resumes = await getMyResumes();

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#F4FAF7] text-[#091e17] py-8 sm:py-12">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-orb-mint -top-32 -right-32 pointer-events-none" />
      <div className="absolute w-[550px] h-[550px] rounded-full bg-orb-green -bottom-36 -left-36 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#065f46] hover:text-[#022c22] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Header Banner */}
        <div className="brand-gradient rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/15 card-enter">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a6f2d1]/20 border border-[#a6f2d1]/30 text-[#a6f2d1] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Student Placement Portal
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            My Student Profile & Documents
          </h1>
          <p className="text-white/80 text-sm sm:text-base mt-1 max-w-xl">
            Keep your academic criteria updated for automated drive eligibility verification and manage your uploaded PDF resumes.
          </p>
        </div>

        {/* Interactive Client Component */}
        <ProfileClient initialProfile={profile} initialResumes={resumes} />
      </div>
    </main>
  );
}

