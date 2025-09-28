"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  NotepadText,
  SquareChartGantt,
  Users,
  type LucideIcon,
} from "lucide-react";

import Friends from "./Friends";
import Account from "./Account";
import LogoContent from "./LogoContent";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type MenuItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const navigation: MenuItemType[] = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Lesson", url: "/lesson", icon: NotepadText },
  { title: "Task", url: "/task", icon: SquareChartGantt },
  { title: "Group", url: "/group", icon: Users },
];

export function AppSidebar() {
  const pathname = usePathname();
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
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar className="bg-[#F8F9FC] dark:bg-[#1E1E2D] overflow-y-auto">
          <SidebarContent>
            <SidebarGroup>
              <LogoContent />
              <SidebarGroupLabel className="text-base font-bold uppercase text-violet-400 dark:text-gray-200 tracking-wider">
                Pages
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.url}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors 
                          ${
                            isActive
                              ? "bg-violet-400 text-white dark:bg-violet-600 dark:text-white"
                              : "text-violet-400 hover:bg-[#ECEBFF] dark:text-gray-300 dark:hover:bg-[#2D2D3A]"
                          }`}
                          >
                            <item.icon
                              className={`h-5 w-5 ${
                                isActive
                                  ? "text-white"
                                  : "text-violet-400 dark:text-gray-300"
                              }`}
                            />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
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
            <div className="flex flex-col min-h-full p-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="self-end mb-6 text-violet-400 dark:text-gray-200"
              >
                ✕
              </button>

              <LogoContent />

              <nav className="mt-6 space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors 
                      ${
                        pathname === item.url
                          ? "bg-violet-400 text-white dark:bg-violet-600"
                          : "text-violet-400 hover:bg-[#ECEBFF] dark:text-gray-300 dark:hover:bg-[#2D2D3A]"
                      }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                ))}
              </nav>

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