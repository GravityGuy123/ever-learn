"use client";

import React, { useEffect, useState } from "react";
import AdminStatusBadge from "./AdminStatusBadge";
import { FileText, CheckCircle, XCircle, Download, Search, User } from "lucide-react";
import { axiosInstance } from "@/lib/axios.config";
import UserAvatar from "@/components/shared/UserAvatar";

interface UserInfo {
  id: string;
  full_name: string;
  email: string;
  username: string;
  avatar?: string | null;
}

interface Application {
  id: string;
  applicant: UserInfo;
  role: string;
  status: "pending" | "approved" | "rejected";
  bio?: string;
  submitted_at: string;
  reviewed_at?: string;
  approved_at?: string;
  reviewer?: UserInfo | null;
}

export default function AdminApplicationsTab() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

  // Fetch applications dynamically
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Application[]>("/applications");
        setApps(response.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleApplicationAction = async (id: string, action: "approve" | "reject") => {
    try {
      await axiosInstance.post(`/applications/${id}/review`, { action });
      setApps((prev) =>
        prev.map((app) =>
          app.id === id
            ? {
                ...app,
                status: action === "approve" ? "approved" : "rejected",
                approved_at: action === "approve" ? new Date().toISOString() : undefined,
              }
            : app
        )
      );
    } catch (err) {
      console.error("Failed to update application:", err);
    }
  };

  const exportData = () => {
    const csv = [
      ["ID", "Applicant", "Role", "Status", "Bio", "Reviewer", "Submitted At", "Reviewed At", "Approved At"],
      ...apps.map((a) => [
        a.id,
        `${a.applicant.full_name} (${a.applicant.email})`,
        a.role,
        a.status,
        a.bio || "",
        a.reviewer ? `${a.reviewer.full_name} (${a.reviewer.email})` : "",
        a.submitted_at,
        a.reviewed_at || "",
        a.approved_at || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredApps = apps.filter((app) => {
    const searchTarget = app.applicant.email + app.applicant.full_name + app.role;
    const matchesSearch = searchTerm === "" || searchTarget.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading applications...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Instructor Applications</h2>
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
        >
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "all" | "pending" | "approved" | "rejected")}
          aria-label="Filter applications by status"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredApps.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">No applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col sm:flex-row sm:justify-between gap-4"
            >
              <div className="flex flex-col gap-2 flex-1">
                <h3
                  className={`text-lg font-semibold flex items-center gap-3 capitalize ${
                    app.role === "tutor"
                      ? "text-blue-600 dark:text-blue-400"
                      : app.role === "moderator"
                      ? "text-purple-600 dark:text-purple-400"
                      : app.role === "admin"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {app.role} Application <AdminStatusBadge status={app.status} />
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <UserAvatar user={app.applicant} size={48} className="mr-1" />
                  <span>
                    {app.applicant.full_name} ({app.applicant.email})
                  </span>
                </div>

                {app.reviewer && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <User className="w-4 h-4" /> Reviewed by: {app.reviewer.full_name} ({app.reviewer.email})
                  </div>
                )}

                {app.bio && <p className="text-gray-700 dark:text-gray-300">{app.bio}</p>}

                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <span>Submitted: {new Date(app.submitted_at).toLocaleString()}</span>
                  {app.reviewed_at && <span>Reviewed: {new Date(app.reviewed_at).toLocaleString()}</span>}
                  {app.status === "approved" && app.approved_at && (
                    <span>Approved: {new Date(app.approved_at).toLocaleString()}</span>
                  )}
                </div>
              </div>

              {app.status === "pending" && (
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleApplicationAction(app.id, "approve")}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => handleApplicationAction(app.id, "reject")}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}