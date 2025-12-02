"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export default function LessonsSearchFilter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex gap-4 mb-6"
    >
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input placeholder="Search lessons..." className="pl-10" />
      </div>
      <Button
        variant="outline"
        className="flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <Filter className="w-4 h-4" /> Filter
      </Button>
    </motion.div>
  );
}