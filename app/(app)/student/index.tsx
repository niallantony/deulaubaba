import { useStudent } from "@/context/StudentContext";
import { NoStudent } from "@/features/student/NoStudent";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";

export default function Student() {
  const { student } = useStudent();
  const router = useRouter()

  useFocusEffect(
    useCallback(
      () => {
        router.navigate("/(app)/student")
      },
      [],
    )

  )

  if (!student) {
    return (
      <NoStudent />
    )
  }


  return (
    <StudentProfile student={student} requestForm={() => router.push('/(app)/student/edit')} />
  )
}
