import React, { useState } from "react";
import { Backdrop } from "../backdrop";
import { Button, CircularProgress } from "@mui/material";
import { useSignupModalForm } from "../../hooks/landing-page/useSignupModalForm";

interface SignupModalProps {
  closeSignupModal: () => void;
}

export function SignupModal({ closeSignupModal }: SignupModalProps) {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, handleChange, handleSubmit } =
    useSignupModalForm(setRegisterSuccess);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleSubmit(e);
    setIsSubmitting(false);
  };

  return (
    <Backdrop onClick={closeSignupModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-10 sm:p-12 animate-fadeIn font-sans border border-gray-100"
      >
        {/* Close Button */}
        <button
          onClick={closeSignupModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Create your account
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Join us and start exploring today.
          </p>
        </div>

        {/* Success Message */}
        {registerSuccess && (
          <div className="mb-4 text-center">
            <p className="text-green-600 font-medium">
              ✅ Registration Successful!
            </p>
            <p className="text-yellow-600 text-sm mt-1">
              Please check your email for a verification link.
            </p>
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="John"
                className="modern-input"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Doe"
                className="modern-input"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="modern-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="yourusername"
              className="modern-input"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="modern-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              className="modern-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            className="!bg-blue-600 !hover:bg-blue-700 !text-white !py-3 !rounded-xl !text-base !font-semibold !shadow-md !transition-all"
          >
            {isSubmitting ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>

          {registerSuccess && (
            <Button
              style={{ backgroundColor: "orange", color: "white" }}
              variant="contained"
              type="button"
              className="!mt-2 !rounded-xl !py-3 !text-base !font-medium !shadow-md !hover:opacity-90"
            >
              Resend Verification Email
            </Button>
          )}
        </form>
      </div>
    </Backdrop>
  );
}
