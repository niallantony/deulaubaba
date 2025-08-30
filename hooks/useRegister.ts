import API from "@/api/user"
import { User } from "@/types/user"
import { useState } from "react"


export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (user: User) => {
    setLoading(true);
    try {
      const result = await API.postUser(user);
      return result
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    return {
      success: false,
    }
  }

  return { loading, register }
}
