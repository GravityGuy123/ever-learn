import React from "react";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import ContinueWatching from "../others/ContinueWatching";
import LessonTable from "../lessons/LessonTable";

export default function HomeHero() {
  return (
    <section>
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 dark:from-violet-700 dark:to-indigo-900 text-white rounded-2xl p-10 shadow-xl text-center md:text-left">
        <span className="inline-block bg-white/15 text-white uppercase tracking-wide text-xs font-medium rounded-full px-3 py-1 mb-6">
          Online Courses
        </span>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Sharpen Your Skills with Professional Online Courses.
        </h1>

        <button className="inline-flex items-center gap-2 bg-white text-violet-700 hover:text-white hover:bg-violet-700 dark:hover:bg-violet-600 rounded-lg px-6 py-3 text-sm font-medium transition">
          <FaPlay className="w-4 h-4" />
          Join Now
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-6 mt-6">
        {[
          {
            href: "/inbox",
            title: "Inbox",
            text: "Stay connected with your instructors and peers.",
          },
          {
            href: "/lessons",
            title: "Lessons",
            text: "Access interactive lessons tailored to your learning path.",
          },
          {
            href: "/tasks",
            title: "Tasks & Assignments",
            text: "Complete assignments and track your progress.",
          },
          {
            href: "/groups",
            title: "Groups",
            text: "Collaborate with your study groups.",
          },
          {
            href: "/mentors",
            title: "Featured Mentors",
            text: "Explore our list of experienced mentors.",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex-1 min-w-[250px] p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-violet-600 dark:text-indigo-300">
              {item.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{item.text}</p>
          </Link>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-6 mt-8 mb-8">
        {[
          { icon: "🎨", title: "UI UX Design" },
          { icon: "🏷️", title: "Branding" },
          { icon: "💻", title: "Front End" },
          { icon: "🗄️", title: "Back End" },
        ].map((cat) => (
          <div
            key={cat.title}
            className="bg-violet-50 dark:bg-violet-900/20 shadow rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-transform duration-300 flex-1 min-w-[150px]"
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h3 className="font-medium text-violet-600 dark:text-indigo-300">
              {cat.title}
            </h3>
          </div>
        ))}
      </div>
      <ContinueWatching />
      <LessonTable />
    </section>
  );
}
