"use client";

import { useState } from "react";
import Account from "./Account";
import LogoContent from "./LogoContent";
import Pages from "./Pages";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
// import { useAuth } from "@/hooks/useAuth"; // ✅ added
import ConditionalFriendsCard from "./ConditionalFriendsCard";
import DashboardPages from "./DashboardPages";

export function AppSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMobileMenuOpen(false);

  // const { loading } = useAuth(); // ✅ added

  // // Prevent sidebar from flashing before user loads
  // if (loading) return null; // ✅ added

  return (
    <>
      {/* 🌐 Mobile Hamburger */}
      <div className="md:hidden p-4 z-50 relative">
        <button type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded text-violet-500 dark:text-indigo-300 hover:bg-violet-100 dark:hover:bg-violet-700 transition"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 🖥 Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar className="bg-gray-50 dark:bg-gray-800 overflow-y-auto">
          <SidebarContent className="dark:bg-gray-800">
            <LogoContent />
            <Pages />
            <DashboardPages />
            <ConditionalFriendsCard />
            <Account />
          </SidebarContent>
        </Sidebar>
      </div>

      {/* 📱 Mobile Drawer (Half Width) */}
      <div
        className={`fixed top-0 left-0 h-full w-1/2 bg-gray-50 dark:bg-gray-800 z-[60] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ❌ Close Button */}
        <button
          onClick={handleCloseMenu}
          className="absolute top-5 right-5 text-violet-600 dark:text-indigo-300 hover:text-violet-800 dark:hover:text-indigo-400 transition z-[70]"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={4}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 🧭 Sidebar Content */}
        <div className="flex flex-col min-h-full p-6 pt-20 space-y-6 overflow-y-auto w-full">
          <LogoContent /> {/* optional, safe */}
          <Pages onLinkClick={handleCloseMenu} />
          <DashboardPages />
          <div className="mt-4 space-y-4">
            <ConditionalFriendsCard />
            <Account />
          </div>
        </div>
      </div>

      {/* 🌑 Background Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={handleCloseMenu}
        />
      )}
    </>
  );
}