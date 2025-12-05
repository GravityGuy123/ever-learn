"use client";

import { useState } from "react";
import { axiosInstance } from "@/lib/axios.config";

export default function AdminUsers() {
  const [email, setEmail] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    try {
      const res = await axiosInstance.post("/admin/set-roles", { email, is_instructor: isInstructor, is_admin: isAdmin });
      setMessage(res.data.detail || "Roles updated");
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || err?.message || "Error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Manage User Roles</h2>
      <div className="mb-3">
        <label className="block mb-1">User Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-3 flex items-center gap-4">
        <label className="flex items-center gap-2"><input type="checkbox" checked={isInstructor} onChange={(e) => setIsInstructor(e.target.checked)} /> Instructor</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} /> Admin</label>
      </div>
      <div>
        <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded">Update Roles</button>
      </div>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
}
