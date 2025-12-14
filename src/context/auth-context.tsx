"use client";

import React, { createContext, useState, useCallback, useEffect, useContext } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { LoginSchema } from "@/lib/schema";

interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  avatar?: string;
  is_email_verified: boolean;
  is_student?: boolean;
  is_tutor?: boolean;
  is_moderator?: boolean;
  is_admin?: boolean;
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

// ------------------- Axios Instance -------------------
export const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Cookie helper
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

// CSRF Interceptor
axiosInstance.interceptors.request.use((config) => {
  const unsafe = ["post", "put", "patch", "delete"];
  if (unsafe.includes(config.method?.toLowerCase() || "")) {
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

// Refresh queue
interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// ------------------- Response Interceptor -------------------
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      isRefreshing = true;

      try {
        await axiosInstance.post("/refresh");
        isRefreshing = false;
        processQueue(null, "OK");
        return axiosInstance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err as AxiosError, null);

        // Logout on refresh failure
        const authContext = useContext(AuthContext);
        authContext?.logout?.();

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// ------------------- Auth Provider -------------------
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getCsrfCookie = async () => {
    try {
      const res = await axiosInstance.get("/csrf/");
      if (res?.data?.csrfToken) {
        axiosInstance.defaults.headers["X-CSRFToken"] = res.data.csrfToken;
      }
    } catch (e) {
      console.warn("Failed to fetch CSRF token", e);
    }
  };

  const checkAuth = useCallback(async () => {
    try {
      await getCsrfCookie();
      const response = await axiosInstance.get("/user");
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize auth on mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      await getCsrfCookie();
      await checkAuth();
    };
    initAuth();
  }, [checkAuth]);

  // ------------------- Silent Refresh Poll -------------------
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await axiosInstance.post("/refresh"); // silently refresh cookie
        await checkAuth(); // optionally update user data
      } catch (err) {
        console.warn("Silent refresh failed", err);
        setUser(null); // force logout on failure
      }
    }, 4 * 60 * 1000); // every 4 minutes

    return () => clearInterval(interval);
  }, [checkAuth]);

  const login = async (data: LoginSchema) => {
    try {
      await getCsrfCookie();
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

// ------------------- Custom Hook -------------------
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}