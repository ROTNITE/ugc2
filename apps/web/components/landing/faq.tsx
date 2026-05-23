"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useI18n } from "@/app/i18n";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    questionEn: "How do I get started as a creator?",
    questionRu: "Как начать работу креатором?",
    answerEn: "Sign up, complete your profile with your social links and portfolio, then start browsing campaigns in the feed. Swipe right on campaigns you like and wait for a match!",
    answerRu: "Зарегистрируйтесь, заполните профиль с соцсетями и портфолио, затем начните просматривать кампании в ленте. Свайпните вправо на понравившиеся кампании и ждите матча!",
  },
  {
    questionEn: "How does payment work?",
    questionRu: "Как работает оплата?",
    answerEn: "We use secure escrow payments. Brands fund the campaign upfront, we hold the funds safely, and release them to you once your content is approved. Platform commission is 10%.",
    answerRu: "Мы используем безопасную escrow-систему. Бренды оплачивают кампанию заранее, мы держим средства, и выплачиваем вам после одобрения контента. Комиссия платформы — 10%.",
  },
  {
    questionEn: "What's the minimum budget for a campaign?",
    questionRu: "Какой минимальный бюджет кампании?",
    answerEn: "Campaigns can start from as low as 500 RUB, making it accessible for small brands and indie developers. There's no maximum limit.",
    answerRu: "Кампании могут начинаться от 500 рублей, что делает их доступными для малого бизнеса и инди-разработчиков. Максимума нет.",
  },
  {
    questionEn: "Can creators under 18 use the platform?",
    questionRu: "Могут ли креаторы до 18 лет использовать платформу?",
    answerEn: "Yes! Creators aged 13-17 can use the platform with parental consent. We have a special verification flow for underage creators.",
    answerRu: "Да! Креаторы 13-17 лет могут использовать платформу с согласия родителей. У нас есть специальная процедура верификации для несовершеннолетних.",
  },
  {
    questionEn: "Which platforms can I connect?",
    questionRu: "Какие платформы можно подключить?",
    answerEn: "You can connect TikTok, YouTube, Instagram, and VK. We import your follower counts and engagement stats to help brands find the right creators.",
    answerRu: "Вы можете подключить TikTok, YouTube, Instagram и VK. Мы импортируем количество подписчиков и статистику вовлеченности для помощи брендам в поиске.",
  },
  {
    questionEn: "How long does content review take?",
    questionRu: "Сколько длится проверка контента?",
    answerEn: "Brands have 7 days to review submitted content. If no action is taken, funds are automatically released to the creator.",
    answerRu: "У брендов есть 7 дней на проверку контента. Если действий не предпринято, средства автоматически переводятся креатору.",
  },
];

export function FAQSection() {
  const { locale } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-6"
            >
              <HelpCircle className="h-6 w-6" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {locale === "ru" ? "Часто задаваемые вопросы" : "Frequently Asked Questions"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {locale === "ru"
                ? "Ответы на популярные вопросы о платформе"
                : "Answers to common questions about the platform"}
            </p>
          </div>
        </Reveal>

        <Stagger className="space-y-4">
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
              <FAQItem
                question={locale === "ru" ? faq.questionRu : faq.questionEn}
                answer={locale === "ru" ? faq.answerRu : faq.answerEn}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? "hsl(var(--card))" : "transparent" }}
      className={cn(
        "rounded-2xl border border-border overflow-hidden transition-colors",
        isOpen && "shadow-sm"
      )}
    >
      <motion.button
        onClick={onClick}
        className="flex w-full items-center justify-between p-5 text-left"
        whileTap={{ scale: 0.99 }}
      >
        <span className="font-medium pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 text-muted-foreground">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
