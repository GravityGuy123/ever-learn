"use client";

import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  // Simulate login state (replace with real auth later)
  const isLoggedIn = false;

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 shadow rounded-xl mb-6 gap-4 sm:gap-0 w-full max-w-full overflow-x-auto">
      {/* Left: Hamburger + Search */}
      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4 min-w-0">
        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-violet-600 dark:text-indigo-300 hover:text-violet-700 dark:hover:text-indigo-400 transition-colors"
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
          className="flex-1 min-w-0 sm:w-64 md:w-1/3 lg:w-96 xl:w-[500px] px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Mode toggle is always visible */}
        <ModeToggle />

        {/* Show Auth OR Profile depending on state */}
        {isLoggedIn ? (
          <div className="hidden sm:flex items-center gap-2">
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
            <span className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
              GravityGuy
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Login → outlined, subtle hover */}
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium 
              text-violet-600 dark:text-indigo-300 
              border border-violet-600 dark:border-indigo-400 
              rounded-lg transition-colors duration-300
              hover:bg-violet-50 dark:hover:bg-indigo-900/40"
            >
              Login
            </Link>

            {/* Sign Up → filled, strong CTA */}
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg text-sm font-medium 
              text-white bg-violet-600 hover:bg-violet-700 
              dark:bg-indigo-500 dark:hover:bg-indigo-600 
              shadow-sm transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}