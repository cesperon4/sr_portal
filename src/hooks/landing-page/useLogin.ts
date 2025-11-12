import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../../generated/graphql";
import { useLoginGuestMutation } from "../../../generated/graphql";

import { LoginParams } from "@/types/user.interface";
import { useUserContext } from "@/context/UserContext";

export function useLogin(openVerificationModal?: () => void) {
  const router = useRouter();

  const { setLoggedUser } = useUserContext();

  const [loginParams, setLoginParams] = useState<LoginParams>({
    email: "",
    password: "",
  });

  const [loginMutation] = useLoginMutation();
  const [loginGuestMutation] = useLoginGuestMutation();

  const [redirecting, setRedirecting] = useState(false);

  const handleLogin = () => {
    const { email, password } = loginParams;

    if (!email || !password) {
      console.error("Username and password are required");
      return;
    }

    loginMutation({
      variables: {
        data: {
          email,
          password,
        },
      },
      onCompleted: (data) => {
        setRedirecting(true);
        setLoggedUser({
          id: data.login.user.id || "",
          username: data.login.user.username || "",
          email: data.login.user.email || "",
          firstname: data.login.user.firstname || "",
          lastname: data.login.user.lastname || "",
          role: data.login.user.role || "",
          token: data.login.token || "",
        });
        router.push("/dashboard");
      },
      onError: (error) => {
        console.log("error");
        setTimeout(() => {
          toast(error.message, {
            type: "warning",
            autoClose: 2000,
            position: "top-right",
          });
        }, 0);

        if (error.message === "Email not verified") {
          if (openVerificationModal) openVerificationModal();
        }
      },
    });
  };

  const handleGuestLogin = () => {
    loginGuestMutation({
      onCompleted: (data) => {
        setLoggedUser({
          id: "",
          username: "",
          email: "",
          firstname: "",
          lastname: "",
          role: "GUEST",
          token: data.loginGuest.token,
        });
        router.push("/dashboard");
      },
      onError: (error) => {
        toast(error.message, {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 2000,
          type: "warning",
        });
      },
    });
  };

  return {
    setLoginParams,
    handleLogin,
    handleGuestLogin,
    loginParams,
    redirecting,
    setRedirecting,
  };
}
