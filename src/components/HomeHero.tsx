import React from "react";
import { FaPlay } from "react-icons/fa";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Inbox", text: "Stay connected with your instructors and peers." },
          { title: "Lessons", text: "Access interactive lessons tailored to your learning path." },
          { title: "Tasks", text: "Track and complete tasks to stay on schedule." },
        ].map((item) => (
        <div
          key={item.title}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-violet-500 dark:text-indigo-200">
            {item.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{item.text}</p>
        </div>
        ))}
      </div>
    </>
  );
}