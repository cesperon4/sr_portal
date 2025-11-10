"use client";

import React from "react";
import { useLogin } from "@/hooks/landing-page/useLogin";
import { signIn } from "next-auth/react";
import { useModal } from "@/hooks/ui/useModal";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

import { LoginParams } from "@/types/user.interface";
import UnderlineButton from "@/components/ui/underline-button";
import { SignupModal } from "@/components/landing-page/signup-modal";
import EmailVerificationModal from "@/components/login/email-verification-modal";

export default function Login() {
  const signupModal = useModal();
  const verificationModal = useModal();

  const { setLoginParams, handleLogin, loginParams } = useLogin(
    verificationModal.openModal
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 md:px-0">
      {/* Modals */}
      {signupModal.isOpen && (
        <SignupModal closeSignupModal={signupModal.closeModal} />
      )}
      {verificationModal.isOpen && (
        <EmailVerificationModal
          closeVerificationModal={verificationModal.closeModal}
          loginParams={loginParams}
        />
      )}

      {/* Back button */}
      <div className="absolute top-6 left-6">
        <UnderlineButton path="/">
          <IoIosArrowBack size={20} />
          <span>Back</span>
        </UnderlineButton>
      </div>

      {/* Login Form Card */}
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 text-center">SR Portal Login</h2>

        {/* Input Fields */}
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setLoginParams((prev: LoginParams) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setLoginParams((prev: LoginParams) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        {/* Action Buttons */}
        <button
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          type="submit"
        >
          Login
        </button>
        <button
          className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition"
          type="button"
          onClick={signupModal.openModal}
        >
          Register
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">Or continue with</span>
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex gap-4">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <FcGoogle size={24} />
            Google
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            <FaGithub size={24} />
            Github
          </button>
        </div>
      </form>
    </main>
  );
}
