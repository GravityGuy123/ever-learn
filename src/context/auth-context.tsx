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
  withCredentials: true, // HTTP-only cookies sent automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------- CSRF Handling -------------------
let csrfToken: string | null = null;

const fetchCsrfToken = async () => {
  try {
    const res = await axiosInstance.get("/csrf/");
    csrfToken = res.data?.csrfToken || null;
  } catch (err) {
    console.warn("Failed to fetch CSRF token", err);
  }
};

// Attach CSRF token to unsafe requests
axiosInstance.interceptors.request.use((config) => {
  const unsafeMethods = ["post", "put", "patch", "delete"];
  if (unsafeMethods.includes(config.method?.toLowerCase() || "") && csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

// ------------------- Refresh queue -------------------
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
        await axiosInstance.post("/refresh"); // cookie sent automatically
        await fetchCsrfToken(); // fetch fresh CSRF token after refresh
        isRefreshing = false;
        processQueue(null, "OK");

        return axiosInstance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err as AxiosError, null);
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

  const checkAuth = useCallback(async () => {
    try {
      if (!csrfToken) await fetchCsrfToken(); // fetch CSRF if not set
      const response = await axiosInstance.get("/current-user");
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize auth on mount
  useEffect(() => {
    setLoading(true);
    checkAuth();
  }, [checkAuth]);

  // --------------- Silent Refresh Poll Every 7 Minutes ---------------
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await axiosInstance.post("/refresh"); // rotate JWT cookie
        await fetchCsrfToken(); // fetch fresh CSRF token
        await checkAuth(); // update user data
      } catch {
        setUser(null); // force logout on failure
      }
    }, 7 * 60 * 1000); // every 7 minutes

    return () => clearInterval(interval);
  }, [checkAuth]);

  const login = async (data: LoginSchema) => {
    if (!csrfToken) await fetchCsrfToken();
    await axiosInstance.post("/login", data);
    await fetchCsrfToken(); // refresh CSRF after login
    await checkAuth();
  };

  const logout = async () => {
    if (!csrfToken) await fetchCsrfToken();
    await axiosInstance.post("/logout");
    setUser(null);
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