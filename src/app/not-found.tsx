"use client";

import { useEffect } from "react";
import Link from "next/link";
// import { notFound } from "next/navigation";

export default function NotFoundPage() {
  // Optional: Redirect or handle side effects
  useEffect(() => {
    console.log("Page not found!");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link href="/"
        className="px-4 py-2 bg-violet-400 dark:bg-violet-900 text-white rounded hover:bg-purple-400 dark:hover:bg-violet-700 transition" >
        Go Home
      </Link>
    </div>
  );
}