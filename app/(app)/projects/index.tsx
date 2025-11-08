import { ProjectList } from "@/features/project/ProjectList"
import { NoSelectedStudent } from "@/features/student/NoSelectedStudent"
import { useStudentStore } from "@/store/currentStudent"

export default function Route() {
  const student = useStudentStore((s) => s.student)

  if (student) {
    return (
      <ProjectList />
    )
  } else {
    return (<NoSelectedStudent />)
  }
}
