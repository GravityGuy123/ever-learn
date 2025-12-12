"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomeHero() {
  return (
    <section className="relative bg-gradient-to-r from-violet-600 to-indigo-700 dark:from-violet-700 dark:to-indigo-900 text-white py-28 overflow-hidden">
      
      {/* Background Image and overlay */}
      <div className="absolute inset-0 opacity-30-">
        <Image
          src="/hero-learning.jpg"
          alt="Learning Banner"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-heading font-bold text-5xl md:text-6xl leading-tight">
            {/* Transform Your Future with Online Learning */}
            Unlock Your Potential with Online Learning 🚀
          </h1>

          <p className="text-lg md:text-xl text-white/90">
            Gain in-demand skills, learn from expert tutors, and earn globally recognized
            certifications — all at your own pace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {/* Primary Button */}
            <Button
                size="lg"
                className="bg-white text-violet-700 hover:bg-violet-700 hover:text-white font-semibold shadow-md hover:shadow-xl transition-all px-8 py-4 border border-violet-200" >
                <Link href="/courses" className="flex items-center gap-2">
                    Explore Courses
                </Link>
            </Button>

            {/* Secondary Button */}
            <Button
                size="lg"
                variant="outline"
                className="bg-violet-700 text-white border border-white/40 hover:bg-white hover:text-violet-700 hover:border-violet-600 shadow-md hover:shadow-xl transition-all px-8 py-4 backdrop-blur-sm" >
                    <Link href="/about" className="flex items-center gap-2">
                        Learn More
                    </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}