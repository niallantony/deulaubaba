import { NoStudent } from "@/features/student/NoStudent";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useSelectedStudent } from "@/hooks/useSelectedStudent";
import { useRouter } from "expo-router";

export default function Student() {
  const router = useRouter();

  const { data } = useSelectedStudent();

  if (!data?.student) {
    return (
      <NoStudent />
    )
  }


  return (
    <StudentProfile student={data.student} requestForm={() => router.push('/(app)/student/edit')} />
  )
}
