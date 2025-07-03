import { login } from "@/api/auth"
import { useSession } from "@/context/AuthContext";
import { useState } from "react"

export const useLogin = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);

  const { signIn } = useSession();

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await login(username, password)
      if (response.status === 401 && response.message) {
        setError(response.message)
        setLoading(false);
        return false;
      }
      if (response.status === 200 && response.user) {
        setLoading(false);
        signIn(response.user);
        return true;
      }
    } catch (err) {
      console.error(err)
      setError("Attempt Failed")
      return false;
    }
  }

  return { handleLogin, error, loading }
}
