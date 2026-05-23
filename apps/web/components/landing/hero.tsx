"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useI18n } from "@/app/i18n";
import { Button } from "@/components/ui";
import { Float, Reveal } from "@/components/motion";

export function HeroSection() {
  const { t, locale } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
            >
              <Sparkles className="h-4 w-4" />
              {locale === "ru" ? "UGC Маркетплейс #1 в СНГ" : "The #1 UGC Marketplace in CIS"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance"
            >
              {locale === "ru" ? (
                <>
                  Где бренды
                  <br />
                  <span className="text-gradient">встречают креаторов</span>
                </>
              ) : (
                <>
                  Where Brands
                  <br />
                  <span className="text-gradient">Meet Creators</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty"
            >
              {locale === "ru"
                ? "Связываем бренды с микро-креаторами для создания коротких видео. Безопасные сделки, Tinder-матчинг, от 500 рублей."
                : "Connect with micro-creators for short-form video campaigns. Secure escrow payments, Tinder-style matching, starting from 500 RUB."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link href="/signup?role=creator">
                <Button size="lg" className="w-full sm:w-auto group">
                  {locale === "ru" ? "Я креатор" : "I'm a Creator"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/signup?role=brand">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {locale === "ru" ? "Я бренд" : "I'm a Brand"}
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                {locale === "ru" ? "10,000+ креаторов" : "10,000+ creators"}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {locale === "ru" ? "Escrow платежи" : "Escrow payments"}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-warning" />
                {locale === "ru" ? "От 500₽ за видео" : "From 500₽ per video"}
              </div>
            </motion.div>
          </div>

          {/* Right - Hero Visual */}
          <div className="relative hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-muted-foreground"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* Main Card - Video Feed */}
      <Float delay={0}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative w-64 h-[420px] rounded-3xl bg-card border border-border shadow-2xl overflow-hidden"
        >
          {/* Video Preview Area */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-violet-500/10 to-indigo-500/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Play className="h-8 w-8 text-white fill-white" />
            </motion.div>
          </div>
          {/* Bottom Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="space-y-2">
              <div className="h-3 w-32 bg-white/80 rounded" />
              <div className="h-2 w-24 bg-white/50 rounded" />
              <div className="flex items-center gap-2 mt-3">
                <div className="px-2 py-1 rounded-full bg-primary text-white text-xs font-medium">
                  700₽
                </div>
                <div className="px-2 py-1 rounded-full bg-white/20 text-white text-xs">
                  TikTok
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Float>

      {/* Floating Chat Card */}
      <Float delay={0.3}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute -right-8 top-16 w-56 p-4 rounded-2xl bg-card border border-border shadow-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-violet-400" />
            <div>
              <div className="h-2.5 w-20 bg-foreground/80 rounded" />
              <div className="h-2 w-14 bg-muted-foreground/50 rounded mt-1" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="p-2 rounded-lg bg-muted text-xs text-muted-foreground">
              Let&apos;s discuss the brief!
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-xs text-primary ml-auto w-fit">
              Sounds great!
            </div>
          </div>
        </motion.div>
      </Float>

      {/* Floating Match Card */}
      <Float delay={0.6}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="absolute -left-12 bottom-20 w-48 p-4 rounded-2xl bg-card border border-border shadow-xl"
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-success">
            <Sparkles className="h-4 w-4" />
            It&apos;s a Match!
          </div>
          <div className="flex justify-center -space-x-3 mt-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-400 to-primary border-2 border-card" />
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 border-2 border-card" />
          </div>
        </motion.div>
      </Float>

      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />
    </div>
  );
}
