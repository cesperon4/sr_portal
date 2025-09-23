import React, { useState } from "react";
import { Backdrop } from "../backdrop";
import { Button } from "@mui/material";

import { useSignupModalForm } from "../../hooks/landing-page/useSignupModalForm";

interface SignupModalProps {
  closeSignupModal: () => void;
}

export function SignupModal({ closeSignupModal }: SignupModalProps) {
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { formData, handleChange, handleSubmit } =
    useSignupModalForm(setRegisterSuccess);
  return (
    <Backdrop onClick={closeSignupModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-6/12 bg-white rounded p-24 font-sans"
      >
        <form
          className="flex flex-col gap-4 w-6/12 mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4">
            <h2 className="font-semibold">Sign up</h2>
            {registerSuccess && (
              <span className="text-green-500 font-semibold">
                Registration Successful!
              </span>
            )}
          </div>
          {registerSuccess && (
            <span className="text-yellow-500 font-semibold">
              Please check email for verification link
            </span>
          )}

          <div className="form-row flex w-full gap-2">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder={"First Name"}
              className="border rounded p-2 w-full"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder={"Last Name"}
              className="border rounded p-2 w-full"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            id="email"
            name="email"
            placeholder={"Email"}
            className="border rounded p-2 w-full"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            id="username"
            name="username"
            placeholder={"Username"}
            className="border rounded p-2 w-full"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder={"Password"}
            className="border rounded p-2 w-full"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder={"Confirm Password"}
            className="border rounded p-2 w-full"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit" className="">
            Register
          </Button>
          {registerSuccess && (
            <Button
              style={{
                backgroundColor: "orange",
                color: "white",
              }}
              variant="contained"
              type="button"
              className="bg-green-500"
            >
              Resend Verification Email
            </Button>
          )}
        </form>
      </div>
    </Backdrop>
  );
}
