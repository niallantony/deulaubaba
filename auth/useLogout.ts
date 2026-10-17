import { useQueryClient } from "@tanstack/react-query";
import { useStudentStore } from "@/store/currentStudent";
import { useAuth } from "./AuthContext";

// Logs out and drops all per-user state, so the next user starts clean.
export const useLogout = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return async () => {
    await logout();
    useStudentStore.setState({ studentId: null });
    queryClient.clear();
  }
}
