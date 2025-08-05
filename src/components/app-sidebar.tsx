import { type LucideIcon, LayoutDashboard, Inbox, NotepadText, SquareChartGantt, Users } from "lucide-react"
import Link from "next/link"
import Friends from "./Friends"
import Account from "./Account"
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
} from "@/components/ui/sidebar"

type MenuItemType = {
  title: string;
  url: string;
  icon: LucideIcon;
}

const applicationItems: MenuItemType[] = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Lesson",
    url: "#",
    icon: NotepadText,
  },
  {
    title: "Task",
    url: "#",
    icon: SquareChartGantt,
  },
  {
    title: "Group",
    url: "#",
    icon: Users,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <LogoContent />
          <SidebarGroupLabel className="text-base font-bold uppercase text-blue-950 dark:text-slate-100 tracking-wider">Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {applicationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Friends />
        <Account />
      </SidebarContent>
    </Sidebar>
  )
}