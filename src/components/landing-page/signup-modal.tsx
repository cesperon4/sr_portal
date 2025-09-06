import React from "react";
import { Backdrop } from "../backdrop";
import { Button } from "@mui/material";

import { useSignupModalForm } from "../../hooks/landing-page/useSignupModalForm";

interface SignupModalProps {
  closeSignupModal: () => void;
}

export function SignupModal({ closeSignupModal }: SignupModalProps) {
  const { formData, handleChange, handleSubmit } =
    useSignupModalForm(closeSignupModal);
  return (
    <Backdrop onClick={closeSignupModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-4/12 bg-white rounded p-8 font-sans"
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="font-semibold">Register for SR Portal</h2>
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
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
      </div>
    </Backdrop>
  );
}
