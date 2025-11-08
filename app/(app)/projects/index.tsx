import { ProjectsView } from "@/components/Projects/ProjectsView"
import { NoSelectedStudent } from "@/features/student/NoSelectedStudent"
import { useStudentStore } from "@/store/currentStudent"

export default function Route() {
  const student = useStudentStore((s) => s.student)

  if (student) {
    return (
      <ProjectsView />
    )
  } else {
    return (<NoSelectedStudent />)
  }
}
