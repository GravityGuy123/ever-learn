"use client";

import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
  <header className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-gray-900 shadow rounded-xl mb-6 gap-4 sm:gap-0 w-full max-w-full overflow-x-auto">
      
      {/* Top row for mobile hamburger + search */}
  <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4 min-w-0">
        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-violet-400 dark:text-gray-200"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <input
          type="text"
          placeholder="Search your course..."
          className="flex-1 min-w-0 sm:w-64 md:w-1/3 lg:w-96 xl:w-[500px] px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      {/* Right section: toggle + profile */}
  <div className="flex items-center gap-4 min-w-0">
        <ModeToggle />
        <div className="flex items-center gap-2">
          <Image
            src="/man1.jpg"
            alt="User"
            unoptimized
            quality={100}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
            width={800}
            height={160}
            sizes="100vw"
          />
          <span className="font-semibold text-gray-800 dark:text-white whitespace-nowrap">GravityGuy</span>
        </div>
      </div>
    </header>
  );
}
