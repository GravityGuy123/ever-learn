import React from "react";
const CategoryTabs: React.FC = () => (
  <nav className="flex gap-4 mb-6">
  <button className="bg-gray-50 dark:bg-[#232336] dark:text-white rounded-2xl py-2.5 px-6 font-semibold">UI/UX Design</button>
  <button className="bg-gray-50 dark:bg-[#232336] dark:text-white rounded-2xl py-2.5 px-6 font-semibold">Branding</button>
  <button className="bg-gray-50 dark:bg-[#232336] dark:text-white rounded-2xl py-2.5 px-6 font-semibold">Front End</button>
    {/* ...more tabs... */}
  </nav>
);

export default CategoryTabs;
