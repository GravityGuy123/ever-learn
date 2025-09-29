import { type LucideIcon, Settings, LogOut } from "lucide-react";
import Link from "next/link";

import {
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

const userItems: MenuItemType[] = [
  {
    title: "Setting",
    url: "#",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export default function Account() {
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
                <Link
                  href={item.url}
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span
                    className={`font-medium ${
                      item.title === "Logout"
                        ? "text-red-600 dark:text-red-500"
                        : "text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}