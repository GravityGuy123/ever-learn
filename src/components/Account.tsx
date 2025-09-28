import { type LucideIcon, Settings, LogOut } from "lucide-react"
import Link from "next/link"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type MenuItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
}

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
]

export default function Account() {

  return (
    <SidebarGroup className="mt-1">
      <SidebarGroupLabel className="text-base font-bold uppercase text-violet-400 dark:text-slate-100 tracking-wider">
        Account
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {userItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span className={`font-medium ${item.title === "Logout" ? "text-red-600 dark:text-red-500" : "text-foreground"}`}>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}