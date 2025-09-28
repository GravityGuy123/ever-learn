"use client";

import { MoreVertical } from "lucide-react";
import { Bar, BarChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Data and Configuration ---
const chartData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 550 },
  { month: "Mar", value: 700 },
  { month: "Apr", value: 950 },
  { month: "May", value: 750 },
  { month: "Jun", value: 600 },
  { month: "Jul", value: 350 },
  { month: "Aug", value: 350 },
  { month: "Sep", value: 350 },
];

// Tailwind palette hex values for chart bars
const colorPalette = [
  "#bfdbfe", // blue-200
  "#93c5fd", // blue-300
  "#60a5fa", // blue-400
  "#8b5cf6", // violet-500
  "#3b82f6", // blue-500
  "#60a5fa", // blue-400
  "#93c5fd", // blue-300
  "#bfdbfe", // blue-200
  "#dbeafe", // blue-100
];

// Chart config (can stay as reference)
const chartConfig = {
  value: { label: "Value", color: "#bfdbfe" }, // blue-200
} satisfies ChartConfig;

// --- Component ---
export default function StatisticsCard() {
  const peakValue = Math.max(...chartData.map(d => d.value));

  const dataWithColor = chartData.map((item, index) => ({
    ...item,
    fill: item.value === peakValue
      ? "#7c3aed" // violet-600
      : colorPalette[index % colorPalette.length],
  }));

  return (
  <Card className="w-[300px] dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Statistics
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="h-4 w-4 text-gray-400 dark:text-gray-500 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Report</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="text-2xl bg-yellow-100 border-2 border-yellow-400 dark:bg-yellow-200 dark:border-yellow-500">
              🔥
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Badge
              className="w-fit text-sm font-bold bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-700 dark:text-green-100"
            >
              890
            </Badge>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Good Morning Gravity <span role="img" aria-label="fire">🔥</span>
            </p>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[120px] w-full">
          <BarChart
            accessibilityLayer
            data={dataWithColor}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              className="text-xs"
            />
            <Bar
              dataKey="value"
              barSize={30}
              radius={4}
              // Recharts automatically uses the 'fill' from each data item
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}