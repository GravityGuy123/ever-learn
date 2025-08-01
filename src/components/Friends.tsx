import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Friends() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Friends</h1>
      <section>
        <div id="friends-list" className="friend-1 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png"alt="Edu Brazil" />
              <AvatarFallback>Edu</AvatarFallback>
            </Avatar>
            <div className="font-medium">
              <span>Edu Brazil</span>
              <span>friend</span>
            </div>
          </div>
        </div>
        <div id="friends-list" className="friend-2 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png"alt="Edu Brazil" />
              <AvatarFallback>PhenomX</AvatarFallback>
            </Avatar>
            <div className="font-medium">
              <span>Phenom-X</span>
              <span>friend</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
