"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { MobileNav, MobileMenu } from "./mobile-nav";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  userType?: "creator" | "brand";
  user?: {
    name: string;
    avatar?: string;
    level?: number;
    xp?: number;
    maxXp?: number;
    balance?: number;
  };
}

export function AppShell({ children, userType = "creator", user }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultUser = user || {
    name: "Alex Creator",
    level: 7,
    xp: 2450,
    maxXp: 3000,
    balance: 15000,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar userType={userType} user={defaultUser} />
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={{ ...defaultUser, type: userType }}
      />

      {/* Main Content */}
      <div className="lg:pl-[280px] transition-all duration-300">
        <Header
          user={defaultUser}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 lg:p-6 pb-24 lg:pb-6"
        >
          {children}
        </motion.main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}

export { Sidebar } from "./sidebar";
export { Header } from "./header";
export { MobileNav, MobileMenu } from "./mobile-nav";
