"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios.config";
import AnalyticsChart from '@/components/admin/AnalyticsChart';
import { Application } from "@/lib/types";

// Add AnalyticsRow type
type AnalyticsRow = {
  id: string;
  date: string;
  new_users: number;
  new_courses: number;
  new_enrollments: number;
};

export default function AdminDashboard() {
  const [apps, setApps] = useState<Application[]>([]);
  const [rows, setRows] = useState<AnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        // Try to fetch analytics (may return 403 for non-admins)
        try {
          const res = await axiosInstance.get<AnalyticsRow[]>("/admin/analytics/site");
          if (res.status === 200) console.log("analytics", res.data);
        } catch {
          // ignore analytics failure for non-admin users
        }

        const a = await axiosInstance.get<Application[]>("/applications");
        if (!mounted) return;
        setApps(a.data || []);
      } catch (e: unknown) {
        console.error(e);
        setError(getErrorMessage(e));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetch();
    return () => {
      mounted = false;
    };
  }, []);

  function getErrorMessage(err: unknown): string {
    if (!err) return 'Error';
    if (typeof err === 'string') return err;
    if (typeof err === 'object' && err !== null) {
      const e = err as Record<string, unknown>;
      const response = e['response'];
      if (response && typeof response === 'object') {
        const resp = response as Record<string, unknown>;
        const data = resp['data'];
        if (data && typeof data === 'object' && 'detail' in data) return String(data['detail']);
      }
      if ('message' in e) return String(e['message']);
    }
    return 'Error';
  }

  if (loading) return <div>Loading admin...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-violet-600">Admin Dashboard</h1>
        <section className="mb-6">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200">Applications</h2>
          {apps.length === 0 ? (
            <div className="mt-3 text-gray-600 dark:text-gray-300">No applications found.</div>
          ) : (
            <ul className="mt-3 space-y-3">
              {apps.map((app) => (
                <li key={app.id} className="p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{app.role} application</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {typeof app.applicant === "object" ? app.applicant.email : app.applicant || 'Unknown'}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mt-2">{app.bio}</div>
                    </div>
                    <div className="space-y-2">
                      <button
                        className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded"
                        onClick={async () => {
                          try {
                            await axiosInstance.post(`/applications/${app.id}/review`, { action: "approve" });
                            setApps(prev => prev.map(p => p.id === app.id ? { ...p, status: 'approved' } : p));
                            alert("Approved");
                          } catch (err: unknown) {
                            alert(getErrorMessage(err));
                          }
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                        onClick={async () => {
                          try {
                            await axiosInstance.post(`/applications/${app.id}/review`, { action: "reject" });
                            setApps(prev => prev.map(p => p.id === app.id ? { ...p, status: 'rejected' } : p));
                            alert("Rejected");
                          } catch (err: unknown) {
                            alert(getErrorMessage(err));
                          }
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200">Site analytics (last 30 days)</h2>
          <AnalyticsList />
        </section>
      </div>
    </div>
  );
}

function AnalyticsList() {
  const [rows, setRows] = useState<AnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await (await import('@/lib/axios.config')).axiosInstance.get<AnalyticsRow[]>('/admin/analytics/site');
        if (!mounted) return;
        setRows(res.data || []);
      } catch {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  if (loading) return <div className="mt-3">Loading analytics...</div>;
  if (rows.length === 0) return <div className="mt-3 text-sm text-gray-600">No analytics data</div>;

  return (
    <div>
      <AnalyticsChart rows={rows} />
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.id} className="p-3 border rounded bg-white dark:bg-gray-900">
            <div className="text-sm text-gray-500">{r.date}</div>
            <div className="font-medium">New users: {r.new_users} • New courses: {r.new_courses} • New enrollments: {r.new_enrollments}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}