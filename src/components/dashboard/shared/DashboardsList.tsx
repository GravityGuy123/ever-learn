"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/lib/types";

export default function DashboardsList() {
    const { user } = useAuth() as { user: UserRole | null };

  // Defensive: user may contain boolean flags returned from backend
    const hasStudent = Boolean(user?.is_student);
    const hasTutor = Boolean(user?.is_tutor);
    const hasModerator = Boolean(user?.is_moderator);
    const hasAdmin = Boolean(user?.is_admin || user?.is_staff);

    const dashboards = [
        { key: "general", label: "General", show: true, href: "/dashboard" },
        { key: "student", label: "Student", show: hasStudent, href: "/dashboard/student" },
        { key: "tutor", label: "Tutor", show: hasTutor, href: "/dashboard/tutor" },
        { key: "moderator", label: "Moderator", show: hasModerator, href: "/dashboard/moderator" },
        { key: "admin", label: "Admin", show: hasAdmin, href: "/dashboard/admin" },
    ].filter(Boolean);

    const available = dashboards.filter((d) => d.show).length;

    return (
        <div className="mb-4">
        <div className="px-3 py-2 text-xs text-muted-foreground font-semibold">Dashboards ({available})</div>
        <ul className="space-y-1">
            {dashboards.map((d) => (
            d.show && (
                <li key={d.key}>
                <Link href={d.href} className="block px-3 py-2 hover:bg-muted rounded">{d.label}</Link>
                </li>
            )
            ))}
        </ul>
        </div>
    );
}
