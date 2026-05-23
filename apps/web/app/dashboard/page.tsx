"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Calendar,
  Target,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/app";
import { Button, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Активные кампании",
    value: "8",
    change: "+2",
    trend: "up" as const,
    icon: Target,
    color: "text-primary",
  },
  {
    label: "Всего просмотров",
    value: "1.2M",
    change: "+15%",
    trend: "up" as const,
    icon: Eye,
    color: "text-blue-500",
  },
  {
    label: "Заявки креаторов",
    value: "156",
    change: "+24",
    trend: "up" as const,
    icon: Users,
    color: "text-green-500",
  },
  {
    label: "Потрачено",
    value: "₽485K",
    change: "-5%",
    trend: "down" as const,
    icon: DollarSign,
    color: "text-yellow-500",
  },
];

const recentCampaigns = [
  {
    id: "1",
    title: "Летняя коллекция 2024",
    status: "active",
    budget: 150000,
    spent: 89000,
    applications: 45,
    views: 320000,
    deadline: "2024-07-15",
  },
  {
    id: "2",
    title: "Запуск нового продукта",
    status: "active",
    budget: 200000,
    spent: 120000,
    applications: 67,
    views: 520000,
    deadline: "2024-06-30",
  },
  {
    id: "3",
    title: "Распродажа Black Friday",
    status: "draft",
    budget: 100000,
    spent: 0,
    applications: 0,
    views: 0,
    deadline: "2024-11-25",
  },
];

const topCreators = [
  {
    id: "1",
    name: "Анна С.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    followers: "125K",
    engagement: "4.8%",
    campaigns: 3,
  },
  {
    id: "2",
    name: "Максим П.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    followers: "89K",
    engagement: "5.2%",
    campaigns: 2,
  },
  {
    id: "3",
    name: "Екатерина В.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    followers: "210K",
    engagement: "6.1%",
    campaigns: 4,
  },
];

const statusColors = {
  active: "bg-green-500/10 text-green-500",
  draft: "bg-yellow-500/10 text-yellow-500",
  completed: "bg-blue-500/10 text-blue-500",
  paused: "bg-gray-500/10 text-gray-500",
};

const statusLabels = {
  active: "Активна",
  draft: "Черновик",
  completed: "Завершена",
  paused: "На паузе",
};

export default function DashboardPage() {
  return (
    <AppShell userType="brand">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Дашборд</h1>
            <p className="text-muted-foreground">
              Обзор ваших кампаний и активности
            </p>
          </div>
          <Link href="/campaigns/new">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Создать кампанию
            </Button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      "bg-muted"
                    )}
                  >
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Campaigns List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Недавние кампании
                  </h2>
                  <Link
                    href="/campaigns"
                    className="text-sm text-primary hover:underline"
                  >
                    Все кампании
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-border">
                {recentCampaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground truncate">
                            {campaign.title}
                          </h3>
                          <span
                            className={cn(
                              "px-2 py-0.5 text-xs font-medium rounded-full",
                              statusColors[campaign.status as keyof typeof statusColors]
                            )}
                          >
                            {statusLabels[campaign.status as keyof typeof statusLabels]}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {campaign.spent.toLocaleString()} / {campaign.budget.toLocaleString()} ₽
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {campaign.applications} заявок
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(campaign.deadline).toLocaleDateString("ru")}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/campaigns/${campaign.id}`}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    </div>
                    {/* Progress Bar */}
                    {campaign.budget > 0 && (
                      <div className="mt-3">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(campaign.spent / campaign.budget) * 100}%`,
                            }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Top Creators */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">
                  Топ креаторы
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {topCreators.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {creator.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {creator.followers} подписчиков · {creator.engagement} ER
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {creator.campaigns}
                      </p>
                      <p className="text-xs text-muted-foreground">кампаний</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <Link href="/creators">
                  <Button variant="outline" className="w-full">
                    Найти креаторов
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Быстрые действия
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: PlusCircle, label: "Новая кампания", href: "/campaigns/new" },
                { icon: Users, label: "Найти креаторов", href: "/creators" },
                { icon: MessageCircle, label: "Сообщения", href: "/chat" },
                { icon: BarChart3, label: "Аналитика", href: "/analytics" },
              ].map((action) => (
                <Link key={action.href} href={action.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <action.icon className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium text-foreground text-center">
                      {action.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </AppShell>
  );
}
