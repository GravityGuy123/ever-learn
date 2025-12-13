// src/components/dashboard/shared/DashboardsList.tsx
"use client";

import React from "react";

interface DashboardsListProps {
  currentRole?: string;
}

const DashboardsList: React.FC<DashboardsListProps> = ({ currentRole }) => {
  return (
    <div className="space-y-2">
      <p>Current role: {currentRole}</p>
      {/* Render the dashboard links here */}
    </div>
  );
};

export default DashboardsList;
