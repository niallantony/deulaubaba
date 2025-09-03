import { NoSelectedStudent } from "@/features/student/NoSelectedStudent";
import { NoStudent } from "@/features/student/NoStudent";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useSelectedStudent } from "@/hooks/useSelectedStudent";
import { useStudents } from "@/hooks/useStudents";
import { useRouter } from "expo-router";

export default function Student() {
  const router = useRouter();

  const { data: selected } = useSelectedStudent();
  const { data } = useStudents();

  if (!selected?.student && !data?.students) {
    return (
      <NoStudent />
    )
  }

  if (!selected?.student) {
    return (<NoSelectedStudent />)
  }


  return (
    <StudentProfile requestForm={() => router.push('/(app)/student/edit')} />
  )
}
