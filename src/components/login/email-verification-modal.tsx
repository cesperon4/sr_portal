import { useState } from "react";
import { Backdrop } from "../backdrop";

import { LoginParams } from "@/types/user.interface";
import { useResendVerificationEmailMutation } from "../../../generated/graphql";

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
  const [resendError, setResendError] = useState(false);
  const [resendErrorMessage, setResendErrorMessage] = useState("");

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
          {resendError && (
            <span className="text-yellow-500 font-semibold">
              {`${resendErrorMessage}`}
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
                setResendError(false);
                setResendSuccess(true);
              },
              onError: (error) => {
                setResendSuccess(false);
                setResendError(true);
                setResendErrorMessage(error.message);
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
