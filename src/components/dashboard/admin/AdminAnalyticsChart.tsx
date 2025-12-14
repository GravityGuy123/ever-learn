"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface AnalyticsRow {
  id: string;
  date: string;
  new_users: number;
  new_courses: number;
  new_enrollments: number;
}

interface AdminAnalyticsChartProps {
  rows: AnalyticsRow[];
}

export default function AdminAnalyticsChart({ rows }: AdminAnalyticsChartProps) {
  const labels = rows.map((row) => row.date);
  const userData = rows.map((row) => row.new_users);
  const courseData = rows.map((row) => row.new_courses);
  const enrollmentData = rows.map((row) => row.new_enrollments);

  const data = {
    labels,
    datasets: [
      {
        label: "New Users",
        data: userData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.4,
      },
      {
        label: "New Courses",
        data: courseData,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.3)",
        tension: 0.4,
      },
      {
        label: "New Enrollments",
        data: enrollmentData,
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        position: "top" as const, 
        labels: { color: "#fff" } // legend labels color
      },
      title: { 
        display: true, 
        text: "Recent Analytics", 
        color: "#fff", 
        font: { size: 18 } 
      },
      tooltip: {
        titleColor: "#fff",
        bodyColor: "#fff",
        backgroundColor: "rgba(0,0,0,0.7)",
      },
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  return <Line data={data} options={options} />;
}