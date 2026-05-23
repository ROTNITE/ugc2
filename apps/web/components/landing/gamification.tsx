"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Star, Users, Zap, Gift } from "lucide-react";
import { useI18n } from "@/app/i18n";
import { Card, Badge, Progress } from "@/components/ui";
import { Reveal, Float } from "@/components/motion";

const badges = [
  { icon: Star, name: "First Match", nameRu: "Первый матч", color: "from-yellow-500 to-amber-500" },
  { icon: Flame, name: "7-Day Streak", nameRu: "7 дней подряд", color: "from-orange-500 to-red-500" },
  { icon: Trophy, name: "Level 10", nameRu: "Уровень 10", color: "from-violet-500 to-purple-500" },
  { icon: Users, name: "5 Referrals", nameRu: "5 рефералов", color: "from-blue-500 to-cyan-500" },
];

export function GamificationSection() {
  const { locale } = useI18n();

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <Reveal direction="left">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-warning/10 text-warning mb-6"
              >
                <Gift className="h-6 w-6" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                {locale === "ru" ? (
                  <>
                    Зарабатывайте <span className="text-gradient">награды</span>
                  </>
                ) : (
                  <>
                    Earn <span className="text-gradient">Rewards</span>
                  </>
                )}
              </h2>

              <p className="text-lg text-muted-foreground mb-8">
                {locale === "ru"
                  ? "Получайте XP, открывайте бейджи, поддерживайте стрики и поднимайтесь в уровнях. Приглашайте друзей и получайте бонусы за каждую успешную регистрацию."
                  : "Earn XP, unlock badges, maintain streaks, and level up. Invite friends and get bonuses for every successful signup."}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {locale === "ru" ? "XP за каждое действие" : "XP for Every Action"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {locale === "ru"
                        ? "Свайпы, матчи, выполненные задания"
                        : "Swipes, matches, completed campaigns"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {locale === "ru" ? "Стрики умножают награды" : "Streaks Multiply Rewards"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {locale === "ru"
                        ? "Заходите каждый день для бонусов"
                        : "Log in daily for bonus multipliers"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {locale === "ru" ? "Реферальная программа" : "Referral Program"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {locale === "ru"
                        ? "Получайте кредиты за приглашенных друзей"
                        : "Earn credits for invited friends"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right - Visual */}
          <Reveal direction="right">
            <div className="relative">
              {/* Main Progress Card */}
              <Float>
                <Card className="p-6 max-w-sm mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {locale === "ru" ? "Текущий уровень" : "Current Level"}
                      </div>
                      <div className="text-3xl font-bold">Level 7</div>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-violet-400 flex items-center justify-center text-white text-xl font-bold">
                      7
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">XP Progress</span>
                      <span className="font-medium">2,450 / 3,000</span>
                    </div>
                    <Progress value={2450} max={3000} />
                  </div>

                  {/* Streak */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-warning/10">
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-warning" />
                      <span className="font-medium">
                        {locale === "ru" ? "Стрик" : "Streak"}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-warning">12 days</div>
                  </div>
                </Card>
              </Float>

              {/* Floating Badges */}
              <Float delay={0.3}>
                <div className="absolute -left-4 top-8 flex flex-col gap-2">
                  {badges.slice(0, 2).map((badge) => (
                    <motion.div
                      key={badge.name}
                      whileHover={{ scale: 1.1 }}
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <badge.icon className="h-6 w-6" />
                    </motion.div>
                  ))}
                </div>
              </Float>

              <Float delay={0.5}>
                <div className="absolute -right-4 bottom-16 flex flex-col gap-2">
                  {badges.slice(2).map((badge) => (
                    <motion.div
                      key={badge.name}
                      whileHover={{ scale: 1.1 }}
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <badge.icon className="h-6 w-6" />
                    </motion.div>
                  ))}
                </div>
              </Float>

              {/* Decorative */}
              <div className="absolute -top-10 right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-10 left-10 h-24 w-24 rounded-full bg-warning/10 blur-3xl" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
