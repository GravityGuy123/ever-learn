import HomeHero from "@/components/HomeHero";


export default function HomePage() {
  return (
    <section className="space-y-8">
      {/* Hero Section */}
      <HomeHero />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Inbox", text: "Stay connected with your instructors and peers." },
          { title: "Lessons", text: "Access interactive lessons tailored to your learning path." },
          { title: "Tasks", text: "Track and complete tasks to stay on schedule." },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 bg-white dark:bg-[#2D2D3A] rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-[#6C63FF] dark:text-[#A5B4FC]">
              {item.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Featured Mentors */}
      <div className="bg-white dark:bg-[#2D2D3A] rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-[#6C63FF] dark:text-[#A5B4FC] mb-4">
          Featured Mentors
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explore our list of experienced mentors who will guide you on your journey.
        </p>
      </div>
    </section>
  );
}