"use client";

import { Navbar } from "@/components/landing-page/navbar";
import { SignupModal } from "@/components/landing-page/signup-modal";
import { useLogin } from "@/hooks/landing-page/useLogin";
import { useSignupModal } from "@/hooks/landing-page/useSignupModalToggle";
import Image from "next/image";

export default function LandingPage() {
  const { handleGuestLogin } = useLogin();
  const { isSignupModalOpen, closeSignupModal } = useSignupModal();

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-green-50 to-white overflow-hidden">
      <Navbar />
      {isSignupModalOpen && <SignupModal closeSignupModal={closeSignupModal} />}

      {/* Hero Section */}
      <div className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 py-24 gap-12 md:gap-24">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6 z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Unlock{" "}
            <span className="text-green-500">Meaningful Data Insights</span>
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl">
            Organize, visualize, and understand local police data in a way that
            empowers the community and drives informed decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            <button
              onClick={handleGuestLogin}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300 w-full sm:w-auto"
            >
              Explore as Guest
            </button>
            <button
              onClick={() => alert("Sign up modal placeholder")}
              className="px-6 py-3 border border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-50 transition duration-300 w-full sm:w-auto"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Hero Graphics */}
        <div className="flex-1 relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full -z-10 animate-pulse-slow opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full -z-10 animate-pulse-slow opacity-30"></div>
          <Image
            aria-hidden
            src="/sr_portal1.png"
            alt="Illustration"
            width={1000}
            height={1000}
            className="relative z-10 animate-fadeIn rounded-xl"
          />
        </div>
      </div>

      {/* Optional: Feature Section */}
      <section className="py-20 bg-white h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12 text-center">
          {/* Location-Based Discovery */}
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-500 text-xl">📍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Location-Based Discovery
            </h3>
            <p className="text-gray-600">
              Explore incidents and posts happening near where you live, giving
              you real-world context tied directly to your location.
            </p>
          </div>

          {/* Map & Feed Views */}
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-500 text-xl">🗺️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Map & Feed Views
            </h3>
            <p className="text-gray-600">
              Switch seamlessly between an interactive map and a chronological
              feed to visualize activity and dive into detailed reports.
            </p>
          </div>

          {/* Community Awareness */}
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-500 text-xl">🏘️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Community Awareness
            </h3>
            <p className="text-gray-600">
              Stay informed about local events and trends, empowering residents
              to understand what’s happening around them.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
