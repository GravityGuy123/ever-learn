import React from "react";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

export default function HomeHero() {
  return (
    <>
      <div className="bg-gradient-to-r from-violet-400 to-purple-400 dark:from-violet-900 dark:to-violet-950 text-white rounded-2xl p-10 shadow-xl text-center md:text-left">
        <span className="inline-block bg-white/15 text-white uppercase tracking-wide text-xs font-medium rounded-full px-3 py-1 mb-6">
          Online Courses
        </span>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Sharpen Your Skills with Professional Online Courses.
        </h1>

        <button className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 rounded-lg px-6 py-3 text-sm font-medium hover:bg-white/30 transition">
          <FaPlay className="w-4 h-4" />
          Join Now
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-6 mt-6">
        <Link
          href="/inbox"
          className="flex-1 min-w-[250px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-violet-500 dark:text-indigo-200">
            Inbox
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Stay connected with your instructors and peers. Access your messages, announcements, and important updates all in one place.
          </p>
        </Link>

        <Link
          href="/lessons"
          className="flex-1 min-w-[250px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-violet-500 dark:text-indigo-200">
            Lessons
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Access interactive lessons tailored to your learning path. Track your progress and continue where you left off.
          </p>
        </Link>

        <Link
          href="/tasks"
          className="flex-1 min-w-[250px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-violet-500 dark:text-indigo-200">
            Tasks & Assignments
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Complete assignments and track your progress. View upcoming deadlines and submission requirements.
          </p>
        </Link>

        <Link
          href="/groups"
          className="flex-1 min-w-[250px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-violet-500 dark:text-indigo-200">
            Groups
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Collaborate with your study groups. Join discussions, share resources, and learn together.
          </p>
        </Link>

        <Link
          href="/mentors"
          className="flex-1 min-w-[250px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-violet-500 dark:text-indigo-200">
            Featured Mentors
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Explore our list of experienced mentors who will guide you on your journey.
          </p>
        </Link>
      </div>
      
      <div className="flex gap-6 mt-8 mb-8">
        {/* UI UX Design */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="font-medium text-foreground">UI UX Design</h3>
        </div>

        {/* Branding */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <div className="text-3xl mb-3">🏷️</div>
          <h3 className="font-medium text-foreground">Branding</h3>
        </div>

        {/* Front End */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-transform duration-300">
          <div className="text-3xl mb-3">💻</div>
          <h3 className="font-medium text-foreground">Front End</h3>
        </div>

        {/* Back End */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-transform duration-300">
        <div className="text-3xl mb-3">🗄️</div>
        <h3 className="font-medium text-foreground">Back End</h3>
      </div>
    </div>
    </>
  );
}
