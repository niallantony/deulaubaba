import { useStudent } from "@/context/StudentContext";
import { NoStudent } from "@/features/student/NoStudent";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useRouter } from "expo-router";

export default function Student() {
  const { student } = useStudent();
  const router = useRouter();



  if (!student) {
    return (
      <NoStudent />
    )
  }


  return (
    <StudentProfile student={student} requestForm={() => router.push('/(app)/student/edit')} />
  )
}
