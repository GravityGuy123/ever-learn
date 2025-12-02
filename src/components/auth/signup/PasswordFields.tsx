"use client";

import React, { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterSchema } from "@/lib/schema";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldsProps {
  register: UseFormRegister<RegisterSchema>;
  errors: FieldErrors<RegisterSchema>;
  isSubmitting: boolean;
}

export default function PasswordFields({ register, errors, isSubmitting }: PasswordFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* Password */}
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            autoComplete="on"
            disabled={isSubmitting}
            {...register("password")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400
              bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-indigo-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
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
            autoComplete="on"
            disabled={isSubmitting}
            {...register("confirm_password")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400
              bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-indigo-400"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirm_password && (
          <p className="text-sm text-red-600 mt-1">{errors.confirm_password.message}</p>
        )}
      </div>
    </>
  );
}