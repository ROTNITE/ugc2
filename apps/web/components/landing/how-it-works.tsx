"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Heart, 
  Send, 
  Check, 
  Search,
  Users,
  Video,
  DollarSign
} from "lucide-react";
import { useI18n } from "@/app/i18n";
import { ToggleGroup, Card } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const creatorSteps = [
  {
    icon: Search,
    titleEn: "Discover",
    titleRu: "Найти",
    descEn: "Browse campaign briefs in TikTok-style vertical feed",
    descRu: "Листайте брифы кампаний в вертикальной ленте",
  },
  {
    icon: Heart,
    titleEn: "Swipe",
    titleRu: "Свайп",
    descEn: "Swipe right on campaigns you love, left to skip",
    descRu: "Свайп вправо на понравившиеся, влево чтобы пропустить",
  },
  {
    icon: DollarSign,
    titleEn: "Create & Earn",
    titleRu: "Создать и заработать",
    descEn: "Complete the brief, submit content, get paid securely",
    descRu: "Выполните бриф, отправьте контент, получите оплату",
  },
];

const brandSteps = [
  {
    icon: Video,
    titleEn: "Post",
    titleRu: "Создать",
    descEn: "Create a campaign brief with budget and requirements",
    descRu: "Создайте бриф кампании с бюджетом и требованиями",
  },
  {
    icon: Users,
    titleEn: "Match",
    titleRu: "Матч",
    descEn: "Get matched with creators who love your brand",
    descRu: "Получайте заявки от креаторов, которым нравится ваш бренд",
  },
  {
    icon: Check,
    titleEn: "Approve & Pay",
    titleRu: "Принять и оплатить",
    descEn: "Review content, approve, and release secure payment",
    descRu: "Проверьте контент, одобрите и переведите оплату",
  },
];

export function HowItWorksSection() {
  const { locale } = useI18n();
  const [view, setView] = useState<string>("creator");

  const steps = view === "creator" ? creatorSteps : brandSteps;

  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {locale === "ru" ? "Как это работает" : "How It Works"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === "ru"
                ? "Простой процесс для креаторов и брендов"
                : "Simple process for both creators and brands"}
            </p>
          </div>
        </Reveal>

        {/* Toggle */}
        <Reveal>
          <div className="flex justify-center mb-16">
            <ToggleGroup
              value={view}
              onValueChange={setView}
              options={[
                { value: "creator", label: locale === "ru" ? "Креатор" : "Creator" },
                { value: "brand", label: locale === "ru" ? "Бренд" : "Brand" },
              ]}
            />
          </div>
        </Reveal>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Stagger className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <StaggerItem key={step.titleEn}>
                  <StepCard
                    step={index + 1}
                    icon={step.icon}
                    title={locale === "ru" ? step.titleRu : step.titleEn}
                    description={locale === "ru" ? step.descRu : step.descEn}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </motion.div>
        </AnimatePresence>

        {/* Connection Lines (Desktop) */}
        <div className="hidden md:flex justify-center mt-8">
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-border" />
            <ArrowRight className="h-5 w-5" />
            <div className="h-px w-24 bg-border" />
            <ArrowRight className="h-5 w-5" />
            <div className="h-px w-24 bg-gradient-to-r from-border via-border to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  icon: Icon,
  title,
  description,
}: {
  step: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <Card hover className="p-8 text-center h-full">
        {/* Step Number */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          {step}
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 mx-auto"
        >
          <Icon className="h-8 w-8" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </Card>
    </motion.div>
  );
}
