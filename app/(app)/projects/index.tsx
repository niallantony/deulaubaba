import { ProjectsView } from "@/components/Projects/ProjectsView"
import { NoSelectedStudent } from "@/features/student/NoSelectedStudent"
import { useStudentStore } from "@/store/currentStudent"

export default function Route() {
  const studentId = useStudentStore((s) => s.studentId)

  if (studentId) {
    return (
      <ProjectsView />
    )
  } else {
    return (<NoSelectedStudent />)
  }
}
