"use client";

import Link from "next/link";
import Image from "next/image";
import { FaBookOpen, FaCertificate, FaUsers } from "react-icons/fa";
import HomeHero from "@/components/home/HomeHero";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HomeHero />

      {/* Featured Courses */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-violet-600 dark:text-indigo-300 mb-12">
          Featured Courses
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "UI/UX Design Essentials",
              desc: "Master design tools and principles for user-friendly apps.",
              img: "/assets/UI_UX_Design1.jpeg",
            },
            {
              title: "JavaScript for Beginners",
              desc: "Learn the fundamentals of modern JavaScript step by step.",
              img: "/assets/react2.jpeg",
            },
            {
              title: "Backend with Node.js",
              desc: "Build powerful APIs and scale apps with Node.js.",
              img: "/assets/react1.jpg",
            },
          ].map((course) => (
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
                  href="/courses"
                  className="mt-4 inline-block text-sm font-medium text-violet-700 dark:text-indigo-300 hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-violet-50 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-indigo-300 mb-6">
            Earn Recognized Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10">
            Stand out from the crowd with globally recognized certificates that showcase your skills.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaCertificate className="w-8 h-8" />, title: "Professional Certificates" },
              { icon: <FaBookOpen className="w-8 h-8" />, title: "Specialization Paths" },
              { icon: <FaUsers className="w-8 h-8" />, title: "Industry Mentorship" },
            ].map((cert) => (
              <div
                key={cert.title}
                className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg p-6 flex flex-col items-center"
              >
                <div className="text-violet-600 dark:text-indigo-300 mb-4">{cert.icon}</div>
                <h3 className="font-medium text-lg">{cert.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-violet-500 to-indigo-600 dark:from-violet-700 dark:to-indigo-900 text-white py-20 px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          Ready to Start Learning?
        </h2>
        <p className="text-white/90 mb-8">
          Join thousands of learners building skills for the future.
        </p>
        <Link
          href="/signup"
          className="bg-white text-violet-700 hover:bg-violet-700 hover:text-white rounded-lg px-8 py-4 font-semibold text-lg transition"
        >
          Sign Up Today
        </Link>
      </section>
    </div>
  );
}