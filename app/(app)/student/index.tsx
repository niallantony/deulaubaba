import { useStudent } from "@/context/StudentContext";
import { NoStudent } from "@/features/student/NoStudent";
import { StudentProfile } from "@/features/student/StudentProfile";

export default function Student() {
  const { student } = useStudent();

  if (!student) {
    return (
      <NoStudent />
    )
  }

  return (
    <StudentProfile />

  )
}
