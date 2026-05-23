"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";
import {
  LandingNav,
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  ShowcaseSection,
  GamificationSection,
  FAQSection,
  CTASection,
  Footer,
} from "@/components/landing";

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (!auth.loading && auth.user) {
      if (auth.user.role === "admin") {
        router.push("/admin");
      } else if (auth.user.role === "creator") {
        router.push("/feed");
      } else {
        router.push("/brand/campaigns");
      }
    }
  }, [auth.loading, auth.user, router]);

  // Show nothing while checking auth or redirecting
  if (auth.loading || auth.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <LandingNav />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ShowcaseSection />
      <GamificationSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
