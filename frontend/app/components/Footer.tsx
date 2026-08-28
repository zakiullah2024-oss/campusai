import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#065f46]/10 bg-white/60 backdrop-blur-md mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-[#a6f2d1]" />
              </div>
              <span className="font-extrabold text-lg text-[#091e17]">
                Campus<span className="text-[#059669]">AI</span>
              </span>
            </div>
            <p className="text-sm text-[#647b72] max-w-sm leading-relaxed">
              Empowering students with intelligent placement discovery, instant eligibility verification, and proven peer insights to land dream careers.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#065f46] bg-[#a6f2d1]/30 px-2.5 py-1 rounded-full border border-[#065f46]/15">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" /> Verified Portal
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#065f46] bg-[#a6f2d1]/30 px-2.5 py-1 rounded-full border border-[#065f46]/15">
                <Zap className="w-3.5 h-3.5 text-[#059669]" /> Real-time Eligibility
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-[#091e17] uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#42584f]">
              <li>
                <Link href="/drives" className="hover:text-[#065f46] transition-colors">
                  All Placement Drives
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[#065f46] transition-colors">
                  Placed Senior Stories
                </Link>
              </li>
              <li>
                <Link href="/preparation" className="hover:text-[#065f46] transition-colors">
                  My Preparation Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Info */}
          <div>
            <h4 className="text-xs font-bold text-[#091e17] uppercase tracking-wider mb-3">
              Campus AI System
            </h4>
            <ul className="space-y-2 text-sm text-[#42584f]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-medium text-emerald-800">API Connected & Live</span>
              </li>
              <li className="text-xs text-[#647b72]">
                FastAPI Engine v1.0
              </li>
              <li className="text-xs text-[#647b72]">
                Campus Recruitment Season 2025-26
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#065f46]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#647b72]">
          <p>© {new Date().getFullYear()} CampusAI Placement Portal. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for aspiring students
          </p>
        </div>
      </div>
    </footer>
  );
}

