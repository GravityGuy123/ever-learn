import React from "react";
import Image from "next/image"

export default function LessonTable () {

   return (
    <section className="mt-8">
      <div className="font-bold text-xl mb-4 dark:text-white">Your Lesson</div>
      <table className="w-full bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition p-4 border-separate border-spacing-0">
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
              <Image
                src="/man1.jpg"
                alt="Mentor"
                width={600}
                height={400}
                className="w-8 h-8 rounded-full inline-block mr-2 align-middle"
              /> Padhang Satio
            </td>
            <td className="py-3">21/8/2024</td>
            {/* text-violet-400 dark:text-indigo-200 */}
            <td className="py-3"><span className="bg-gray-200 dark:bg-violet-700 dark:text-white text-violet-400 rounded px-2 py-1 font-semibold text-xs">UI/UX DESIGN</span></td>
            <td className="py-3">Understand Of UI/UX Design</td>
            <td className="py-3"><button className="bg-violet-600 dark:bg-indigo-400 text-white hover:bg-violet-700 dark:hover:bg-indigo-500 rounded px-4 py-1 font-semibold">See</button></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}