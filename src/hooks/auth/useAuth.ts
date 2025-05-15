import { useMeQuery } from "../../../generated/graphql";
import { useUserContext } from "@/context/UserContext";

export function useAuth() {
  const { data, loading, error } = useMeQuery();
  const { loggedUser } = useUserContext();

  if (loggedUser?.role === "GUEST") {
    return {
      user: null,
      loading: false,
      error: null,
      isAuthenticated: true,
    };
  }
  return {
    user: data?.me,
    loading,
    error,
    isAuthenticated: !!data?.me,
  };
}
