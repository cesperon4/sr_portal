"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/landing-page/useLogin";

import { ToastContainer } from "react-toastify";

import { LoginParams } from "@/types/user.interface";

import { SignupModal } from "@/components/landing-page/signup-modal";
import { useSignupModal } from "@/hooks/landing-page/useSignupModalToggle";

export default function LandingPage() {
  const { setLoginParams, handleLogin, handleGuestLogin } = useLogin();

  const { isSignupModalOpen, openSignupModal, closeSignupModal } =
    useSignupModal();

  return (
    <main className="flex h-screen">
      <ToastContainer />
      {isSignupModalOpen && <SignupModal closeSignupModal={closeSignupModal} />}
      <div className="flex items-center justify-center gap-24 h-full w-9/12 bg-gray-100">
        <div className="text-start">
          <h1 className="text-4xl font-bold">Welcome to SR Portal</h1>
          <p className="mt-4 text-gray-600">
            Where our goal is to provide insight on local police data
          </p>
          <p className=" text-gray-600">
            by organizing and displaying data in a user-friendly way
          </p>
          <p className=" text-gray-600">
            to help benefit members of the community.
          </p>
          <div className="landing-btns flex gap-2">
            <button
              onClick={() => handleGuestLogin()}
              className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
            >
              Explore as Guest
            </button>
            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
              Learn More
            </button>
          </div>
        </div>
        <Image
          aria-hidden
          src="/landing1.svg"
          alt="File icon"
          width={400}
          height={400}
          className=""
        />
      </div>

      <div className=" flex items-center justify-center ml-auto  h-screen w-3/12 shadow">
        <div className="flex flex-col justify-center gap-4 shadow p-12 w-10/12 h-[30rem] bg-white rounded">
          <h2 className="font-bold">SR Portal</h2>
          <input
            className="border rounded h-[2.5rem] p-2"
            placeholder="username"
            onChange={(e) => {
              setLoginParams((prev: LoginParams) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          <input
            className="border rounded h-[2.5rem] p-2"
            placeholder="password"
            type="password"
            onChange={(e) => {
              setLoginParams((prev: LoginParams) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
          <div className="landing-btns flex flex-col gap-2 mt-8">
            <Button
              variant="outline"
              className="bg-blue-500 text-white"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="bg-green-400 text-white"
              onClick={() => {
                openSignupModal();
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
