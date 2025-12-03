"use client";

import DashboardHero from "@/components/dashboard/DashboardHero";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="content-item mb-8">
        <DashboardHero />
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap gap-6 mb-8">
        {/* Learning Path */}
        <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-4 text-violet-600 dark:text-indigo-300">
            Your Learning Path
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Complete Introduction to Programming ✓</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Advanced JavaScript Concepts (In Progress)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full" />
              <span>React Framework Basics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full" />
              <span>Backend Development</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-4 text-violet-600 dark:text-indigo-300">
            Recent Activity
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex justify-between items-center">
              <span>Completed &quot;Variables and Data Types&quot;</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-right">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Started &quot;Functions and Scope&quot;</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-right">5 hours ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Joined study group &quot;JavaScript Basics&quot;</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-right">1 day ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Submitted assignment &quot;Build a Calculator&quot;</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-right">2 days ago</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-4 text-violet-600 dark:text-indigo-300">
            Achievements
          </h2>
          <div className="flex flex-wrap gap-4 text-gray-700 dark:text-gray-300">
            <div className="flex-1 min-w-[200px] flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-lg">
                🏆
              </div>
              <div>
                <div className="font-medium">First Course Complete</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Completed your first course
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[200px] flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-lg">
                🎯
              </div>
              <div>
                <div className="font-medium">Week Streak</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  7 days of consistent learning
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[200px] flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-lg">
                ⚡
              </div>
              <div>
                <div className="font-medium">Fast Learner</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Completed 5 lessons in one day
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}