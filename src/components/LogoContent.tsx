"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function LogoContent() {
  const { theme } = useTheme();

  // Light & Dark logos
  const lightLogoSrc = "/Logo_1.png"; // your light-mode logo
  const darkLogoSrc = "/Logo_2.png";  // your dark-mode logo

  const logoSrc = theme === "dark" ? darkLogoSrc : lightLogoSrc;

  return (
    <section className="flex items-center gap-2 mt-4 mb-6 px-3">
      <Image
        src={logoSrc}
        alt="EverLearn Logo"
        width={36}
        height={36}
        className="rounded-md"
      />
      <span
        className="
          text-2xl 
          uppercase 
          font-bold 
          text-violet-400 
          dark:text-gray-200
        "
      >
        Ever-Learn
      </span>
    </section>
  );
}