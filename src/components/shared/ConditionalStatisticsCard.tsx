"use client";

import { useAuth } from "@/context/auth-context";
import StatisticsCard from "./StatisticsCard";

export default function ConditionalStatisticsCard() {
  const { user } = useAuth();

  if (!user) return null; // hide if not logged in

  return <StatisticsCard />;
}