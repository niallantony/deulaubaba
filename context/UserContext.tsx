import API from "@/api/user";
import { UserResponse } from "@/types/user";
import { createContext, use, useEffect, useState, type PropsWithChildren } from "react";

const UserContext = createContext<{
  isLoading: boolean;
  isUser: boolean;
  user?: UserResponse | null;
  getUser: () => void;
}>({
  isLoading: false,
  isUser: false,
  user: null,
  getUser: () => { },
})

export const useUser = () => {
  const value = use(UserContext);
  if (!value) {
    throw new Error("useUser must be wrapped in a <UserProvider />");
  }

  return value;
}

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const response = await API.getUser()
      if (response.ok) {
        setIsUser(true)
        setUser(response.user)
      } else if (!response.ok && response.reason === "not_found") {
        setIsUser(false);
      } else if (response.reason === "error") {
        setIsUser(false);
      }
    } catch (e) {
      console.error("Setting user error: ", e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserContext
      value={{
        isLoading,
        user,
        isUser,
        getUser,
      }}>
      {children}
    </UserContext>
  )
}

