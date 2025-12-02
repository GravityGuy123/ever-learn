// components/shared/RightSidebar.tsx
"use client";

import { useAuth } from "@/context/auth-context";
// import ConditionalStatisticsCard from "./ConditionalStatisticsCard";
// import ConditionalMentorListCard from "./ConditionalMentorListCard";
import StatisticsCard from "./StatisticsCard";
import MentorList from "./MentorList";

export default function RightSidebar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-full lg:w-[320px] lg:flex-shrink-0 bg-transparent order-first lg:order-last">
      {/* <ConditionalStatisticsCard /> */}
      {/* <ConditionalMentorListCard /> */}
      <StatisticsCard />
      <MentorList />
    </aside>
  );
}
