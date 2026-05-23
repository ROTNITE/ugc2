"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  PlusCircle,
  MessageCircle,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  isAction?: boolean;
  badge?: number;
}

const mobileNav: NavItem[] = [
  { icon: Home, label: "Лента", href: "/feed" },
  { icon: Search, label: "Поиск", href: "/search" },
  { icon: PlusCircle, label: "Создать", href: "/create", isAction: true },
  { icon: MessageCircle, label: "Чат", href: "/chat", badge: 3 },
  { icon: User, label: "Профиль", href: "/profile" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-xl border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNav.map((item) => {
          const isActive = pathname === item.href;

          if (item.isAction) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -mt-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "w-14 h-14 rounded-2xl",
                    "bg-gradient-to-br from-primary to-accent",
                    "flex items-center justify-center",
                    "shadow-lg shadow-primary/30"
                  )}
                >
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-1 py-2 px-4"
            >
              <div className="relative">
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobileNav"
                  className="absolute -bottom-0 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    avatar?: string;
    type: "creator" | "brand";
  };
}

export function MobileMenu({ isOpen, onClose, user }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-card border-r border-border z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-bold text-xl text-foreground">ROTNITE</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {user && (
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-[2px]">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.type === "creator" ? "Креатор" : "Бренд"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <nav className="p-4">
              <ul className="space-y-1">
                {mobileNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
