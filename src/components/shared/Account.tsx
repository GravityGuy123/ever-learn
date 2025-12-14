"use client";

import { type LucideIcon, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "next-themes";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/lib/toast";

type MenuItemType = {
  title: string;
  url?: string; // optional for Logout
  icon: LucideIcon;
};

const userItems: MenuItemType[] = [
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    icon: LogOut,
  },
];

export default function Account() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isLoggedIn) return null; // 🔥 Only show account items if logged in

  const handleLogout = async () => {
    try {
      await logout();
      SuccessToast("You have logged out successfully", isDark, {position: "top-right"});
      
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
      ErrorToast("Logout failed. Please try again.", isDark, {position: "top-center"});
    }
  };

  return (
    <SidebarGroup className="mt-1">
      <SidebarGroupLabel className="text-base font-bold uppercase text-violet-400 dark:text-indigo-200 tracking-wider">
        Account
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {userItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                {item.title === "Logout" ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" >
                    <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium text-red-600 dark:text-red-500">
                      {item.title}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.url!}
                    className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {item.title}
                    </span>
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}