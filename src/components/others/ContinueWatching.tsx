"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContinueWatching() {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-6 font-bold text-xl dark:text-white">
        <h2>Continue Watching</h2>
        <Button variant="ghost" className="text-muted-foreground">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Grid with centered items on small screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:text-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02] p-4 flex flex-col max-w-[320px] w-full">
          <div className="relative mb-3">
            <Image
              src="/assets/course1.jpg"
              alt="Course"
              width={600}
              height={400}
              className="w-full rounded-lg object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="text-[#6C63FF] font-semibold text-xs">FRONTEND</div>
          <div className="font-semibold my-2">
            {`Beginner's Guide to Becoming a Professional Front-End Developer`}
          </div>
          {/* Instructor + Rating */}
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/woman1.jpg"
              alt="Leonardo Samuel"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-500">Leonardo Samuel</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="text-xs">⭐</span>
              <span className="text-xs font-medium">4.8</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-[#6C63FF] h-2 rounded-full w-2/3"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02] p-4 flex flex-col max-w-[320px] w-full">
          <div className="relative mb-3">
            <Image
              src="/assets/course2.jpg"
              alt="Course"
              width={600}
              height={400}
              className="w-full rounded-lg object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="text-[#6C63FF] font-semibold text-xs">UI/UX DESIGN</div>
          <div className="font-semibold my-2">
            {`Optimizing User Experience with the Best UI/UX Design`}
          </div>
          {/* Instructor + Rating */}
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/man2.jpg"
              alt="Bayu Satio"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-500">Bayu Satio</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="text-xs">⭐</span>
              <span className="text-xs font-medium">4.6</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-[#6C63FF] h-2 rounded-full w-1/2"></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02] p-4 flex flex-col max-w-[320px] w-full">
          <div className="relative mb-3">
            <Image
              src="/assets/course3.jpg"
              alt="Course"
              width={600}
              height={400}
              className="w-full rounded-lg object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="text-[#FF6C63] font-semibold text-xs">BRANDING</div>
          <div className="font-semibold my-2">
            {`Reviving and Refresh Company Image`}
          </div>
          {/* Instructor + Rating */}
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/woman2.jpg"
              alt="Padhang Satio"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-500">Padhang Satio</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="text-xs">⭐</span>
              <span className="text-xs font-medium">4.9</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-[#FF6C63] h-2 rounded-full w-4/5"></div>
          </div>
        </div>
      </div>
    </section>
  );
}