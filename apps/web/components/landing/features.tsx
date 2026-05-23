"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  Video, 
  Shield, 
  MessageSquare, 
  BarChart3, 
  Gift,
  Zap,
  Globe
} from "lucide-react";
import { useI18n } from "@/app/i18n";
import { Card } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const features = [
  {
    icon: Heart,
    titleEn: "Swipe Matching",
    titleRu: "Свайп-матчинг",
    descEn: "Tinder-style discovery. Swipe right on campaigns you love, get matched instantly.",
    descRu: "Tinder-стиль открытий. Свайп вправо на любимые кампании, мгновенный матч.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Video,
    titleEn: "TikTok-style Feed",
    titleRu: "Лента как в TikTok",
    descEn: "Vertical video briefs. Discover campaigns the way you watch content.",
    descRu: "Вертикальные видео-брифы. Открывайте кампании как смотрите контент.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Shield,
    titleEn: "Escrow Payments",
    titleRu: "Escrow платежи",
    descEn: "Secure transactions. Funds held safely until content is approved.",
    descRu: "Безопасные сделки. Средства защищены до одобрения контента.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: MessageSquare,
    titleEn: "Real-time Chat",
    titleRu: "Чат в реальном времени",
    descEn: "Direct messaging with brands. Negotiate, clarify, and collaborate.",
    descRu: "Прямые сообщения с брендами. Обсуждайте, уточняйте, сотрудничайте.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    titleEn: "Social Stats Import",
    titleRu: "Импорт статистики",
    descEn: "Connect TikTok, YouTube, Instagram. Show your real audience.",
    descRu: "Подключите TikTok, YouTube, Instagram. Покажите реальную аудиторию.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Gift,
    titleEn: "Gamification",
    titleRu: "Геймификация",
    descEn: "Earn XP, badges, and bonuses. Level up your creator career.",
    descRu: "Получайте XP, бейджи и бонусы. Прокачивайте карьеру креатора.",
    color: "from-indigo-500 to-violet-500",
  },
];

export function FeaturesSection() {
  const { locale } = useI18n();

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-6"
            >
              <Zap className="h-6 w-6" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {locale === "ru" ? "Все что нужно для успеха" : "Everything You Need to Succeed"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === "ru"
                ? "Мощные инструменты для креаторов и брендов"
                : "Powerful tools for both creators and brands"}
            </p>
          </div>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <StaggerItem key={feature.titleEn}>
              <FeatureCard
                icon={feature.icon}
                title={locale === "ru" ? feature.titleRu : feature.titleEn}
                description={locale === "ru" ? feature.descRu : feature.descEn}
                gradientColor={feature.color}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  gradientColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradientColor: string;
}) {
  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Card hover className="p-6 h-full card-shine">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColor} text-white mb-4`}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  );
}
