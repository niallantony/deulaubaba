import { HasCode } from "@/features/student/HasCode";
import { InputStudentCode } from "@/features/student/InputCode";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { AddStudentForm } from "@/features/student/AddStudent";
import { useAddStudent } from "@/hooks/useStudentCode";
import { ConfirmStudent } from "@/features/student/ConfirmStudent";


// TODO -> Get Rid of this Oddity
export default function AddStudent() {
  const {
    handleStudentCode,
    handleNewStudent,
    screen,
    reset,
    linkStudent,
    inputCode,
    makeCode,
    studentPreview,
  } = useAddStudent();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      reset();
    }
      , [reset])
  )


  if (studentPreview && screen === "confirm_new") {
    return (<ConfirmStudent student={studentPreview} onConfirm={() => {
      linkStudent()
      router.dismissAll()
    }} />)
  }
  if (screen === "add") {
    return (<HasCode
      inputCode={inputCode}
      makeCode={makeCode}
    />)
  } else if (screen === "code") {
    return (<InputStudentCode onSubmit={handleStudentCode} onBack={() => reset()} />);
  } else if (screen === "register") {
    return (<AddStudentForm
      onSubmit={handleNewStudent}
      onSelectInput={inputCode}
    />);

  }
}
