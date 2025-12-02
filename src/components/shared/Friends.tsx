import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import Link from "next/link";

const friendsData = [
  { name: "Sparkles", status: "friend", avatarUrl: "/woman1.jpg", fallback: "EB", profileUrl: "#" },
  { name: "CodeKnight", status: "friend", avatarUrl: "/man1.jpg", fallback: "EB", profileUrl: "#" },
  { name: "BugHunter", status: "friend", avatarUrl: "/man2.jpg", fallback: "PX", profileUrl: "#" },
  { name: "DevDiva", status: "friend", avatarUrl: "/woman2.jpg", fallback: "PX", profileUrl: "#" },
];

export default function Friends() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base font-bold uppercase text-violet-400 dark:text-indigo-200 tracking-wider">
        Friends
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="flex flex-col gap-1">
          {friendsData.map((friend) => (
            <Link
              href={friend.profileUrl}
              key={friend.name}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-violet-100 dark:hover:bg-violet-700 hover:text-violet-500 dark:hover:text-white transition-all"
            >
              <Avatar className="h-8 w-8 border border-violet-300 dark:border-violet-400">
                <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                <AvatarFallback>{friend.fallback}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className="font-medium">{friend.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{friend.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
