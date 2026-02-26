"use client";

import { CtaSection } from "@/components/landing-page/cta-section";
import { FeaturesBento } from "@/components/landing-page/features-bento";
import { HeroSection } from "@/components/landing-page/hero-section";
import { LogoCloud } from "@/components/landing-page/logo-cloud";
import { Navbar } from "@/components/landing-page/navbar";
import { SignupModal } from "@/components/landing-page/signup-modal";
import { StatsBar } from "@/components/landing-page/stats-bar";
import { useUserContext } from "@/context/UserContext";
import { useSignupModal } from "@/hooks/landing-page/useSignupModalToggle";
import { useEffect } from "react";

export default function LandingPage() {
  const { isSignupModalOpen, closeSignupModal } = useSignupModal();
  const { isLoggingOut, setLoggingOut } = useUserContext();

  useEffect(() => {
    if (isLoggingOut) setLoggingOut(false);
  }, [isLoggingOut, setLoggingOut]);

  return (
    <main className="relative min-h-screen bg-white dark:bg-neutral-950 overflow-x-hidden">
      <Navbar />
      {isSignupModalOpen && <SignupModal closeSignupModal={closeSignupModal} />}

      <HeroSection />
      <LogoCloud />
      <StatsBar />
      <FeaturesBento />
      <CtaSection />
    </main>
  );
}
