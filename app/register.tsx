import { UserDetails } from "@/app/UserDetails";
import { useState } from "react";
import { User } from "@/types/user";
import { HasCode } from "./HasCode";
import { AddStudent } from "./AddStudent";
import { Student } from "@/types/student";


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

  return (
    <>
      {screen === "user" && (<UserDetails onSubmit={handleUserSubmit} />)}
      {screen === "hasCode" && userDetails && (
        <HasCode
          inputCode={() => console.log("Input")}
          makeCode={() => setScreen("student")}
        />)}
      {screen === "student" && (<AddStudent onSubmit={handleStudentSubmit} onSelectInput={() => setScreen("code")} />)}

    </>
  )
}
