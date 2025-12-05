"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsChart({ rows }: { rows: any[] }) {
  // rows: [{ date, new_users, new_courses, new_enrollments }]
  const data = rows.map(r => ({ date: r.date, users: r.new_users, courses: r.new_courses, enrollments: r.new_enrollments }));

  return (
    <div className="w-full h-60">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="courses" stroke="#82ca9d" dot={false} />
          <Line type="monotone" dataKey="enrollments" stroke="#ffc658" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
