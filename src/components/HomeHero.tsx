import React from "react";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";

const HomeHero: React.FC = () => (
  <div className="bg-gradient-to-r from-violet-400 to-purple-400 dark:from-violet-900 dark:to-violet-950 text-white rounded-2xl p-10 shadow-xl text-center md:text-left">

    <span className="inline-block bg-white/15 text-white uppercase tracking-wide text-xs font-medium rounded-full px-3 py-1 mb-6">
      Online Courses
    </span>

    <h1 className="text-2xl md:text-3xl font-bold mb-8">
      Sharpen Your Skills with Professional Online Courses.
    </h1>

    <button className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 rounded-lg px-6 py-3 text-sm font-medium hover:bg-white/30 transition">
      <FaPlay className="w-4 h-4" />
      Join Now
    </button>
  </div>
);

export default HomeHero;
