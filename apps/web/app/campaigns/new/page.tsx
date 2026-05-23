"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Image as ImageIcon,
  Video,
  X,
  Plus,
  Calendar,
  DollarSign,
  Target,
  Users,
  Sparkles,
  Info,
} from "lucide-react";
import { AppShell } from "@/components/app";
import { Button, Card, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Основное", description: "Название и описание" },
  { id: 2, title: "Контент", description: "Требования к контенту" },
  { id: 3, title: "Аудитория", description: "Целевая аудитория" },
  { id: 4, title: "Бюджет", description: "Оплата и сроки" },
  { id: 5, title: "Проверка", description: "Проверьте данные" },
];

const categories = [
  "Lifestyle", "Beauty", "Fashion", "Tech", "Gaming", "Fitness",
  "Food", "Travel", "Education", "Finance", "Entertainment", "Auto",
];

const platforms = [
  { id: "instagram", name: "Instagram", icon: "📷" },
  { id: "youtube", name: "YouTube", icon: "🎬" },
  { id: "tiktok", name: "TikTok", icon: "🎵" },
  { id: "telegram", name: "Telegram", icon: "✈️" },
];

const contentFormats = [
  { id: "short_video", name: "Короткое видео", description: "До 60 сек, Stories, Reels, TikTok" },
  { id: "long_video", name: "Длинное видео", description: "Обзоры, влоги, распаковки" },
  { id: "review", name: "Обзор", description: "Детальный обзор продукта" },
  { id: "integration", name: "Интеграция", description: "Упоминание в контенте" },
];

const audienceRanges = [
  { id: "nano", name: "Nano", range: "1K - 10K", description: "Высокая вовлечённость" },
  { id: "micro", name: "Micro", range: "10K - 100K", description: "Баланс охвата и ER" },
  { id: "mid", name: "Mid", range: "100K - 500K", description: "Широкий охват" },
  { id: "macro", name: "Macro", range: "500K+", description: "Массовая аудитория" },
];

type FormData = {
  title: string;
  description: string;
  categories: string[];
  platforms: string[];
  contentFormat: string;
  requirements: string;
  audienceRange: string[];
  targetAge: { min: number; max: number };
  targetGender: string;
  targetRegions: string[];
  budget: number;
  pricePerCreator: { min: number; max: number };
  deadline: string;
  maxCreators: number;
  mediaFiles: File[];
};

const initialFormData: FormData = {
  title: "",
  description: "",
  categories: [],
  platforms: [],
  contentFormat: "",
  requirements: "",
  audienceRange: [],
  targetAge: { min: 18, max: 45 },
  targetGender: "all",
  targetRegions: ["Россия"],
  budget: 100000,
  pricePerCreator: { min: 5000, max: 15000 },
  deadline: "",
  maxCreators: 10,
  mediaFiles: [],
};

