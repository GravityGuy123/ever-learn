"use client";

import { useState } from "react";
import Friends from "./Friends";
import Account from "./Account";
import LogoContent from "./LogoContent";
import Pages from "./Pages";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

export function AppSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger button only on mobile */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded text-violet-400 dark:text-gray-200"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
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
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar className="bg-gray-50 overflow-y-auto">
          <SidebarContent className="dark:bg-gray-800">
            <LogoContent />
            <Pages />
            <Friends />
            <Account />
          </SidebarContent>
        </Sidebar>
      </div>

      {/* Mobile Half-Width Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-1/2 bg-[#F8F9FC] dark:bg-[#1E1E2D] z-50 shadow-xl md:hidden transition-transform duration-300 overflow-y-auto">
            
            {/* Close button fixed at top-right */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-violet-400 dark:text-gray-200 z-10"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col min-h-full p-6 pt-12">
              <LogoContent />
              <Pages />
              <div className="mt-6">
                <Friends />
                <Account />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}