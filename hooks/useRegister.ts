import { postUser } from "@/api/auth";
import { RegistrationErrorType } from "@/types/registrationErrors";
import { User } from "@/types/user"
import { useState } from "react"

type RegisterResponse = {
  success: boolean;
  errors?: RegistrationErrorType;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (user: User, confirm: string): Promise<RegisterResponse> => {
    setLoading(true);
    try {
      const res = await postUser(user, confirm);
      if (res.status === 201) {
        return {
          success: true,
        }
      } else if (res.errors) {
        return {
          success: false,
          errors: res.errors
        }
      }
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
