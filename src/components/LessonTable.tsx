import React from "react";

const LessonTable: React.FC = () => (
  <section className="mt-8">
  <div className="font-bold text-xl mb-4 dark:text-white">Your Lesson</div>
  <table className="w-full bg-white dark:bg-[#232336] dark:text-white rounded-xl shadow p-4 border-separate border-spacing-0">
      <thead>
  <tr className="text-gray-500 dark:text-gray-300 font-semibold text-sm">
          <th className="py-3 text-left">Mentor</th>
          <th className="py-3 text-left">Date</th>
          <th className="py-3 text-left">Course</th>
          <th className="py-3 text-left">Lesson</th>
          <th className="py-3 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-3">
            <img src="/public/man2.jpg" alt="Mentor" className="w-8 h-8 rounded-full inline-block mr-2 align-middle" /> Padhang Satio
          </td>
          <td className="py-3">21/8/2024</td>
          <td className="py-3"><span className="bg-gray-50 dark:bg-[#232336] dark:text-white text-[#6C63FF] rounded px-2 py-1 font-semibold text-xs">UI/UX DESIGN</span></td>
          <td className="py-3">Understand Of UI/UX Design</td>
          <td className="py-3"><button className="bg-[#6C63FF] text-white dark:bg-[#232336] dark:text-white rounded px-4 py-1 font-semibold">See</button></td>
        </tr>
      </tbody>
    </table>
  </section>
);

export default LessonTable;
