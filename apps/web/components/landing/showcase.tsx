"use client";

import { motion } from "framer-motion";
import { Play, MapPin, Clock, Users } from "lucide-react";
import { useI18n } from "@/app/i18n";
import { Card, Badge, Avatar } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, HoverCard } from "@/components/motion";

const sampleCampaigns = [
  {
    titleRu: "Сними TikTok для бургерной",
    titleEn: "TikTok for Burger Joint",
    brand: "BurgerLab",
    budget: 700,
    category: "Food",
    categoryRu: "Еда",
    platform: "TikTok",
    deadline: "3 days",
    deadlineRu: "3 дня",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    titleRu: "UGC для мобильной игры",
    titleEn: "Mobile Game UGC",
    brand: "GameStudio",
    budget: 1000,
    category: "Gaming",
    categoryRu: "Игры",
    platform: "YouTube Shorts",
    deadline: "5 days",
    deadlineRu: "5 дней",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    titleRu: "Обзор кофейни",
    titleEn: "Coffee Shop Review",
    brand: "CoffeePoint",
    budget: 500,
    category: "Lifestyle",
    categoryRu: "Лайфстайл",
    platform: "Instagram Reels",
    deadline: "7 days",
    deadlineRu: "7 дней",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

const sampleCreators = [
  {
    name: "Anna K.",
    niche: ["Fashion", "Lifestyle"],
    nicheRu: ["Мода", "Лайфстайл"],
    followers: "45K",
    videos: 156,
    rating: 4.9,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Max D.",
    niche: ["Gaming", "Tech"],
    nicheRu: ["Игры", "Технологии"],
    followers: "120K",
    videos: 423,
    rating: 4.8,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Sofia L.",
    niche: ["Food", "Travel"],
    nicheRu: ["Еда", "Путешествия"],
    followers: "28K",
    videos: 89,
    rating: 5.0,
    gradient: "from-emerald-500 to-green-500",
  },
];

export function ShowcaseSection() {
  const { locale } = useI18n();

  return (
    <section id="campaigns" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Campaigns */}
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {locale === "ru" ? "Актуальные кампании" : "Active Campaigns"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {locale === "ru"
                ? "Примеры реальных брифов от брендов"
                : "Examples of real briefs from brands"}
            </p>
          </div>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {sampleCampaigns.map((campaign) => (
            <StaggerItem key={campaign.titleEn}>
              <CampaignCard campaign={campaign} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Creators */}
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {locale === "ru" ? "Топ креаторы" : "Top Creators"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {locale === "ru"
                ? "Талантливые креаторы готовы к сотрудничеству"
                : "Talented creators ready to collaborate"}
            </p>
          </div>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCreators.map((creator) => (
            <StaggerItem key={creator.name}>
              <CreatorCard creator={creator} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function CampaignCard({ campaign, locale }: { campaign: typeof sampleCampaigns[0]; locale: string }) {
  return (
    <HoverCard>
      <Card className="overflow-hidden h-full">
        {/* Media Preview */}
        <div className={`relative aspect-video bg-gradient-to-br ${campaign.gradient}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
            >
              <Play className="h-6 w-6 text-white fill-white" />
            </motion.div>
          </div>
          {/* Budget Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="default" className="bg-primary/90 backdrop-blur-sm text-white border-0">
              {campaign.budget}₽
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">
              {locale === "ru" ? campaign.categoryRu : campaign.category}
            </Badge>
            <Badge variant="outline">{campaign.platform}</Badge>
          </div>

          <h3 className="font-semibold text-lg mb-1">
            {locale === "ru" ? campaign.titleRu : campaign.titleEn}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{campaign.brand}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {locale === "ru" ? campaign.deadlineRu : campaign.deadline}
            </div>
          </div>
        </div>
      </Card>
    </HoverCard>
  );
}

function CreatorCard({ creator, locale }: { creator: typeof sampleCreators[0]; locale: string }) {
  return (
    <HoverCard>
      <Card className="p-6 text-center h-full">
        {/* Avatar */}
        <motion.div whileHover={{ scale: 1.05 }} className="mb-4 inline-block">
          <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${creator.gradient} mx-auto flex items-center justify-center text-white text-2xl font-bold`}>
            {creator.name.charAt(0)}
          </div>
        </motion.div>

        <h3 className="font-semibold text-lg">{creator.name}</h3>

        {/* Niches */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {(locale === "ru" ? creator.nicheRu : creator.niche).map((n) => (
            <Badge key={n} variant="secondary" className="text-xs">
              {n}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-border">
          <div>
            <div className="text-lg font-bold">{creator.followers}</div>
            <div className="text-xs text-muted-foreground">
              {locale === "ru" ? "Подписчики" : "Followers"}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">{creator.videos}</div>
            <div className="text-xs text-muted-foreground">
              {locale === "ru" ? "Видео" : "Videos"}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">{creator.rating}</div>
            <div className="text-xs text-muted-foreground">
              {locale === "ru" ? "Рейтинг" : "Rating"}
            </div>
          </div>
        </div>
      </Card>
    </HoverCard>
  );
}
