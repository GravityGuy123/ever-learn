"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function CategoryFilter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex gap-3 mb-6 overflow-x-auto pb-2"
    >
      <Badge
        variant="default"
        className="whitespace-nowrap cursor-pointer transition-colors hover:scale-105 bg-course-primary text-white"
      >
        All
      </Badge>

      <Badge
        variant="outline"
        className="whitespace-nowrap cursor-pointer transition-colors hover:scale-105"
      >
        React Development
      </Badge>

      <Badge
        variant="outline"
        className="whitespace-nowrap cursor-pointer transition-colors hover:scale-105"
      >
        UI/UX Design
      </Badge>

      <Badge
        variant="outline"
        className="whitespace-nowrap cursor-pointer transition-colors hover:scale-105"
      >
        Branding
      </Badge>

      <Badge
        variant="outline"
        className="whitespace-nowrap cursor-pointer transition-colors hover:scale-105"
      >
        Web Development
      </Badge>
    </motion.div>
  );
}