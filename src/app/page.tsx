"use client";

import HomeHero from "@/components/HomeHero";
import MentorList from "@/components/MentorList";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="content-item mb-8">
        <HomeHero />
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap gap-6 mb-8">
        {/* Learning Path */}
        <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-4">Your Learning Path</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Complete Introduction to Programming ✓</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Advanced JavaScript Concepts (In Progress)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>React Framework Basics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span>Backend Development</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Completed "Variables and Data Types"</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Started "Functions and Scope"</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Joined study group "JavaScript Basics"</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Submitted assignment "Build a Calculator"</span>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="flex-1 min-w-[280px] p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          {/* inner achievements grid */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm">🏆</div>
              <div>
                <div className="font-medium">First Course Complete</div>
                <div className="text-sm text-gray-500">Completed your first course</div>
              </div>
            </div>

            <div className="flex-1 min-w-[200px] flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">🎯</div>
              <div>
                <div className="font-medium">Week Streak</div>
                <div className="text-sm text-gray-500">7 days of consistent learning</div>
              </div>
            </div>

            <div className="flex-1 min-w-[200px] flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm">⚡</div>
              <div>
                <div className="font-medium">Fast Learner</div>
                <div className="text-sm text-gray-500">Completed 5 lessons in one day</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full width section under */}
      <div className="content-item">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">This Content Should Flow Under Sidebar</h2>
          <p className="mb-4">
            This section and all content below should now expand to full width once it flows under the floated right sidebar. 
          </p>
          <p>
            If you see this content extending to full width (not just the left column), then the float-based layout is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
}
