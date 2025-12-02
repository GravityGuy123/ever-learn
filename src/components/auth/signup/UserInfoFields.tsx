"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterSchema } from "@/lib/schema";

interface UserInfoFieldsProps {
  register: UseFormRegister<RegisterSchema>;
  errors: FieldErrors<RegisterSchema>;
  isSubmitting: boolean;
}

export default function UserInfoFields({ register, errors, isSubmitting }: UserInfoFieldsProps) {
  return (
    <>
      {/* Username */}
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          disabled={isSubmitting}
          {...register("username")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400
            bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
        />
        {errors.username && (
          <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          disabled={isSubmitting}
          {...register("full_name")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400
            bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
        />
        {errors.full_name && (
          <p className="text-sm text-red-600 mt-1">{errors.full_name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          disabled={isSubmitting}
          {...register("email")}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400
            bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>
    </>
  );
}