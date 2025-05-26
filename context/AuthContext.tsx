import { useStorageState } from "@/hooks/useStorageState";
import { UserResponse } from "@/types/user";
import { createContext, use, useState, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: (user: UserResponse) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  user?: UserResponse | null;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  user: null
})

export const useSession = () => {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState<UserResponse | null>(null);

  return (
    <AuthContext
      value={{
        signIn: (user: UserResponse) => {
          setSession('xxx')
          console.log(user)
          setUser(user)
        },
        signOut: () => {
          setSession(null)
        },
        session,
        isLoading,
        user,
      }}>
      {children}
    </AuthContext>
  )
}

