"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LessonsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-foreground mb-2">Lessons</h1>
      <p className="text-muted-foreground">
        Continue your learning journey with our comprehensive courses
      </p>
    </motion.div>
  );
}