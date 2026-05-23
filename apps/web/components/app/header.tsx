"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Wallet,
  MessageCircle,
  Home,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
    balance?: number;
  };
  onMenuToggle?: () => void;
}

export function Header({ user, onMenuToggle }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: "Новая заявка", message: "Brand X заинтересован в вашем профиле", time: "2 мин" },
    { id: 2, title: "Оплата получена", message: "Вы получили 5,000 ₽ за заказ #1234", time: "1 час" },
    { id: 3, title: "Достижение", message: "Вы достигли 5 уровня!", time: "3 часа" },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск креаторов, брендов..."
              className={cn(
                "w-64 lg:w-80 pl-10 pr-4 py-2 rounded-xl",
                "bg-muted/50 border border-transparent",
                "focus:border-primary/50 focus:bg-muted",
                "text-foreground placeholder:text-muted-foreground",
                "transition-all duration-200 outline-none"
              )}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={cn(
                      "absolute right-0 top-full mt-2 w-80 z-50",
                      "bg-card border border-border rounded-xl shadow-xl overflow-hidden"
                    )}
                  >
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">Уведомления</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif, index) => (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-sm text-foreground">
                                {notif.title}
                              </p>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {notif.message}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {notif.time}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <Link
                      href="/notifications"
                      className="block p-3 text-center text-sm text-primary hover:bg-muted/50 transition-colors"
                    >
                      Показать все
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Balance */}
          {user?.balance !== undefined && (
            <Link
              href="/wallet"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Wallet className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">
                {user.balance.toLocaleString()} ₽
              </span>
            </Link>
          )}

          {/* User Menu */}
          {user && (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent p-[2px]">
                  <div className="w-full h-full rounded-lg bg-card flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={cn(
                        "absolute right-0 top-full mt-2 w-56 z-50",
                        "bg-card border border-border rounded-xl shadow-xl overflow-hidden"
                      )}
                    >
                      <div className="p-4 border-b border-border">
                        <p className="font-semibold text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">Creator</p>
                      </div>
                      <div className="p-2">
                        {[
                          { icon: User, label: "Профиль", href: "/profile" },
                          { icon: Wallet, label: "Кошелёк", href: "/wallet" },
                          { icon: Settings, label: "Настройки", href: "/settings" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <item.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{item.label}</span>
                          </Link>
                        ))}
                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 transition-colors w-full mt-1">
                          <LogOut className="w-4 h-4 text-destructive" />
                          <span className="text-sm text-destructive">Выйти</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border"
          >
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  autoFocus
                  className={cn(
                    "w-full pl-10 pr-4 py-2 rounded-xl",
                    "bg-muted/50 border border-transparent",
                    "focus:border-primary/50 focus:bg-muted",
                    "text-foreground placeholder:text-muted-foreground",
                    "transition-all duration-200 outline-none"
                  )}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
