"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const userInput = {
      userName: (form["user-name"] as HTMLInputElement).value.trim(),
      fullName: (form["full-name"] as HTMLInputElement).value.trim(),
      email: (form["email"] as HTMLInputElement).value.trim(),
      password1: (form["password1"] as HTMLInputElement).value.trim(),
      password2: (form["password2"] as HTMLInputElement).value.trim(),
    };

    // Reset error and success
    setError("");
    setSuccess("");

    // === Basic checks ===
    if (
      !userInput.userName ||
      !userInput.fullName ||
      !userInput.email ||
      !userInput.password1 ||
      !userInput.password2
    ) {
      setError("All fields are required.");
      return;
    }

    // Username length and simple character check
    if (userInput.userName.length < 3 || userInput.userName.length > 20) {
      setError("Username must be between 3 and 20 characters.");
      return;
    }
    if (!userInput.userName.split("").every(c => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_".includes(c))) {
      setError("Username can only contain letters, numbers, and underscores.");
      return;
    }

    // Full name check
    if (userInput.fullName.length < 3) {
      setError("Please enter your full name.");
      return;
    }

    // Email check (simple, no regex)
    if (!(userInput.email.includes("@") && userInput.email.includes("."))) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password match
    if (userInput.password1 !== userInput.password2) {
      setError("Passwords don't match, please re-check.");
      return;
    }

    // Password length
    if (userInput.password1.length < 8 || userInput.password1.length > 30) {
      setError("Password must be between 8 and 30 characters.");
      return;
    }

    // Password strength (no regex)
    const hasUppercase = userInput.password1.split("").some(c => c === c.toUpperCase() && /[A-Z]/.test(c));
    const hasNumber = userInput.password1.split("").some(c => !isNaN(Number(c)));
    const hasSpecial = userInput.password1.split("").some(c => "!@#$%^&*()_+-=[]{};:'\",.<>?/|`~".includes(c));

    if (!hasUppercase || !hasNumber || !hasSpecial) {
      setError("Password must include at least 1 uppercase letter, 1 number, and 1 special character.");
      return;
    }

    // Success case
    console.log("Signup successful", userInput);
    setSuccess("Signup successful! Redirecting to login...");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Sign Up
        </h2>

        <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="user-name"
              name="user-name"
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 
                bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 
                bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 
                bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password1"
                name="password1"
                placeholder="Create a password"
                required
                minLength={8}
                maxLength={30}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 
                  bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-indigo-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Re-enter Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                id="password2"
                name="password2"
                placeholder="Re-enter your password"
                required
                minLength={8}
                maxLength={30}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 
                  bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-indigo-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error & Success */}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          {success && (
            <p className="text-sm text-violet-600 dark:text-indigo-400 mt-1">
              {success}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-violet-600 text-white font-medium 
              hover:bg-violet-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-gray-500 dark:text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Sign Up */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border 
            border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 
            text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 
            dark:hover:bg-gray-800 transition"
        >
          <FaGoogle className="text-red-500" size={18} />
          Sign up with Google
        </button>

        {/* Redirect */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-violet-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}