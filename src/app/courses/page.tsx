"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const courses = [
  {
    title: "UI/UX Design Essentials",
    desc: "Master design tools and principles for user-friendly apps.",
    img: "/assets/UI_UX_Design1.jpg",
  },
  {
    title: "JavaScript for Beginners",
    desc: "Learn the fundamentals of modern JavaScript step by step.",
    img: "/assets/react2.jpg",
  },
  {
    title: "Backend with Node.js",
    desc: "Build powerful APIs and scale apps with Node.js.",
    img: "/assets/react1.jpg",
  },
  {
    title: "React & Next.js Mastery",
    desc: "Build modern, production-ready apps with React and Next.js.",
    img: "/assets/react3.webp",
  },
  {
    title: "Python for Data Science",
    desc: "Analyze data, build models, and visualize insights with Python.",
    img: "/assets/python_ds1.jpg",
  },
  {
    title: "Machine Learning Basics",
    desc: "Understand ML concepts and build beginner-friendly models.",
    img: "/assets/machine_learning1.jpeg",
  },
  {
    title: "Cloud Computing with AWS",
    desc: "Deploy and manage apps in the cloud with AWS essentials.",
    img: "/assets/aws_cloud1.jpg",
  },
  {
    title: "Database Design & SQL",
    desc: "Master relational databases, queries, and optimization.",
    img: "/assets/sql1.webp",
  },
  {
    title: "Cybersecurity Fundamentals",
    desc: "Protect systems and data with modern security practices.",
    img: "/assets/cybersecurity1.webp",
  },
  {
    title: "Mobile Development with Flutter",
    desc: "Build beautiful cross-platform apps using Flutter & Dart.",
    img: "/assets/mobile1.webp",
  },
  {
    title: "Business Analytics with Excel",
    desc: "Turn raw data into actionable insights with Excel tools.",
    img: "/assets/excel1.jpg",
  },
  {
    title: "Artificial Intelligence Concepts",
    desc: "Explore AI applications, neural networks, and future trends.",
    img: "/assets/ai1.jpg",
  },
];

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-violet-600 dark:text-indigo-300 mb-4">
          Explore Our Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Learn at your own pace with expert-led courses across design, programming, business, data, and more.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.title}
            className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <Image
              src={course.img}
              alt={course.title}
              width={400}
              height={200}
              className="h-40 w-full object-cover"
            />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg text-violet-600 dark:text-indigo-300 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 flex-1">{course.desc}</p>
              <Link
                href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="mt-4 inline-block text-sm font-medium text-violet-700 dark:text-indigo-300 hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}