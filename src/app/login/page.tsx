"use client";

import React from "react";

import { useLogin } from "@/hooks/landing-page/useLogin";
import { signIn } from "next-auth/react";
import { useModal } from "@/hooks/ui/useModal";

import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaGithub } from "react-icons/fa"; // GitHub icon
import { IoIosArrowBack } from "react-icons/io";

import { LoginParams } from "@/types/user.interface";

import UnderlineButton from "@/components/ui/underline-button";
// import SingupMo from "@/components/user/registration-modal";
import { SignupModal } from "@/components/landing-page/signup-modal";

export default function Login() {
  const { setLoginParams, handleLogin } = useLogin();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <main id="login-wrapper" className="login-wrapper">
      {isOpen && <SignupModal closeSignupModal={closeModal} />}
      <div className="absolute top-0 left-0 p-12 flex">
        <UnderlineButton path="/">
          <IoIosArrowBack />
          <span>Back</span>
        </UnderlineButton>
      </div>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2 className="text-xl font-semibold mb-2">SR Portal Login</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setLoginParams((prev: LoginParams) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setLoginParams((prev: LoginParams) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />

        <button className="login-btn" type="submit">
          Login
        </button>

        <button className="register-btn" onClick={openModal} type="button">
          Register
        </button>

        <div className="flex gap-4 items-center justify-center">
          <span className="border-t-2 border-gray-400 w-4/12" />
          <span>Or continue with</span>
          <span className="border-t-2 border-gray-400 w-4/12" />
        </div>

        <div className="flex justify-between gap-2">
          <button
            className="auth-login"
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <FcGoogle size={24} />
            Google
          </button>
          <button
            className="auth-login"
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
