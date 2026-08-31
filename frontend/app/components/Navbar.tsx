"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Briefcase, BookOpen, Target, Compass, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/drives", label: "Placement Drives", icon: Briefcase },
    { href: "/profile", label: "My Profile", icon: User },
    { href: "/stories", label: "Success Stories", icon: BookOpen },
    { href: "/preparation", label: "Prep Tracker", icon: Target },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-white shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-[#a6f2d1] animate-pulse-subtle" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-[#091e17] flex items-center gap-1.5">
              Campus<span className="text-[#059669]">AI</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#a6f2d1]/40 text-[#065f46] border border-[#065f46]/20">
                PRO
              </span>
            </span>
            <span className="text-[10px] font-medium text-[#647b72] tracking-wider uppercase -mt-0.5">
              Placement Hub
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#065f46]/5 p-1 rounded-2xl border border-[#065f46]/10">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-white text-[#065f46] shadow-sm shadow-emerald-950/10 font-bold"
                    : "text-[#42584f] hover:text-[#091e17] hover:bg-white/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#059669]" : "text-[#647b72]"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/drives"
            className="hidden sm:inline-flex items-center gap-1.5 brand-gradient-glow text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-all btn-shimmer"
          >
            <Compass className="w-4 h-4 text-[#a6f2d1]" />
            <span>Explore Drives</span>
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-[#065f46]/10 bg-white/90 backdrop-blur-md">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 text-xs font-medium py-1 px-3 rounded-lg ${
                isActive ? "text-[#065f46] font-bold" : "text-[#647b72]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#059669]" : "text-[#647b72]"}`} />
              <span>{link.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}

