import Link from "next/link";
import { getDrives } from "../lib/api";

export default async function DrivesPage() {
  const drives = await getDrives();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Placement Drives</h1>

      {drives.length === 0 && <p className="text-gray-500">No drives available yet.</p>}

      <div className="space-y-4">
        {drives.map((drive: any) => (
          <Link
            key={drive.id}
            href={`/drives/${drive.id}`}
            className="block border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{drive.role}</h2>
                <p className="text-sm text-gray-600">
                  {drive.location} · {drive.job_type}
                </p>
              </div>
              <span className="text-xs uppercase font-medium px-2 py-1 rounded bg-gray-100">
                {drive.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
