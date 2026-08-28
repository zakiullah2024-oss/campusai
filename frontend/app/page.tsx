import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4FAF7] text-[#0D1C17] flex items-center justify-center px-4">
      <div className="absolute w-96 h-96 rounded-full bg-orb-mint -top-20 -right-20" />
      <div className="absolute w-96 h-96 rounded-full bg-orb-green -bottom-20 -left-20" />

      <div className="relative z-10 max-w-lg text-center">
        <div className="brand-gradient rounded-[32px] p-10 shadow-[0_24px_60px_rgba(6,95,70,0.18)] card-enter">
          <p className="text-sm font-medium text-[#A6F2D1] mb-2 uppercase tracking-[0.14em]">
            CampusAI
          </p>
          <h1 className="text-3xl font-bold text-white mb-3">
            Placement Portal
          </h1>
          <p className="text-white/80 text-sm mb-6">
            Browse placement drives, check your eligibility instantly, and apply, all in one place.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/drives"
              className="bg-[#A6F2D1] text-[#0D1C17] px-5 py-2.5 rounded-xl font-semibold text-sm hover:brightness-95 transition"
            >
              View Drives
            </Link>
            <Link
              href="/stories"
              className="bg-white/10 text-white border border-white/25 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/15 transition"
            >
              Read Stories
            </Link>
            <Link
              href="/preparation"
              className="bg-white/10 text-white border border-white/25 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/15 transition"
            >
              My Preparation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}