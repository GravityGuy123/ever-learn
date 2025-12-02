"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function ProgressOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
    >
      <motion.div whileHover={{ scale: 1.03 }} className="transition-transform">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-course-primary">15</div>
            <div className="text-sm text-muted-foreground">Total Lessons</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} className="transition-transform">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-stat-green">8</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} className="transition-transform">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-course-secondary">3</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} className="transition-transform">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-stat-blue">75%</div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}