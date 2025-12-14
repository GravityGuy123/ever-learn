"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAuth, axiosInstance } from "@/context/auth-context";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import UserAvatar from "@/components/shared/UserAvatar";
import Image from "next/image";

interface FormData {
  email: string;
  username: string;
  full_name: string;
  password: string;
  avatar: File | null;
}

export default function UserSettingsPage() {
  const { user, checkAuth, loading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    full_name: "",
    password: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Initialize form when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        password: "",
        avatar: null,
      });

      setAvatarPreview(user.avatar || null);
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files?.length) {
      const file = files[0];
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const data = new FormData();
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("full_name", formData.full_name);
    if (formData.password) data.append("password", formData.password);
    if (formData.avatar) data.append("avatar", formData.avatar);

    try {
      await axiosInstance.put(`/user/${user.id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!");
      setEditing(false);
      await checkAuth();
    } catch (err: unknown) {
      console.error(err);
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.detail || "Failed to update profile");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500 dark:text-gray-400">
        Loading user data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500 dark:text-gray-400">
        Unable to load user profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">User Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="avatar"
                fill
                className="object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
                sizes="80px"
                unoptimized />
            ) : (
              <UserAvatar user={user} size={80} />
            )}
          </div>
          <label className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline">
            Change Avatar
            <input
              type="file"
              name="avatar"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Full Name */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Full Name</label>
          <input
            aria-label="Full name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Username</label>
          <input
            aria-label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Email</label>
          <input
            aria-label="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            New Password (optional)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 dark:bg-violet-700 text-white px-6 py-3 rounded-md hover:bg-violet-800 dark:hover:bg-violet-900 transition font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}