import { HasCode } from "@/features/student/HasCode";
import { InputStudentCode } from "@/features/student/InputCode";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { AddStudentForm } from "@/features/student/AddStudent";
import { useAddStudent } from "@/hooks/useStudentCode";
import { ConfirmStudent } from "@/features/student/ConfirmStudent";
import { useStudent } from "@/context/StudentContext";
import { useStudents } from "@/hooks/useStudents";
import { useCurrentUser } from "@/hooks/useCurrentUser";


export default function AddStudent() {
  const {
    handleStudentCode,
    linkStudent,
    handleNewStudent,
    screen,
    reset,
    confirm,
    inputCode,
    makeCode,
    studentPreview,
  } = useAddStudent();

  const { setStudent } = useStudent();
  const { fetchStudents } = useStudents();
  const router = useRouter();
  const { data } = useCurrentUser();

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [reset])
  )


  if (studentPreview && screen === "confirm") {
    return (<ConfirmStudent student={studentPreview} onConfirm={() => {
      linkStudent();
      confirm(setStudent);
      if (data?.user) {
        fetchStudents();
      }
      router.navigate('/student')
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
