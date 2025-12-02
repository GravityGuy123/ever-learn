import { type LucideIcon, LayoutDashboard, Inbox, NotepadText, SquareChartGantt, Users } from "lucide-react"
import Link from "next/link"
import Friends from "../shared/Friends"
import Account from "../shared/Account"
import LogoContent from "../shared/LogoContent";

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

const navigation: MenuItemType[] = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, },
  { title: "Inbox", url: "/inbox", icon: Inbox, },
  { title: "Lesson", url: "/lesson", icon: NotepadText, },
  { title: "Task", url: "/task", icon: SquareChartGantt, },
  { title: "Group", url: "/group", icon: Users, },
]

export function MobileSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <LogoContent />
          <SidebarGroupLabel className="text-base font-bold uppercase text-blue-950 dark:text-slate-100 tracking-wider">Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
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