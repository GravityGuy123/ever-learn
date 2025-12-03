"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { LoginSchema } from "@/lib/schema";
import { loginSchema } from "@/lib/schema";
import { Spinner } from "@/components/ui/spinner";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });
  

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data); // sets cookies and updates user state
      toast.success("Login successful", { position: "top-right" });
      router.push("/dashboard");
    } catch {
      toast.error("Login failed", { position: "top-center" });
    }
  };

  return (
    <div className="flex items-center justify-center py-8 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Email or Username
            </label>
            <input
              type="text"
              id="emailorname"
              placeholder="Enter your email or username"
              disabled={isSubmitting}
              {...register("identifier")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 
                bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200" />
              {errors.identifier && (
              <p className="text-sm text-red-600 mt-1">{errors.identifier.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                disabled={isSubmitting}
                {...register("password")}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-indigo-400 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-600" >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
              {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition flex items-center justify-center" >
            {isSubmitting ? <Spinner /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          {`Don’t have an account?`} {" "}
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