import { useStudentStore } from "@/store/currentStudent"
import API from "@/api/project"
import { useQuery } from "@tanstack/react-query"

export const useProject = () => {
  const student = useStudentStore((s) => s.student)

  const allProjects = useQuery({
    queryKey: ['projects', student],
    queryFn: () => {
      if (!student) throw new Error("No student selected");
      return API.getProjectsOfStudent(student?.studentId)
    },
    enabled: !!student,
  })

  return {
    allProjects
  }
}
