"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  // Optional side effect
  useEffect(() => {
    console.log("Page not found!");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white dark:bg-gray-800 text-center">
      {/* Illustration */}
      <div className="w-full max-w-md mb-6">
        <Image
          src="/page-not-found-illustration.webp"
          alt="404 Illustration"
          width={600}
          height={450}
          className="mx-auto h-auto w-full"
          priority
        />
      </div>

      {/* Error Text */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-violet-800 dark:text-white mb-3">
        ERROR 404
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
        Page not found...
      </p>

      {/* Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-violet-500 hover:bg-violet-600 dark:bg-violet-800 dark:hover:bg-violet-700 text-white font-semibold rounded-2xl shadow-md transition"
      >
        Go Home
      </Link>
    </div>
  );
}
