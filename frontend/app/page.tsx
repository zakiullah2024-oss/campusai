import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-4">CampusAI Placement Portal</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Browse placement drives, check your eligibility instantly, and apply — all in one place.
      </p>
      <Link
        href="/drives"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        View Placement Drives
      </Link>
    </main>
  );
}