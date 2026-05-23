"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/app";
import { CreatorFeed, FeedFilters } from "@/components/feed";
import { Sparkles, TrendingUp, Users } from "lucide-react";

export default function FeedPage() {
  return (
    <AppShell userType="brand">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Найти креаторов
          </h1>
          <p className="text-muted-foreground">
            Свайпайте вправо, чтобы отправить заявку понравившимся креаторам
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { icon: Users, label: "Креаторов", value: "12,450+" },
            { icon: TrendingUp, label: "Avg ER", value: "4.8%" },
            { icon: Sparkles, label: "Категорий", value: "25+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-4 text-center"
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FeedFilters />
        </motion.div>

        {/* Feed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CreatorFeed />
        </motion.div>
      </div>
    </AppShell>
  );
}
