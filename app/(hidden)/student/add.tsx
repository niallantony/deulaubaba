import { HasCode } from "@/features/student/HasCode";
import { InputStudentCode } from "@/features/student/InputCode";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useCallback } from "react";
import { AddStudentForm } from "@/features/student/AddStudent";
import { useAddStudent } from "@/hooks/useStudentCode";
import { ConfirmStudent } from "@/features/student/ConfirmStudent";
import { useStudent } from "@/context/StudentContext";


export default function AddStudent() {
  const {
    handleStudentCode,
    handleNewStudent,
    error,
    loading,
    student,
    screen,
    reset,
    confirm,
    inputCode,
    makeCode,
  } = useAddStudent();

  const { setStudent } = useStudent();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      reset();
    }

      , [reset])
  )


  if (student && screen === "confirm") {
    return (<ConfirmStudent student={student} onConfirm={() => {
      confirm(setStudent);
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
      onUploadImage={() => { }}
    />);
  }
}
