"use client";

import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export default function AdminStatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200', icon: Clock },
    approved: { color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200', icon: CheckCircle },
    rejected: { color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200', icon: XCircle },
    active: { color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200', icon: CheckCircle },
    suspended: { color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200', icon: XCircle },
    published: { color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200', icon: CheckCircle },
    draft: { color: 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200', icon: Clock },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}