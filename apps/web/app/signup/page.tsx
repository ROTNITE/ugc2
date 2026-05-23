"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, type AuthUser } from "../auth-context";
import { useI18n } from "../i18n";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Divider, ToggleGroup } from "@/components/ui";
import { SlideUp, FadeIn, Stagger, StaggerItem, ScaleIn } from "@/components/motion";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignupPage() {
  const auth = useAuth();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"creator" | "brand">("creator");
  const [referralCode, setReferralCode] = useState("");
  const [createdUser, setCreatedUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      setCreatedUser(await auth.register(email, password, role, referralCode));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "SIGNUP_FAILED");
    } finally {
      setLoading(false);
    }
  }

  // Success state after registration
  if (createdUser) {
    return (
      <main className="min-h-screen flex flex-col">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-success/5 via-background to-primary/10 -z-10" />
        
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">UGC</span>
            </div>
            <span className="font-semibold text-lg group-hover:text-primary transition-colors">
              Creator Hub
            </span>
          </Link>
          <ThemeToggle />
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <ScaleIn className="w-full max-w-md">
            <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95 text-center">
              <CardHeader className="pb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center shadow-lg shadow-success/25"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-success-foreground"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <CardTitle className="text-2xl">{t("signup.checkEmail")}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {t("signup.created", { email: createdUser.email })}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-2 space-y-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">
                    Check your inbox for a verification link. The link will expire in 24 hours.
                  </p>
                </div>
                
                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href="/login">{t("signup.goLogin")}</Link>
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <button className="text-primary hover:underline">resend verification</button>
                </p>
              </CardContent>
            </Card>
          </ScaleIn>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />
      
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">UGC</span>
          </div>
          <span className="font-semibold text-lg group-hover:text-primary transition-colors">
            Creator Hub
          </span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <SlideUp className="w-full max-w-md">
          <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
              </motion.div>
              <CardTitle className="text-2xl">{t("signup.create")}</CardTitle>
              <CardDescription className="text-muted-foreground">
                Join thousands of creators and brands connecting every day
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <form onSubmit={submit} className="space-y-4">
                <Stagger className="space-y-4">
                  {/* Role selector */}
                  <StaggerItem>
                    <div className="space-y-2">
                      <span className="text-sm font-medium">{t("settings.role")}</span>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          type="button"
                          onClick={() => setRole("creator")}
                          className={`relative p-4 rounded-xl border-2 transition-all ${
                            role === "creator"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                              role === "creator" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                              </svg>
                            </div>
                            <span className="font-medium text-sm">{t("role.creator")}</span>
                          </div>
                          {role === "creator" && (
                            <motion.div
                              layoutId="role-check"
                              className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary-foreground"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </motion.div>
                          )}
                        </motion.button>
                        
                        <motion.button
                          type="button"
                          onClick={() => setRole("brand")}
                          className={`relative p-4 rounded-xl border-2 transition-all ${
                            role === "brand"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                              role === "brand" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                              </svg>
                            </div>
                            <span className="font-medium text-sm">{t("role.brand")}</span>
                          </div>
                          {role === "brand" && (
                            <motion.div
                              layoutId="role-check"
                              className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary-foreground"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </motion.div>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium">{t("form.email")}</span>
                      <Input
                        autoComplete="email"
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        type="email"
                        value={email}
                        placeholder="name@example.com"
                        error={!!error}
                      />
                    </label>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium">{t("form.password")}</span>
                      <Input
                        autoComplete="new-password"
                        minLength={8}
                        name="password"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        type="password"
                        value={password}
                        placeholder="At least 8 characters"
                        error={!!error}
                      />
                    </label>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium flex items-center gap-2">
                        {t("signup.referralCode")}
                        <span className="text-xs text-muted-foreground font-normal">
                          ({t("form.optional")})
                        </span>
                      </span>
                      <Input
                        onChange={(event) => setReferralCode(event.target.value)}
                        placeholder="Enter referral code"
                        value={referralCode}
                      />
                    </label>
                  </StaggerItem>

                  <AnimatePresence mode="wait">
                    {error && (
                      <StaggerItem>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                        >
                          {error === "EMAIL_EXISTS" 
                            ? "This email is already registered. Try logging in instead."
                            : error === "SIGNUP_FAILED"
                            ? "Registration failed. Please try again."
                            : error
                          }
                        </motion.div>
                      </StaggerItem>
                    )}
                  </AnimatePresence>

                  <StaggerItem>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      loading={loading}
                    >
                      {t("signup.createAccount")}
                    </Button>
                  </StaggerItem>
                </Stagger>

                <Divider text="or continue with" className="my-6" />

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button" className="w-full">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <FadeIn className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </FadeIn>
        </SlideUp>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-muted-foreground">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
      </footer>
    </main>
  );
}
