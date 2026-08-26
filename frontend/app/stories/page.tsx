async function getStories() {
  const res = await fetch("http://127.0.0.1:8000/placements/stories", { cache: "no-store" });
  return res.json();
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <main className="p-8 max-w-4xl mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Placement Stories</h1>
      <p className="text-gray-600 mb-6">Hear from students who've been placed.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {stories.map((story: any) => (
          <div key={story.id} className="border rounded-lg p-5 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              {story.role} @ {story.company_name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {story.package} · Prepared for {story.preparation_duration}
            </p>
            {story.topics_prepared && (
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Topics:</span> {story.topics_prepared.join(", ")}
              </p>
            )}
            {story.advice_for_juniors && (
              <p className="text-sm text-gray-700 italic">"{story.advice_for_juniors}"</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}