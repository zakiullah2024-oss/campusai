async function getStories() {
  const res = await fetch("http://127.0.0.1:8000/placements/stories", { cache: "no-store" });
  return res.json();
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <main className="relative min-h-screen overflow-hidden py-10">
      <div className="absolute w-96 h-96 rounded-full bg-orb-mint -top-20 -right-20" />
      <div className="absolute w-96 h-96 rounded-full bg-orb-green -bottom-20 -left-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-2xl font-bold text-[#0D1C17] mb-2">Placement Stories</h1>
        <p className="text-[#4B5C55] mb-8">Hear from students who have been placed.</p>

        <div className="grid gap-5 md:grid-cols-2">
          {stories.map((story: any) => (
            <div
              key={story.id}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-semibold text-[#0D1C17]">
                {story.role} at {story.company_name}
              </h2>
              <p className="text-sm text-[#4B5C55] mb-3">
                {story.package} - Prepared for {story.preparation_duration}
              </p>
              {story.topics_prepared && (
                <p className="text-sm text-[#0D1C17] mb-2">
                  <span className="font-medium">Topics:</span>{" "}
                  {story.topics_prepared.join(", ")}
                </p>
              )}
              {story.advice_for_juniors && (
                <p className="text-sm text-[#4B5C55] italic mt-2">
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