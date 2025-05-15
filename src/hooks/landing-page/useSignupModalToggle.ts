import { useState } from "react";

export function useSignupModal() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return { isSignupModalOpen, openSignupModal, closeSignupModal };
}
