"use client";

import { IoIosArrowBack } from "react-icons/io";

import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/landing-page/useLogin";

import { LoginParams } from "@/types/user.interface";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaGithub } from "react-icons/fa"; // GitHub icon

import { signIn } from "next-auth/react";

import React from "react";

export default function Login() {
  const { setLoginParams, handleLogin } = useLogin();
  const router = useRouter();
  const handleSubmit = () => {
    console.log("handle submit");
    handleLogin();
  };
  return (
    <main id="login-wrapper" className="login-wrapper">
      <div
        className="absolute top-0 left-0 p-12 flex items-center gap-1 cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <IoIosArrowBack />
        <span>Back</span>
      </div>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h2 className="text-2xl font-semibold mb-2">SR Portal Login</h2>
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

        {/* <button className="register-btn" type="submit">
          Register User
        </button> */}
      </form>
    </main>
  );
}
