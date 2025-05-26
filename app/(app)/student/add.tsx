import { HasCode } from "@/features/student/HasCode";
import { InputStudentCode } from "@/features/student/InputCode";
import { Student } from "@/types/student";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { AddStudentForm } from "@/features/student/AddStudent";


export default function AddStudent() {
  const [screen, setScreen] = useState("add")

  useFocusEffect(
    useCallback(() => {
      setScreen("add")
    }, [])
  )

  if (screen === "add") {
    return (<HasCode
      inputCode={() => setScreen("code")}
      makeCode={() => setScreen("register")}
    />)
  } else if (screen === "code") {
    return (<InputStudentCode onSubmit={function(code: string): void {
      throw new Error("Function not implemented.");
    }}
    />);
  } else if (screen === "register") {
    return (<AddStudentForm
      onSubmit={(student: Student) => { }}
      onSelectInput={() => setScreen("code")
      }
      onUploadImage={() => { }}
    />);
  }
}
