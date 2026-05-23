"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  MessageCircle,
  Wallet,
  Settings,
  User,
  Briefcase,
  BarChart3,
  PlusCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const creatorNav: NavItem[] = [
  { icon: Home, label: "Лента", href: "/feed" },
  { icon: Search, label: "Поиск", href: "/search" },
  { icon: Briefcase, label: "Мои заказы", href: "/orders" },
  { icon: MessageCircle, label: "Сообщения", href: "/chat", badge: 3 },
  { icon: Wallet, label: "Кошелёк", href: "/wallet" },
  { icon: User, label: "Профиль", href: "/profile" },
];

const brandNav: NavItem[] = [
  { icon: BarChart3, label: "Дашборд", href: "/dashboard" },
  { icon: PlusCircle, label: "Создать кампанию", href: "/campaigns/new" },
  { icon: Search, label: "Найти креаторов", href: "/creators" },
  { icon: Briefcase, label: "Кампании", href: "/campaigns" },
  { icon: MessageCircle, label: "Сообщения", href: "/chat", badge: 5 },
  { icon: Wallet, label: "Баланс", href: "/wallet" },
];

interface SidebarProps {
  userType: "creator" | "brand";
  user?: {
    name: string;
    avatar?: string;
    level?: number;
    xp?: number;
    maxXp?: number;
  };
}

export function Sidebar({ userType, user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const navItems = userType === "creator" ? creatorNav : brandNav;

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen",
        "bg-card/80 backdrop-blur-xl border-r border-border",
        "flex flex-col"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
          >
            <Zap className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-xl text-foreground"
              >
                ROTNITE
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.button>
      </div>

      {/* User Card */}
      {user && (
        <div className="p-4 border-b border-border">
          <motion.div
            layout
            className={cn(
              "flex items-center gap-3",
              collapsed && "justify-center"
            )}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-[2px]">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              </div>
              {user.level && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {user.level}
                </div>
              )}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex-1 min-w-0"
                >
                  <p className="font-semibold text-foreground truncate">
                    {user.name}
                  </p>
                  {user.xp !== undefined && user.maxXp && (
                    <div className="mt-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {user.xp} XP
                        </span>
                        <span>{user.maxXp} XP</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                    "hover:bg-muted group relative",
                    isActive && "bg-primary/10 text-primary",
                    collapsed && "justify-center"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                    />
                  )}
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={cn(
                          "font-medium transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.badge && !collapsed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto px-2 py-0.5 text-xs font-bold bg-accent text-accent-foreground rounded-full"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                  {item.badge && collapsed && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-border space-y-1">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "px-3")}>
          <ThemeToggle />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 text-sm text-muted-foreground"
              >
                Тема
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
            "hover:bg-muted group",
            collapsed && "justify-center"
          )}
        >
          <Settings className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-medium text-muted-foreground group-hover:text-foreground"
              >
                Настройки
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <button
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 w-full",
            "hover:bg-destructive/10 group",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-destructive" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-medium text-muted-foreground group-hover:text-destructive"
              >
                Выйти
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
