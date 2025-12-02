"use client";

import { useAuth } from "@/context/auth-context";
import MentorList from "./MentorList";

export default function ConditionalMentorListCard() {
  const { user } = useAuth();

  if (!user) return null; // hide if not logged in

  return <MentorList />;
}