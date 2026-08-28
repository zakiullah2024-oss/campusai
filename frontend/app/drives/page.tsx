import Link from "next/link";
import { getDrives } from "../lib/api";

async function getStories() {
  const res = await fetch("http://127.0.0.1:8000/placements/stories", { cache: "no-store" });
  return res.json();
}

export default async function DrivesPage() {
  const drives = await getDrives();
  const stories = await getStories();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4FAF7] text-[#0D1C17]">
      <div className="absolute w-96 h-96 rounded-full bg-orb-mint -top-20 -right-20 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-orb-green -bottom-20 -left-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-8">
        <aside className="md:col-span-1">
          <h2 className="text-sm font-semibold text-[#4B5C55] uppercase tracking-[0.12em] mb-4">
            Recently Placed
          </h2>
          <div className="space-y-4">
            {stories.slice(0, 3).map((story: any, index: number) => (
              <div
                key={story.id}
                className="glass-card rounded-2xl p-4 card-enter"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <p className="font-semibold text-[#0D1C17]">
                  {story.role} at {story.company_name}
                </p>
                <p className="text-sm text-[#4B5C55] mb-2">{story.package}</p>
                {story.advice_for_juniors && (
                  <p className="text-sm text-[#4B5C55] italic line-clamp-3">
                    {story.advice_for_juniors}
                  </p>
                )}
              </div>
            ))}
          </div>
          <Link
            href="/stories"
            className="inline-block mt-4 text-[#065F46] text-sm font-semibold hover:underline"
          >
            View all stories
          </Link>
        </aside>

        <section className="md:col-span-1">
          <h1 className="text-3xl font-bold text-[#0D1C17] mb-6">Placement Drives</h1>

          {drives.length === 0 && (
            <p className="text-[#4B5C55]">No drives available yet.</p>
          )}

          <div className="space-y-4">
            {drives.map((drive: any, index: number) => (
              <Link
                key={drive.id}
                href={`/drives/${drive.id}`}
                className="glass-card block rounded-2xl p-5 hover:shadow-md transition card-enter"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#0D1C17]">{drive.role}</h2>
                    <p className="text-sm text-[#4B5C55]">
                      {drive.location} - {drive.job_type}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] bg-[#A6F2D1]/20 text-[#065F46]">
                    {drive.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}