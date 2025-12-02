"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`
        rounded-full p-2 transition-all duration-300
        bg-gray-100 text-violet-600 hover:bg-gray-200 hover:scale-105  /* Light mode only */
      `}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 transition-transform duration-300 rotate-0" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-300 rotate-180" />
      )}
    </Button>
  );
}