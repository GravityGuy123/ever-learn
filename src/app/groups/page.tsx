import HomeHero from "@/components/HomeHero";

export default function GroupPage() {
  return (
    <section className="space-y-8">
      {/* Hero Section */}
      <HomeHero />

      {/* Featured Mentors */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold text-violet-500 dark:text-indigo-200 mb-4">
        Featured Mentors
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Explore our list of experienced mentors who will guide you on your journey.
      </p>
      </div>
    </section>
  );
}