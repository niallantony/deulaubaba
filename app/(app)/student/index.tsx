import { NoSelectedStudent } from "@/features/student/NoSelectedStudent";
import { NoStudent } from "@/features/student/NoStudent";
import { StudentProfile } from "@/features/student/StudentProfile";
import { useSelectedStudent } from "@/hooks/useSelectedStudent";
import { useStudents } from "@/hooks/useStudents";

export default function Student() {

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
    <StudentProfile />
  )
}
