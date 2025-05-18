import { UserDetails } from "@/app/UserDetails";
import { useState } from "react";
import { User } from "@/types/user";
import { HasCode } from "./HasCode";
import { AddStudent } from "./AddStudent";
import { Student } from "@/types/student";
import { RegistrationComplete } from "./RegistrationComplete";
import { InputStudentCode } from "./InputCode";


type Screen = "user" | "hasCode" | "code" | "student" | "finish"

export default function register() {
  const [userDetails, setUserDetails] = useState<User>();
  const [screen, setScreen] = useState<Screen>("user");
  const [student, setStudent] = useState<Student>();

  const handleUserSubmit = (user: User) => {
    setUserDetails(user);
    setScreen("hasCode");
  }

  const handleStudentSubmit = (student: Student) => {
    setStudent(student);
    setScreen("finish")
  }

  const handleCodeSubmit = (code: string) => {
    console.log(code)
  }

  return (
    <>
      {screen === "user" && (<UserDetails onSubmit={handleUserSubmit} />)}
      {screen === "hasCode" && userDetails && (
        <HasCode
          inputCode={() => setScreen("code")}
          makeCode={() => setScreen("student")}
        />)}
      {screen === "student" && (<AddStudent onSubmit={handleStudentSubmit} onSelectInput={() => setScreen("code")} />)}
      {screen === "finish" && (<RegistrationComplete />)}
      {screen === "code" && (<InputStudentCode onSubmit={handleCodeSubmit} />)}
    </>
  )
}
