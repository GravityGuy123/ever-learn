import { ModeToggle } from "@/components/ModeToggle";
// import Image from "next/image.";

export default function Home() {
  return (
    <main className="bg- flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
    </main>
  );
}
