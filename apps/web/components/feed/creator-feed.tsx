"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion";
import {
  Heart,
  X,
  Star,
  Bookmark,
  Share2,
  Play,
  Eye,
  Users,
  TrendingUp,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  followers: number;
  engagement: number;
  rating: number;
  reviews: number;
  price: { min: number; max: number };
  categories: string[];
  platforms: ("instagram" | "youtube" | "tiktok")[];
  portfolio: string[];
  verified: boolean;
  level: number;
}

const mockCreators: Creator[] = [
  {
    id: "1",
    name: "Анна Смирнова",
    username: "@anna_creates",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    coverImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800",
    bio: "Креатор lifestyle контента. Работаю с beauty и fashion брендами уже 3 года. Создаю вирусный контент.",
    followers: 125000,
    engagement: 4.8,
    rating: 4.9,
    reviews: 47,
    price: { min: 5000, max: 15000 },
    categories: ["Lifestyle", "Beauty", "Fashion"],
    platforms: ["instagram", "youtube"],
    portfolio: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400",
    ],
    verified: true,
    level: 8,
  },
  {
    id: "2",
    name: "Максим Петров",
    username: "@max_tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    bio: "Tech-обзорщик и гейм-стример. Аудитория 18-35, 80% мужчины. Высокая конверсия в покупки.",
    followers: 89000,
    engagement: 5.2,
    rating: 4.7,
    reviews: 32,
    price: { min: 8000, max: 25000 },
    categories: ["Tech", "Gaming", "Reviews"],
    platforms: ["youtube", "tiktok"],
    portfolio: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400",
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    ],
    verified: true,
    level: 6,
  },
  {
    id: "3",
    name: "Екатерина Волкова",
    username: "@kate_fitness",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    bio: "Фитнес-тренер и нутрициолог. Помогаю брендам спортивного питания выйти на новую аудиторию.",
    followers: 210000,
    engagement: 6.1,
    rating: 5.0,
    reviews: 89,
    price: { min: 10000, max: 35000 },
    categories: ["Fitness", "Health", "Nutrition"],
    platforms: ["instagram", "youtube", "tiktok"],
    portfolio: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    ],
    verified: true,
    level: 10,
  },
];

interface CreatorCardProps {
  creator: Creator;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
}

function CreatorCard({ creator, onSwipe, isTop }: CreatorCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);
  const nopeOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 150) {
      onSwipe("right");
    } else if (info.offset.x < -150) {
      onSwipe("left");
    }
  };

  const platformIcons = {
    instagram: Instagram,
    youtube: Youtube,
    tiktok: MessageCircle,
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      className={cn(
        "absolute w-full max-w-md cursor-grab active:cursor-grabbing",
        !isTop && "pointer-events-none"
      )}
    >
      <div className="relative bg-card rounded-3xl overflow-hidden shadow-2xl border border-border">
        {/* Cover Image with Gallery */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage === 0 ? creator.coverImage : creator.portfolio[currentImage - 1]}
              alt={creator.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Image Indicators */}
          <div className="absolute top-4 left-4 right-4 flex gap-1">
            {[creator.coverImage, ...creator.portfolio].slice(0, 4).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "flex-1 h-1 rounded-full transition-all",
                  index === currentImage ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>

          {/* Navigation Areas */}
          <button
            onClick={() => setCurrentImage(Math.max(0, currentImage - 1))}
            className="absolute left-0 top-0 w-1/3 h-full"
          />
          <button
            onClick={() => setCurrentImage(Math.min(3, currentImage + 1))}
            className="absolute right-0 top-0 w-1/3 h-full"
          />

          {/* Swipe Indicators */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-20 right-8 px-6 py-2 border-4 border-green-500 rounded-xl rotate-12"
          >
            <span className="text-green-500 text-3xl font-black">LIKE</span>
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-20 left-8 px-6 py-2 border-4 border-red-500 rounded-xl -rotate-12"
          >
            <span className="text-red-500 text-3xl font-black">NOPE</span>
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Creator Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3">
              {creator.verified && (
                <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Verified
                </span>
              )}
              <span className="px-2 py-1 bg-accent/90 text-accent-foreground text-xs font-bold rounded-full">
                Lvl {creator.level}
              </span>
            </div>

            {/* Name & Username */}
            <div className="flex items-center gap-3 mb-2">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{creator.name}</h3>
                <p className="text-white/70 text-sm">{creator.username}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-white/90 text-sm mb-3">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {(creator.followers / 1000).toFixed(0)}K
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {creator.engagement}% ER
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {creator.rating} ({creator.reviews})
              </span>
            </div>

            {/* Platforms */}
            <div className="flex items-center gap-2 mb-3">
              {creator.platforms.map((platform) => {
                const Icon = platformIcons[platform];
                return (
                  <div
                    key={platform}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                );
              })}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {creator.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Price Range */}
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Цена за интеграцию</span>
              <span className="text-white font-bold">
                {creator.price.min.toLocaleString()} - {creator.price.max.toLocaleString()} ₽
              </span>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-4 border-t border-border">
          <p className="text-sm text-muted-foreground line-clamp-2">{creator.bio}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface SwipeActionsProps {
  onSwipe: (direction: "left" | "right") => void;
  onSuperLike: () => void;
  onBookmark: () => void;
}

function SwipeActions({ onSwipe, onSuperLike, onBookmark }: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onSwipe("left")}
        className="w-14 h-14 rounded-full bg-card border border-border shadow-lg flex items-center justify-center group hover:border-red-500 transition-colors"
      >
        <X className="w-6 h-6 text-red-500" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onSuperLike}
        className="w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center group hover:border-blue-500 transition-colors"
      >
        <Star className="w-5 h-5 text-blue-500" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onSwipe("right")}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center"
      >
        <Heart className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBookmark}
        className="w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center group hover:border-yellow-500 transition-colors"
      >
        <Bookmark className="w-5 h-5 text-yellow-500" />
      </motion.button>
    </div>
  );
}

export function CreatorFeed() {
  const [creators, setCreators] = useState(mockCreators);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCreators, setSwipedCreators] = useState<{ id: string; direction: string }[]>([]);

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex >= creators.length) return;

    setSwipedCreators([
      ...swipedCreators,
      { id: creators[currentIndex].id, direction },
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSuperLike = () => {
    if (currentIndex >= creators.length) return;
    setSwipedCreators([
      ...swipedCreators,
      { id: creators[currentIndex].id, direction: "superlike" },
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleBookmark = () => {
    // Add to bookmarks without swiping
  };

  const visibleCreators = creators.slice(currentIndex, currentIndex + 3);

  return (
    <div className="flex flex-col items-center">
      {/* Card Stack */}
      <div className="relative w-full max-w-md h-[600px]">
        <AnimatePresence>
          {visibleCreators.length > 0 ? (
            visibleCreators.map((creator, index) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onSwipe={handleSwipe}
                isTop={index === 0}
              />
            )).reverse()
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Вы просмотрели всех!
              </h3>
              <p className="text-muted-foreground mb-6">
                Заходите позже, мы найдём больше креаторов для вас
              </p>
              <Button onClick={() => setCurrentIndex(0)}>
                Начать заново
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      {visibleCreators.length > 0 && (
        <SwipeActions
          onSwipe={handleSwipe}
          onSuperLike={handleSuperLike}
          onBookmark={handleBookmark}
        />
      )}

      {/* Progress */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {currentIndex} из {creators.length} просмотрено
        </p>
        <div className="w-32 h-1 bg-muted rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / creators.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
