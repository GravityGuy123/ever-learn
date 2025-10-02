import React from "react";
import Image from "next/image";

export default function MentorList() {
  return (
    <section className="mb-6">
      <div className="font-bold text-xl mb-4 dark:text-white">Your mentor</div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/man2.jpg"
            alt="Mentor"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div className="flex-1">
            <div className="font-semibold dark:text-white">Padhang Satio</div>
            <div className="text-xs text-gray-500 dark:text-gray-300">
              Mentor
            </div>
          </div>
          <button className="bg-violet-700 dark:bg-[#232336] dark:text-white text-white rounded px-4 py-1 font-semibold">
            Following
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/woman1.jpg"
            alt="Mentor"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div className="flex-1">
            <div className="font-semibold">Zaki Heitsperi</div>
            <div className="text-xs text-gray-500">Mentor</div>
          </div>
          <button className="bg-gray-800 text-white rounded px-4 py-1 font-semibold">
            Follow
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/man1.jpg"
            alt="Mentor"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div className="flex-1">
            <div className="font-semibold">Leonardo Samuel</div>
            <div className="text-xs text-gray-500">Mentor</div>
          </div>
          <button className="bg-gray-800 text-white rounded px-4 py-1 font-semibold">
            Follow
          </button>
        </div>
      </div>
      <button className="bg-violet-600 dark:bg-gray-700 text-white dark:text-white hover:bg-violet-700 transition rounded w-full py-2 font-semibold mt-4">
        See All
      </button>
    </section>
  );
}
