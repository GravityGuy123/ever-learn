"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const form = e.currentTarget;
    const emailOrName = (form["emailorname"] as HTMLInputElement).value.trim();
    const password = (form["password"] as HTMLInputElement).value.trim();

    // Validation
    if (!emailOrName) {
      setErrorMessage("Please enter your email or username.");
      return;
    }

    if (emailOrName.includes("@")) {
      if (!emailOrName.includes("."))
        return setErrorMessage("Please enter a valid email address.");
    } else {
      if (emailOrName.length < 3)
        return setErrorMessage("Username must be at least 3 characters long.");
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    // Success
    setSuccessMessage("Login successful! Redirecting to dashboard...");
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000); // small delay so user sees the message
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Email or Username
            </label>
            <input
              type="text"
              name="emailorname"
              placeholder="Enter your email or username"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 
                bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 
                bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Success Message */}
          {successMessage && (
            <p className="text-violet-600 dark:text-indigo-400 text-sm">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-violet-600 text-white font-medium 
              hover:bg-violet-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-violet-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}