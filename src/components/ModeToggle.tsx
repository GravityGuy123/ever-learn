"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
    onClick={() => setTheme(theme === "dark"? "light" :"dark" ) }
    >
      {theme === "light"
      ? (<Moon />)
      : (<Sun />)
      }
    </Button>
  )
}
