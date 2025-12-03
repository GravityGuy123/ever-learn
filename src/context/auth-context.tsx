"use client";

import React, { createContext, useState, useCallback, useEffect, useContext } from "react";
import { axiosInstance } from "@/lib/axios.config";
import { LoginSchema } from "@/lib/schema";

interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (data: LoginSchema) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch CSRF cookie from backend
  const getCsrfCookie = async () => {
    // Debug: show resolved URL
    try {
      const base = axiosInstance.defaults.baseURL || "";
      console.log(`[AUTH DEBUG] Requesting CSRF cookie from: ${base}/csrf/`);
    } catch {}
    await axiosInstance.get("/csrf/");
  };

  const checkAuth = useCallback(async () => {
    try {
      await getCsrfCookie();
      console.log(
        `[AUTH DEBUG] Checking auth at: ${axiosInstance.defaults.baseURL || ""}/user`
      );
      const response = await axiosInstance.get("/user");
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => checkAuth(), 50);
    return () => clearTimeout(timer);
  }, [checkAuth]);

  const login = async (data: LoginSchema) => {
    try {
      await getCsrfCookie();
      console.log(
        `[AUTH DEBUG] Logging in via: ${axiosInstance.defaults.baseURL || ""}/login`,
        data
      );
      await axiosInstance.post("/login", data);
      await new Promise((resolve) => setTimeout(resolve, 50));
      await checkAuth();
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await getCsrfCookie();
      await axiosInstance.post("/logout");
    } finally {
      setUser(null);
    }
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Minimal necessary addition: custom hook for consuming the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}