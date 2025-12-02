"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";

export default function CurrentLessonHighlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="mb-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="bg-gray-200 text-gray-800 dark:bg-white/20 dark:text-white hover:bg-gray-300 dark:hover:bg-white/30 mb-3">
                CONTINUE LEARNING
              </Badge>
              <h2 className="text-xl font-bold mb-2">
                State Management with React Hooks
              </h2>
              <p className="text-gray-700 dark:text-white/90 mb-4">
                Continue where you left off - 65% completed
              </p>
              <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1 }}>
                <Progress value={65} className="w-64 h-2 mb-4 bg-gray-200 dark:bg-white/20" />
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="bg-violet-700 text-white hover:bg-blue-700 dark:bg-white/20 dark:text-white dark:hover:bg-white/30">
                <Play className="w-4 h-4 mr-2" /> Continue Lesson
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}