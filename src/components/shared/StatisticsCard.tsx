"use client";

import React, { useEffect, useState } from "react";
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
import { useAuth } from "@/hooks/useAuth";

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

const colorPalette = [
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#8b5cf6",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
  "#dbeafe",
];

const chartConfig = {
  value: { label: "Value", color: "#bfdbfe" },
} satisfies ChartConfig;

export default function StatisticsCard() {
  const [greeting, setGreeting] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  const peakValue = Math.max(...chartData.map((d) => d.value));

  const dataWithColor = chartData.map((item, index) => ({
    ...item,
    fill:
      item.value === peakValue
        ? "#7c3aed"
        : colorPalette[index % colorPalette.length],
  }));

  return (
    // <div className="px-6 py-8 lg:py-8 lg:px-0 lg:pl-6 lg:pr-6 lg:sticky lg:top-24">
      <div className="mb-4">
        <Card className="w-full dark:bg-gray-800">
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
                <Badge className="w-fit text-sm font-bold bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-700 dark:text-green-100">
                  890
                </Badge>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  {greeting} <span>{user?.username}</span>
                  <span role="img" aria-label="fire">🔥</span>
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
                <Bar dataKey="value" barSize={30} radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    // </div>
  );
}