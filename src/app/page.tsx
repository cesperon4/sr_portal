"use client";

import { Navbar } from "@/components/landing-page/navbar";
import { SignupModal } from "@/components/landing-page/signup-modal";
import { useSignupModal } from "@/hooks/landing-page/useSignupModalToggle";
import { HeroSection } from "@/components/landing-page/hero-section";
import { LogoCloud } from "@/components/landing-page/logo-cloud";
import { StatsBar } from "@/components/landing-page/stats-bar";
import { FeaturesBento } from "@/components/landing-page/features-bento";
import { CtaSection } from "@/components/landing-page/cta-section";

export default function LandingPage() {
  const { isSignupModalOpen, closeSignupModal } = useSignupModal();

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
