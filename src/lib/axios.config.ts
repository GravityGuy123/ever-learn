import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Cookie Helper
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

// Types for retry queue
interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

// Process queue when refresh completes
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

// Response Interceptor – Auto Refresh + Retry
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      isRefreshing = true;

      try {
        // Refresh the token (cookie-based)
        await axiosInstance.post("/refresh");

        isRefreshing = false;
        processQueue(null, "OK");

        // Retry original request
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