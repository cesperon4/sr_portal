"use client";

import Image from "next/image";
import { useLogin } from "@/hooks/landing-page/useLogin";
import { SignupModal } from "@/components/landing-page/signup-modal";
import { useSignupModal } from "@/hooks/landing-page/useSignupModalToggle";
import { Navbar } from "@/components/landing-page/navbar";

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
            src="/landing1.svg"
            alt="Illustration"
            width={500}
            height={500}
            className="relative z-10 animate-fadeIn"
          />
        </div>
      </div>

      {/* Optional: Feature Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              {/* Replace with icon */}
              <span className="text-green-500 font-bold text-xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Visualize Data
            </h3>
            <p className="text-gray-600">
              Transform raw data into clear, actionable insights with intuitive
              charts and tables.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-500 font-bold text-xl">🛠️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Customizable Forms
            </h3>
            <p className="text-gray-600">
              Admins can build dynamic forms to collect and manage information
              effortlessly.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-500 font-bold text-xl">🌐</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Community Focused
            </h3>
            <p className="text-gray-600">
              Provide tools and insights that benefit local communities and
              decision-makers alike.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
