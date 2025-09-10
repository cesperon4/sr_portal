"use client";

import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Cop } from "../components/models/Cop";

// import { Canvas } from "@react-three/fiber";

// import { OrbitControls } from "@react-three/drei";
// import { LoginParams } from "@/types/user.interface";

import { useLogin } from "@/hooks/landing-page/useLogin";

import { ToastContainer } from "react-toastify";

import { SignupModal } from "@/components/landing-page/signup-modal";
import { useSignupModal } from "@/hooks/landing-page/useSignupModalToggle";
import { Navbar } from "@/components/landing-page/navbar";

export default function LandingPage() {
  const { handleGuestLogin } = useLogin();

  const { isSignupModalOpen, closeSignupModal } = useSignupModal();

  return (
    <main className="flex h-screen">
      <Navbar />
      <ToastContainer />
      {isSignupModalOpen && <SignupModal closeSignupModal={closeSignupModal} />}
      <div className="flex flex-col md:flex-row items-center justify-center gap-24 h-full w-full">
        <div className="text-start mt-80 p-10 md:mt-0 md:p-0">
          <h1 className="text-4xl font-bold text-black">
            Providing Meaningful Data Insight
          </h1>
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
              className="mt-6 px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
            >
              Explore as Guest
            </button>
            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
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
        {/* <div className="w-4/12">
          <Canvas shadows camera={{ position: [0, 3, 7], fov: 45 }}>
            <ambientLight intensity={1} color="#fff4e6" />
            <directionalLight
              position={[5, 5, 3]}
              intensity={2.5}
              color="#ffd9b3"
            />

            <directionalLight
              position={[5, 9, 1]}
              castShadow
              intensity={2.5}
              color="#ffd9b3"
            />

            <OrbitControls
              enableZoom={false}
              minPolarAngle={Math.PI / 5}
              maxPolarAngle={Math.PI / 2}
            />
            <Cop />
          </Canvas>
        </div> */}
      </div>

      {/* <div className=" flex items-center justify-center ml-auto  h-screen w-3/12 shadow-sm">
        <div className="flex flex-col justify-center gap-4 shadow-sm p-12 w-10/12 h-120 bg-white rounded">
          <h2 className="font-bold">SR Portal</h2>
          <input
            className="border rounded h-10 p-2"
            placeholder="username"
            onChange={(e) => {
              setLoginParams((prev: LoginParams) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          <input
            className="border rounded h-10 p-2"
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
      </div> */}
    </main>
  );
}
