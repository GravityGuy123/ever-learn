"use client";
import { useTheme } from "next-themes";

import Image from "next/image";

export default function LogoContent() {
  const { theme } = useTheme();
  const whiteLogSrc = "/Logo_1.png";
  const darkLogSrc = "/Logo_2.png";

const logoSrc = theme === "dark" ? darkLogSrc : whiteLogSrc;
  return (
    <section className="flex items-center gap-2 mt-2 mb-4">
      <Image
      src={logoSrc}
      alt="EverLearn Logo" 
      width={32} 
      height={32} 
      />
      <span className="text-2xl uppercase font-bold text-blue-950 dark:text-slate-100">
        Ever-Learn
      </span>
    </section>
  );
}
