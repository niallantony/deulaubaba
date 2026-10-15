import { ReactNode, useMemo, useState } from "react";
import { setCurrentUserId, USERS } from "@/api/mock/db";
import { AuthContext, AuthContextValue, AuthUser } from "./AuthContext";

export const DemoAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    login: async (personaId = USERS.teacher) => {
      setCurrentUserId(personaId);
      setUser({ sub: personaId, email: `${personaId.split("|")[1]}@demo.deulaubaba` });
    },
    logout: async () => {
      setCurrentUserId(null);
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
