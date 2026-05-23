"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useI18n } from "@/app/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function LandingNav() {
  const { locale, setLocale, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold tracking-tight"
              >
                <span className="text-foreground">ROT</span>
                <span className="text-primary">NITE</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink href="#how-it-works">{t("landing.howItWorks")}</NavLink>
              <NavLink href="#features">{t("landing.features")}</NavLink>
              <NavLink href="#campaigns">{t("landing.campaigns")}</NavLink>
              <NavLink href="#faq">{t("landing.faq")}</NavLink>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLocale(locale === "en" ? "ru" : "en")}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {locale === "en" ? "RU" : "EN"}
              </motion.button>

              <ThemeToggle className="hidden sm:flex" />

              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  {t("nav.login")}
                </Button>
              </Link>

              <Link href="/signup" className="hidden sm:block">
                <Button size="sm">
                  {t("landing.getStarted")}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-accent"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <MobileNavLink href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>
                {t("landing.howItWorks")}
              </MobileNavLink>
              <MobileNavLink href="#features" onClick={() => setIsMobileMenuOpen(false)}>
                {t("landing.features")}
              </MobileNavLink>
              <MobileNavLink href="#campaigns" onClick={() => setIsMobileMenuOpen(false)}>
                {t("landing.campaigns")}
              </MobileNavLink>
              <MobileNavLink href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
                {t("landing.faq")}
              </MobileNavLink>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLocale(locale === "en" ? "ru" : "en")}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-secondary"
                  >
                    {locale === "en" ? "RU" : "EN"}
                  </motion.button>
                  <ThemeToggle />
                </div>

                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/signup" className="block">
                  <Button className="w-full">
                    {t("landing.getStarted")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </motion.a>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="block py-2 text-lg font-medium text-foreground"
    >
      {children}
    </motion.a>
  );
}
