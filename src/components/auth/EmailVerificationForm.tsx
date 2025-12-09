"use client";

import { useState } from "react";
import { axiosInstance } from "@/lib/axios.config";
import type { AxiosError } from "axios";

export default function EmailVerificationForm({
  email,
  onVerified,
}: {
  email: string;
  onVerified?: () => void;
}) {
  const [status, setStatus] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const sendCode = async () => {
    setSending(true);
    setStatus(null);
    try {
      const res = await axiosInstance.post("/email/send-code", { email });
      if (res.status === 201) setStatus("Verification code sent to your email");
      else setStatus("Unexpected response");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      setStatus(
        axiosErr.response?.data?.detail ||
          axiosErr.message ||
          "Error sending code"
      );
    } finally {
      setSending(false);
    }
  };

  const verify = async () => {
    setVerifying(true);
    setStatus(null);
    try {
      const res = await axiosInstance.post("/email/verify", { email, code });
      if (res.status === 200) {
        setStatus("Email verified");
        onVerified?.();
      } else {
        setStatus("Invalid code");
      }
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      setStatus(
        axiosErr.response?.data?.detail ||
          axiosErr.message ||
          "Error verifying code"
      );
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Email verification
        </div>
        <div className="text-xs text-gray-500">{email}</div>
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-violet-600 text-white rounded"
          onClick={sendCode}
          disabled={sending}
        >
          {sending ? "Sending..." : "Send code"}
        </button>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="p-2 border rounded flex-1"
        />

        <button
          className="px-3 py-1 bg-violet-600 text-white rounded"
          onClick={verify}
          disabled={verifying}
        >
          {verifying ? "Verifying..." : "Verify"}
        </button>
      </div>

      {status && <div className="mt-3 text-sm text-gray-600">{status}</div>}
    </div>
  );
}