import React from "react";

const StatisticCard: React.FC = () => (
  <section className="bg-gray-50 dark:bg-[#232336] dark:text-white rounded-xl p-6 mb-6">
  <div className="font-bold text-lg mb-2">Statistic</div>
  <div className="flex items-center gap-4">
  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-[#232336] flex items-center justify-center font-bold text-xl text-[#6C63FF]">72%</div>
      <div>
  <div className="font-semibold">Good Morning Jason <span>🔥</span></div>
  <div className="text-xs text-gray-500 dark:text-gray-300">Continue your learning to achieve your target!</div>
      </div>
    </div>
  <div className="flex gap-2 mt-6 items-end">
  <div className="w-8 h-10 rounded bg-[#6C63FF] dark:bg-[#232336]"></div>
  <div className="w-8 h-6 rounded bg-gray-200 dark:bg-[#232336]"></div>
  <div className="w-8 h-8 rounded bg-[#6C63FF] dark:bg-[#232336]"></div>
  <div className="w-8 h-12 rounded bg-[#6C63FF] dark:bg-[#232336]"></div>
  <div className="w-8 h-7 rounded bg-gray-200 dark:bg-[#232336]"></div>
    </div>
  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-300 mt-2">
      <span>10 Aug</span>
      <span>12 Aug</span>
      <span>16 Aug</span>
      <span>21 Aug</span>
      <span>30 Aug</span>
    </div>
  </section>
);

export default StatisticCard;
