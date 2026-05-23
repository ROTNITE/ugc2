"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  SlidersHorizontal,
  Search,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

interface FilterOption {
  id: string;
  label: string;
}

const categories: FilterOption[] = [
  { id: "all", label: "Все" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "beauty", label: "Beauty" },
  { id: "fashion", label: "Fashion" },
  { id: "tech", label: "Tech" },
  { id: "gaming", label: "Gaming" },
  { id: "fitness", label: "Fitness" },
  { id: "food", label: "Food" },
  { id: "travel", label: "Travel" },
];

const platforms: FilterOption[] = [
  { id: "all", label: "Все платформы" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
  { id: "tiktok", label: "TikTok" },
];

const followerRanges: FilterOption[] = [
  { id: "all", label: "Любая аудитория" },
  { id: "nano", label: "1K - 10K (Nano)" },
  { id: "micro", label: "10K - 100K (Micro)" },
  { id: "mid", label: "100K - 500K (Mid)" },
  { id: "macro", label: "500K+ (Macro)" },
];

const priceRanges: FilterOption[] = [
  { id: "all", label: "Любой бюджет" },
  { id: "low", label: "До 5,000 ₽" },
  { id: "mid", label: "5,000 - 15,000 ₽" },
  { id: "high", label: "15,000 - 50,000 ₽" },
  { id: "premium", label: "50,000+ ₽" },
];

interface FeedFiltersProps {
  onFiltersChange?: (filters: Record<string, string>) => void;
}

export function FeedFilters({ onFiltersChange }: FeedFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedFollowers, setSelectedFollowers] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const activeFiltersCount = [
    selectedCategory,
    selectedPlatform,
    selectedFollowers,
    selectedPrice,
  ].filter((f) => f !== "all").length;

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSelectedFollowers("all");
    setSelectedPrice("all");
  };

  return (
    <div className="mb-6">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
            showAdvanced || activeFiltersCount > 0
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Фильтры
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              showAdvanced && "rotate-180"
            )}
          />
        </motion.button>

        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Сбросить
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      <motion.div
        initial={false}
        animate={{
          height: showAdvanced ? "auto" : 0,
          opacity: showAdvanced ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Платформа
            </label>
            <div className="space-y-1">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedPlatform === platform.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  {platform.label}
                  {selectedPlatform === platform.id && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Followers */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Аудитория
            </label>
            <div className="space-y-1">
              {followerRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedFollowers(range.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedFollowers === range.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  {range.label}
                  {selectedFollowers === range.id && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Бюджет
            </label>
            <div className="space-y-1">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedPrice(range.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedPrice === range.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  {range.label}
                  {selectedPrice === range.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
