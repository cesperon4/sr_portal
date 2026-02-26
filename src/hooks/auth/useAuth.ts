import { useUserContext } from "@/context/UserContext";
import { useMeQuery } from "../../../generated/graphql";

export function useAuth() {
  const { loggedUser, isLoggingOut } = useUserContext();
  const { data, loading, error } = useMeQuery({
    skip: isLoggingOut,
  });

  if (loggedUser?.role === "GUEST") {
    return {
      user: null,
      loading: false,
      error: null,
      isAuthenticated: true,
    };
  }
  console.log("useAuth rendered", data);

  return {
    user: data?.me,
    loading,
    error,
    isAuthenticated: !!data?.me,
  };
}
