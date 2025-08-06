// import { Home, Search, User } from 'lucide-react';
import { type LucideIcon, LayoutDashboard, Inbox, NotepadText, SquareChartGantt, Users } from "lucide-react"
import Link from "next/link"

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

export default function Pages() {

    return(
      <section className="pages">
      {applicationItems.map((item) =>(
        <Link key={item.title} href={item.url}>
          {item.title}
        </Link>
      ))}
      </section>
    );
}
