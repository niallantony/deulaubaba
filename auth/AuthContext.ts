import { createContext, useContext } from "react";

export type AuthUser = {
  sub: string;
  email?: string;
  picture?: string;
}

export type AuthContextValue = {
  user: AuthUser | null;
  // personaId is only used in demo mode, to choose which seeded user to log in as.
  login: (personaId?: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
}
