"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Sign Up
        </h2>

        <form className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
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
              placeholder="Enter your full name"
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
              placeholder="Enter your email"
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
                placeholder="Create a password"
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
                placeholder="Re-enter your password"
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