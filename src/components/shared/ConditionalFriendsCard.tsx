"use client";

import { useAuth } from "@/context/auth-context";
import Friends from "./Friends";

export default function ConditionalFriendsCard() {
  const { user } = useAuth();

  if (!user) return null; // hide if not logged in

  return <Friends />;
}