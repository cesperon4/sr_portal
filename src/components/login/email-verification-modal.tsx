import React, { useState } from "react";
import { Backdrop } from "../backdrop";

import { useResendVerificationEmailMutation } from "../../../generated/graphql";
import { LoginParams } from "@/types/user.interface";

interface EmailVerificationProps {
  closeVerificationModal: () => void;
  loginParams: LoginParams;
}
function EmailVerificationModal({
  closeVerificationModal,
  loginParams,
}: EmailVerificationProps) {
  const [resendEmailVerificationMutation] =
    useResendVerificationEmailMutation();

  const [resendSuccess, setResendSuccess] = useState(false);
  return (
    <Backdrop onClick={closeVerificationModal}>
      <div className="modal-wrapper">
        <div className="flex gap-4 items-center">
          <h2 className="modal-wrapper-title">
            Email verification has not been completed
          </h2>

          {resendSuccess && (
            <span className="text-green-500 font-semibold">
              Verification email has been sent!
            </span>
          )}
        </div>
        <p>
          Please check your email for verfication link or resend a verification
          link using the button below
        </p>
        <button
          className="modal-btn"
          onClick={(e) => {
            e.stopPropagation();
            resendEmailVerificationMutation({
              variables: { email: loginParams.email },
              onCompleted: (data) => {
                console.log("resend verification email success: ", data);
                setResendSuccess(true);
              },
              onError: (error) => {
                console.log("resend verification email error: ", error);
              },
            });
          }}
        >
          Resend verification link
        </button>
      </div>
    </Backdrop>
  );
}

export default EmailVerificationModal;
