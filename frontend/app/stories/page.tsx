async function getStories() {
  const res = await fetch("http://127.0.0.1:8000/placements/stories", { cache: "no-store" });
  return res.json();
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Placement Stories</h1>
        <p className="text-gray-500 mb-8">Hear from students who have been placed.</p>

        <div className="grid gap-5 md:grid-cols-2">
          {stories.map((story: any) => (
            <div
              key={story.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {story.role} at {story.company_name}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {story.package} - Prepared for {story.preparation_duration}
              </p>
              {story.topics_prepared && (
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Topics:</span>{" "}
                  {story.topics_prepared.join(", ")}
                </p>
              )}
              {story.advice_for_juniors && (
                <p className="text-sm text-gray-600 italic mt-2">
                  {story.advice_for_juniors}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}