"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogoContent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Light & Dark logos
  const lightLogoSrc = "/Logo_1.PNG"; // your light-mode logo
  const darkLogoSrc = "/Logo_2.PNG";  // your dark-mode logo

  // Only switch logo after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted
    ? theme === "dark"
      ? darkLogoSrc
      : lightLogoSrc
    : lightLogoSrc; // default for SSR

  return (
    <section className="flex items-center gap-2 mt-4 mb-6 px-3">
      <Image
        src={logoSrc}
        alt="EverLearn Logo"
        width={36}
        height={36}
        className="rounded-md"
        priority
      />
      <span className="text-2xl uppercase font-bold text-violet-400 dark:text-indigo-200">
        Ever-Learn
      </span>
    </section>
  );
}