export default function NewCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateForm = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrors({});
  };

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const current = formData[field] as string[];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    updateForm({ [field]: updated });
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.title.trim()) newErrors.title = "Введите название";
        if (!formData.description.trim()) newErrors.description = "Введите описание";
        if (formData.categories.length === 0) newErrors.categories = "Выберите хотя бы одну категорию";
        break;
      case 2:
        if (formData.platforms.length === 0) newErrors.platforms = "Выберите платформы";
        if (!formData.contentFormat) newErrors.contentFormat = "Выберите формат";
        break;
      case 3:
        if (formData.audienceRange.length === 0) newErrors.audienceRange = "Выберите размер аудитории";
        break;
      case 4:
        if (formData.budget < 10000) newErrors.budget = "Минимальный бюджет 10,000 ₽";
        if (!formData.deadline) newErrors.deadline = "Укажите дедлайн";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      // Submit campaign
      router.push("/campaigns");
    }
  };

  return (
    <AppShell userType="brand">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
          <h1 className="text-3xl font-bold text-foreground">
            Создать кампанию
          </h1>
          <p className="text-muted-foreground">
            Заполните информацию о вашей рекламной кампании
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step) => (
              <div
                key={step.id}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                    backgroundColor:
                      currentStep >= step.id
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted))",
                  }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center z-10",
                    "transition-colors duration-300"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-bold",
                        currentStep >= step.id
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.id}
                    </span>
                  )}
                </motion.div>
                <div className="mt-2 text-center hidden sm:block">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      currentStep >= step.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <Card className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Название кампании *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => updateForm({ title: e.target.value })}
                    placeholder="Например: Летняя коллекция 2024"
                    error={errors.title}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Описание *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                    placeholder="Опишите вашу кампанию, цели и ожидания от креаторов..."
                    rows={4}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-muted/50 border",
                      "text-foreground placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50",
                      "transition-all duration-200 resize-none",
                      errors.description ? "border-destructive" : "border-transparent"
                    )}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive mt-1">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Категории * {formData.categories.length > 0 && `(${formData.categories.length})`}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleArrayItem("categories", category)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all",
                          formData.categories.includes(category)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                  {errors.categories && (
                    <p className="text-sm text-destructive mt-2">{errors.categories}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Медиафайлы (опционально)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Перетащите файлы или{" "}
                      <span className="text-primary">выберите</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, MP4 до 50MB
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Content Requirements */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Платформы *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {platforms.map((platform) => (
                      <motion.button
                        key={platform.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleArrayItem("platforms", platform.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-center",
                          formData.platforms.includes(platform.id)
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-2xl">{platform.icon}</span>
                        <p className="font-medium text-foreground mt-2">
                          {platform.name}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                  {errors.platforms && (
                    <p className="text-sm text-destructive mt-2">{errors.platforms}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Формат контента *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {contentFormats.map((format) => (
                      <motion.button
                        key={format.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => updateForm({ contentFormat: format.id })}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all",
                          formData.contentFormat === format.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <p className="font-medium text-foreground">{format.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {format.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                  {errors.contentFormat && (
                    <p className="text-sm text-destructive mt-2">{errors.contentFormat}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Дополнительные требования
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => updateForm({ requirements: e.target.value })}
                    placeholder="Укажите специфические требования к контенту, стилю, тональности..."
                    rows={4}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-muted/50 border border-transparent",
                      "text-foreground placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50",
                      "transition-all duration-200 resize-none"
                    )}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Target Audience */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Размер аудитории креаторов *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {audienceRanges.map((range) => (
                      <motion.button
                        key={range.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => toggleArrayItem("audienceRange", range.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all",
                          formData.audienceRange.includes(range.id)
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground">{range.name}</span>
                          <span className="text-sm text-muted-foreground">{range.range}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {range.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                  {errors.audienceRange && (
                    <p className="text-sm text-destructive mt-2">{errors.audienceRange}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Целевой возраст
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={formData.targetAge.min}
                      onChange={(e) =>
                        updateForm({
                          targetAge: { ...formData.targetAge, min: parseInt(e.target.value) || 18 },
                        })
                      }
                      className="w-24"
                    />
                    <span className="text-muted-foreground">—</span>
                    <Input
                      type="number"
                      value={formData.targetAge.max}
                      onChange={(e) =>
                        updateForm({
                          targetAge: { ...formData.targetAge, max: parseInt(e.target.value) || 65 },
                        })
                      }
                      className="w-24"
                    />
                    <span className="text-muted-foreground">лет</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Пол аудитории
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: "all", label: "Любой" },
                      { id: "male", label: "Мужчины" },
                      { id: "female", label: "Женщины" },
                    ].map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateForm({ targetGender: option.id })}
                        className={cn(
                          "px-6 py-3 rounded-xl font-medium transition-all",
                          formData.targetGender === option.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Budget */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Общий бюджет *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => updateForm({ budget: parseInt(e.target.value) || 0 })}
                      className="pl-12"
                      error={errors.budget}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ₽
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Оплата за креатора
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Input
                        type="number"
                        value={formData.pricePerCreator.min}
                        onChange={(e) =>
                          updateForm({
                            pricePerCreator: {
                              ...formData.pricePerCreator,
                              min: parseInt(e.target.value) || 0,
                            },
                          })
                        }
                        placeholder="От"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₽
                      </span>
                    </div>
                    <span className="text-muted-foreground">—</span>
                    <div className="relative flex-1">
                      <Input
                        type="number"
                        value={formData.pricePerCreator.max}
                        onChange={(e) =>
                          updateForm({
                            pricePerCreator: {
                              ...formData.pricePerCreator,
                              max: parseInt(e.target.value) || 0,
                            },
                          })
                        }
                        placeholder="До"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₽
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Дедлайн *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => updateForm({ deadline: e.target.value })}
                      className="pl-12"
                      error={errors.deadline}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Максимум креаторов
                  </label>
                  <Input
                    type="number"
                    value={formData.maxCreators}
                    onChange={(e) => updateForm({ maxCreators: parseInt(e.target.value) || 1 })}
                    min={1}
                    max={100}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Сколько креаторов вы хотите привлечь к кампании
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">{formData.title}</h3>
                  <p className="text-sm text-muted-foreground">{formData.description}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Категории
                      </p>
                      <p className="text-sm text-foreground">
                        {formData.categories.join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Платформы
                      </p>
                      <p className="text-sm text-foreground">
                        {formData.platforms.map((p) => platforms.find((pl) => pl.id === p)?.name).join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Формат
                      </p>
                      <p className="text-sm text-foreground">
                        {contentFormats.find((f) => f.id === formData.contentFormat)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Бюджет
                      </p>
                      <p className="text-sm text-foreground">
                        {formData.budget.toLocaleString()} ₽
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Дедлайн
                      </p>
                      <p className="text-sm text-foreground">
                        {formData.deadline ? new Date(formData.deadline).toLocaleDateString("ru") : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Креаторов
                      </p>
                      <p className="text-sm text-foreground">
                        до {formData.maxCreators}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Готово к публикации
                    </p>
                    <p className="text-sm text-muted-foreground">
                      После публикации кампания станет доступна креаторам для просмотра и подачи заявок.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={nextStep}>
                Далее
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                <Sparkles className="w-4 h-4 mr-2" />
                Опубликовать
              </Button>
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
