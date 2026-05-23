"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/app/i18n";
import { Button } from "@/components/ui";
import { Reveal } from "@/components/motion";

export function CTASection() {
  const { locale } = useI18n();

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 text-primary mb-8"
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {locale === "ru" ? (
              <>
                Готовы <span className="text-gradient">начать</span>?
              </>
            ) : (
              <>
                Ready to <span className="text-gradient">Get Started</span>?
              </>
            )}
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {locale === "ru"
              ? "Присоединяйтесь к тысячам креаторов и брендов, которые уже используют ROTNITE для создания потрясающего контента."
              : "Join thousands of creators and brands already using ROTNITE to create amazing content together."}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
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

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div>{locale === "ru" ? "Бесплатная регистрация" : "Free to sign up"}</div>
            <div className="h-1 w-1 rounded-full bg-border" />
            <div>{locale === "ru" ? "Без скрытых комиссий" : "No hidden fees"}</div>
            <div className="h-1 w-1 rounded-full bg-border" />
            <div>{locale === "ru" ? "Начните за 2 минуты" : "Start in 2 minutes"}</div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
