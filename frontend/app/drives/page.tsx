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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="md:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Placed</h2>
          <div className="space-y-4">
            {stories.slice(0, 3).map((story: any) => (
              <div
                key={story.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <p className="font-semibold text-gray-900">
                  {story.role} at {story.company_name}
                </p>
                <p className="text-sm text-gray-500 mb-2">{story.package}</p>
                {story.advice_for_juniors && (
                  <p className="text-sm text-gray-600 italic line-clamp-3">
                    {story.advice_for_juniors}
                  </p>
                )}
              </div>
            ))}
          </div>
          <Link
            href="/stories"
            className="inline-block mt-4 text-blue-600 text-sm font-medium hover:underline"
          >
            View all stories
          </Link>
        </aside>

        <section className="md:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Placement Drives</h1>

          {drives.length === 0 && (
            <p className="text-gray-500">No drives available yet.</p>
          )}

          <div className="space-y-4">
            {drives.map((drive: any) => (
              <Link
                key={drive.id}
                href={`/drives/${drive.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{drive.role}</h2>
                    <p className="text-sm text-gray-500">
                      {drive.location} - {drive.job_type}
                    </p>
                  </div>
                  <span className="text-xs uppercase font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
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