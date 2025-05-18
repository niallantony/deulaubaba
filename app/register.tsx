import { UserDetails } from "@/app/UserDetails";
import { useState } from "react";
import { User } from "@/types/user";
import { HasCode } from "./HasCode";


type Screen = "user" | "hasCode" | "code" | "student"

export default function register() {
  const [userDetails, setUserDetails] = useState<User>();
  const [screen, setScreen] = useState<Screen>("hasCode");

  const handleUserSubmit = (user: User) => {
    setUserDetails(user);
    setScreen("hasCode");
  }
  return (
    <>
      {screen === "user" && (<UserDetails onSubmit={handleUserSubmit} />)}
      {screen === "hasCode" && (
        <HasCode
          inputCode={() => console.log("Input")}
          makeCode={() => console.log("Make")}
        />)}

    </>
  )
}
