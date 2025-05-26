import { UserDetails } from "@/features/auth/UserDetails";
import { useState } from "react";
import { RegistrationComplete } from "@/features/auth/RegistrationComplete";
import { RegistrationErrorType } from "@/types/registrationErrors";
import { useRegister } from "@/hooks/useRegister";
import { Loading } from "@/components/Loading";
import { User } from "@/types/user";


type Screen = "user" | "hasCode" | "code" | "student" | "finish"

export default function Register() {
  const [screen, setScreen] = useState<Screen>("user");
  const [errors, setErrors] = useState<RegistrationErrorType>();
  const { loading, register } = useRegister();

  const handleUserSubmit = async (user: User, confirmPassword: string) => {
    const response = await register(user, confirmPassword);

    if (response.success) {
      setScreen("finish")
    } else if (!response.success && response.errors) {
      setErrors(response.errors);
    }
  }


  return (
    <>
      {screen === "user" && (<UserDetails onSubmit={handleUserSubmit} errors={errors} />)}
      {screen === "finish" && (<RegistrationComplete />)}
      {loading && (<Loading />)}
    </>
  )
}
