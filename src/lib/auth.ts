import { useUserContext } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "../../generated/graphql";

export function handleLogout() {
  const { loggedUser, clearLoggedUser, setLoggingOut } = useUserContext();
  const router = useRouter();

  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutMutation(); // wait for backend to invalidate token
      await signOut({ redirect: false }); //clears session from next-auth
      clearLoggedUser();
      router.replace("/");
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  return handleLogout;
}
