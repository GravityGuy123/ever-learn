"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon, LayoutDashboard, Inbox, NotepadText, SquareChartGantt, Users } from "lucide-react";

type MenuItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const navigation: MenuItemType[] = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Lessons", url: "/lessons", icon: NotepadText },
  { title: "Tasks", url: "/tasks", icon: SquareChartGantt },
  { title: "Groups", url: "/groups", icon: Users },
];

export default function Pages() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {/* PAGES label */}
      <span className="text-base font-bold uppercase text-violet-400 dark:text-indigo-200 tracking-wider px-3 mt-4 mb-2">
        Pages
      </span>

      {/* Navigation links */}
      <nav className="flex flex-col space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.url;
          return (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors
                ${isActive
                  ? "bg-violet-400 text-white dark:bg-violet-600 dark:text-white"
                  : "text-violet-400 hover:bg-violet-100 dark:text-gray-300 dark:hover:bg-violet-700"
                }`}
            >
              <item.icon
                className={`h-5 w-5 ${isActive ? "text-white" : "text-violet-400 dark:text-gray-300"}`}
              />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}