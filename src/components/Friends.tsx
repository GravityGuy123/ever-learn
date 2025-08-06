import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";

// A data array makes the component scalable and easier to manage.
const friendsData = [
  {
    name: "Sparkles",
    status: "friend",
    avatarUrl: "/woman1.jpg", 
    fallback: "EB",
    profileUrl: "#",
  },
  {
    name: "CodeKnight",
    status: "friend",
    avatarUrl: "/man1.jpg", 
    fallback: "EB",
    profileUrl: "#",
  },
  {
    name: "BugHunter",
    status: "friend",
    avatarUrl: "/man2.jpg",
    fallback: "PX",
    profileUrl: "#",
  },
  {
    name: "DevDiva",
    status: "friend",
    avatarUrl: "/woman2.jpg",
    fallback: "PX",
    profileUrl: "#",
  },
];

export default function Friends() {
  return (
    <SidebarGroup className="">
      <SidebarGroupLabel className="text-base font-bold uppercase text-blue-950 dark:text-slate-100 tracking-wider">
        Friends
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="flex flex-col gap-1">
          {friendsData.map((friend) => (
            <Link href={friend.profileUrl} key={friend.name} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                <AvatarFallback>{friend.fallback}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="font-medium text-foreground">{friend.name}</span>
                <span className="text-xs text-muted-foreground">{friend.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
