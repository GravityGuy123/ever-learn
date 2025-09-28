import React from "react";
const ContinueWatching: React.FC = () => (
  <section className="mb-6">
  <div className="font-bold text-xl mb-4 dark:text-white">Continue Watching</div>
  <div className="flex gap-6">
      {/* Example course cards */}
  <div className="bg-white dark:bg-[#232336] dark:text-white rounded-xl shadow w-[220px] p-4 flex flex-col">
        <img src="/public/woman1.jpg" alt="Course" className="w-full rounded-lg mb-3" />
        <div className="text-[#6C63FF] font-semibold text-xs">FRONTEND</div>
        <div className="font-semibold my-2">Beginner's Guide to Becoming a Professional Front-End Developer</div>
        <div className="text-xs text-gray-500">Leonardo Samuel · Mentor</div>
      </div>
      <div className="bg-white rounded-xl shadow w-[220px] p-4 flex flex-col">
        <img src="/public/man2.jpg" alt="Course" className="w-full rounded-lg mb-3" />
        <div className="text-[#6C63FF] font-semibold text-xs">UI/UX DESIGN</div>
        <div className="font-semibold my-2">Optimizing User Experience with the Best UI/UX Design</div>
        <div className="text-xs text-gray-500">Bayu Satio · Mentor</div>
      </div>
      <div className="bg-white rounded-xl shadow w-[220px] p-4 flex flex-col">
        <img src="/public/woman2.jpg" alt="Course" className="w-full rounded-lg mb-3" />
        <div className="text-[#FF6C63] font-semibold text-xs">BRANDING</div>
        <div className="font-semibold my-2">Reviving and Refresh Company Image</div>
        <div className="text-xs text-gray-500">Padhang Satio · Mentor</div>
      </div>
    </div>
  </section>
);

export default ContinueWatching;
