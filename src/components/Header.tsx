"use client";

import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar"; // to toggle mobile sidebar

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#1E1E2D] shadow rounded-xl mb-6">
      {/* Mobile hamburger */}
      <button
        className="md:hidden mr-4 text-violet-400 dark:text-gray-200"
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
        className="hidden sm:block w-1/3 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-[#232336] dark:text-white dark:border-gray-700"
      />

      <ModeToggle />

      <div className="flex items-center gap-4">
        <Image
          src="/man1.jpg"
          alt="User"
          unoptimized
          quality={100}
          className="w-12 h-12 rounded-full"
          width={800}
          height={160}
          sizes="100vw"
        />
        <span className="font-semibold dark:text-white">Jason Ranti</span>
      </div>
    </header>
  );
};

export default Header;